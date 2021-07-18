import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Platform,
  Dimensions,
  Share,
  Linking,
  Clipboard,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import DialogAlert from '../../../../Common/DialogAlert';
import HeaderInStackScreens from '../../../../Common/HeaderInStackScreens';
import referalsQuestionIcon from '../../../../Images/referalsQuestionIcon.png';
import copyLinkIcon from '../../../../Images/referalsScreenCopyLinkIcon.png';
import shareLinkIcon from '../../../../Images/referalsScreenShareLinkIcon.png';
import MyReferals from '../MyReferalsScreen/MyReferals';
import AsyncStorage from '@react-native-community/async-storage';
import { API } from '../../../../config';
const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function ReferalsScreen() {
  const [value, setValue] = useState('');
  React.useEffect(() => {
    getAllInfo();
    getALlReferals();
  }, []);
  const [answerModal, setAnswerModal] = useState(false);
  const [modalTxt, setModalTxt] = useState();
  const [allReferals, setAllReferals] = useState([]);
  const getAllInfo = async () => {
    const token = await AsyncStorage.getItem('token');
    const resp = await fetch(API + 'users/profile/', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    const data = await resp.json();

    if (data.code === 'user_not_found') {
      navigation.navigate('ProfileStackScreen', {
        screen: 'LoginMainScreen',
      });
    }
    let refLink =
      data.referral_link !== null
        ? data.referral_link.shortLink
        : await fetch(
            'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyB-GsnkDBtwGYt3Kw1g9jtLKn94D7al34s',
            {
              method: 'POST',
              body: JSON.stringify({
                dynamicLinkInfo: {
                  domainUriPrefix: 'https://upai.one/referral',
                  link: `https://upai.kg/referral/?referral=${data.phone}`,
                  androidInfo: {
                    androidPackageName: 'com.up.upaii',
                  },
                  iosInfo: {
                    iosBundleId: 'com.example.upai',
                  },
                },
              }),
            }
          )
            .then((res) => res.json())
            .then((data) => data.shortLink);

    if (refLink) {
      setValue(refLink);
      fetch(API + 'users/profile/', {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          referral_link: { shortLink: refLink },
        }),
      }).then((res) => res.json().then((data) => console.log(data)));
    } else {
      setValue('ссылка не найдена');
    }
  };

  const navigation = useNavigation();
  const sendUrl = async () => {
    Share.share({
      message: value,
      url: value,
    });
  };
  const copy = async () => {
    Clipboard.setString(value);
    const text = await Clipboard.getString();
    setAnswerModal(true);
    setModalTxt('Ссылка скопирована \n' + text);
  };
  const getALlReferals = async () => {
    const token = await AsyncStorage.getItem('token');
    const resp = await fetch(API + 'users/referral/', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    const data = await resp.json();
    setAllReferals(data.results);
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollBox}>
        <View style={styles.headerBox}>
          <HeaderInStackScreens />
        </View>
        <View>
          <View style={styles.mainContentBox}>
            <Text style={styles.mainText}>Реферальная система</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AboutReferalScreen')}
            >
              <Image
                style={{
                  width: scalePoint * 20,
                  height: scalePoint * 20,
                  resizeMode: 'contain',
                }}
                source={referalsQuestionIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.textContentBox}>
            <Text style={styles.textContent}>
              Хочешь добавить свою компанию в УПАЙ {'\n'}
              Укажите название , номер и мы свяжемся с вами. {'\n'}
              {'\n'}Пригласи друга по уникальной ссылке и получай бонусы Получай
              бонусы приглашая друзей
            </Text>
          </View>
          <View style={styles.textInputBox}>
            <TextInput style={styles.textInput}>{value}</TextInput>
          </View>
          <View
            style={{
              marginTop: '10%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity style={styles.btnStyle} onPress={copy}>
              <Image style={styles.btnIcon} source={copyLinkIcon} />
              <Text style={styles.btnTxt}>Скопировать ссылку</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnStyle} onPress={sendUrl}>
              <Image style={styles.btnIcon} source={shareLinkIcon} />
              <Text style={styles.btnTxt}>Поделиться</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentBox}>
          <MyReferals all={allReferals} />
        </View>
      </ScrollView>
      <DialogAlert
        visible={'none'}
        answerModal={answerModal}
        setAnswerModal={setAnswerModal}
        message={modalTxt}
        funcOk={() => {
          setAnswerModal(false);
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollBox: {
    width: '95%',
    alignSelf: 'center',
  },
  headerBox: {
    marginTop: Platform.OS === 'ios' ? '15%' : '10%',
    width: '100%',
    height: scalePoint * 23,
  },
  mainContentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '8%',
  },
  mainText: {
    fontSize: 24,
    lineHeight: 28,
  },
  textContentBox: {
    marginTop: '5%',
  },
  textContent: {
    fontSize: 14,
    lineHeight: 16,
    color: '#515151',
  },
  textInputBox: {
    marginTop: '10%',
    width: '100%',
    borderWidth: 1,
    borderColor: '#225196',
    borderRadius: 10,
    overflow: 'hidden',
  },
  textInput: {
    padding: '4%',
    fontSize: 16,
    lineHeight: 18,
    color: '#a6a6a6',
  },
  btnStyle: {
    width: '48%',
    height: scalePoint * 45,
    backgroundColor: '#ff6b00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,

    flexDirection: 'row',
  },
  btnIcon: {
    width: scalePoint * 20,
    height: scalePoint * 20,
    resizeMode: 'contain',
    marginRight: '3%',
  },
  btnTxt: {
    fontSize: 12,
    lineHeight: 14,
    color: '#fff',
  },
  componentsMargin: {
    marginTop: '10%',
  },
  contentBox: {
    marginTop: '15%',
    marginBottom: '5%',
  },
});
