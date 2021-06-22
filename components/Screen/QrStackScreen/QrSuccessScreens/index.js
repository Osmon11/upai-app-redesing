import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-shadow-cards';

import HeaderInStackScreens from '../../../Common/HeaderInStackScreens';
import ProfileInfo from '../../../Common/PropfileInfo';

import qrSuccessIcon from '../../../Images/qrSuccessIcon.png';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;
import { API } from '../../../config';
import AsyncStorage from '@react-native-community/async-storage';
import DialogAlert from '../../../Common/DialogAlert';
import AnimatedLoader from 'react-native-animated-loader';

export default function QrSendMoneyScreen({ route }) {
  const [value, setValue] = useState('Введите сумму');
  const [commentPlaceHolder, setCommentPlaceholder] = useState('Комментарий');
  const [commentValue, setCommentValue] = useState('');
  const [sumOfCash, setSumOfCash] = useState('');
  const [answerModal, setAnswerModal] = useState(false);
  const [modalTxt, setModalTxt] = useState();
  const [viewLoader, setViewLoader] = React.useState(false);
  const navigation = useNavigation({ route });
  const [name, setName] = React.useState('');

  const { num } = route.params;
  React.useEffect(() => {
    getNameByPhone();
  }, []);
  const getNameByPhone = async () => {
    const token = await AsyncStorage.getItem('token');
    const resp = await fetch(API + 'sell/' + num+'/', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    const data = await resp.json();
    
    setName(data.fullname);
  };
  const sendBuy = async () => {
    let data = {};
    setViewLoader(true);
    route?.params && route?.params.cash
      ? (data = {
          customer: num,
          amount: sumOfCash,
          comment: commentValue,
          hot_cashback: Number(route?.params.cash),
        })
      : (data = {
          customer: num,
          amount: sumOfCash,
          comment: commentValue,
        });
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(API + 'sell/', {
        method: 'POST', // или 'PUT'
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
      });
      const json = await response.json();
      
      if (json.non_field_errors) {
        setViewLoader(false);
        setAnswerModal(true);
        setModalTxt(json.non_field_errors[0]);
      } else if (json.amount && !json.customer) {
        setViewLoader(false);
        setAnswerModal(true);
        setModalTxt(json.amount[0]);
      } else if (json.detail) {
        setViewLoader(false);
        setAnswerModal(true);
        setModalTxt(json.detail);
      } else {
        setViewLoader(false);
        navigation.navigate('LastSuccessScreen', {
          sum: json.cashback,
          name: name,
        });
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <AnimatedLoader
        visible={viewLoader}
        overlayColor="rgba(255,255,255,0.7)"
        source={require('../../../Common/loader.json')}
        animationStyle={{ width: 100, height: 100, resizeMode: 'cover' }}
        speed={1}
      >
        <Text>Отправка</Text>
      </AnimatedLoader>
      <View style={styles.mainContentBox}>
        <View style={styles.headerBox}>
          <HeaderInStackScreens />
        </View>
        <View style={styles.profileBox}>
          <ProfileInfo />
        </View>
        <Card style={styles.shadowCard}>
          <View style={styles.topBox}>
            <Image source={qrSuccessIcon} style={styles.qrSuccessIcon} />
            <Text style={styles.successTxt}>QR код был считан</Text>
            <Text style={styles.userName}>{name}</Text>
          </View>
          <View>
            <View style={styles.textInputBox}>
              <TextInput
                style={styles.textInputStyle}
                keyboardType="number-pad"
                placeholder={value}
                value={sumOfCash}
                onChangeText={(text) => setSumOfCash(text)}
                maxLength={10}
              />
            </View>
            <View style={styles.CommentInputBox}>
              <TextInput
                style={styles.CommentInputStyle}
                keyboardType="default"
                placeholder={commentPlaceHolder}
                value={commentValue}
                onChangeText={(text) => setCommentValue(text)}
              />
            </View>
            <TouchableOpacity
              style={styles.filterBtn}
              // onPress={() => navigation.navigate('LastSuccessScreen')}
              onPress={() => sendBuy()}
            >
              <Text style={styles.btnText}>Отправить</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
      <DialogAlert
        answerModal={answerModal}
        setAnswerModal={setAnswerModal}
        message={modalTxt}
        funcOk={() => setAnswerModal(false)}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContentBox: {
    width: '95%',
    alignSelf: 'center',
  },
  headerBox: {
    marginTop: Platform.OS === 'ios' ? '15%' : '5%',
  },
  profileBox: {
    marginBottom: '5%',
  },
  shadowCard: {
    width: '100%',
    borderRadius: 10,
    marginTop: '5%',
    height: scalePoint * 413,
  },
  topBox: {
    width: '100%',
    height: scalePoint * 112,
    backgroundColor: '#ff6b00',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrSuccessIcon: {
    width: scalePoint * 30,
    height: scalePoint * 30,
  },
  successTxt: {
    marginTop: '2%',
    fontSize: 12,
    color: '#fff',
  },
  userName: {
    marginTop: '5%',
    color: '#fff',
    fontSize: 20,
  },
  textInputBox: {
    marginTop: '10%',
    width: '90%',
    height: 45,
    borderWidth: 1,
    borderColor: 'rgba(34, 81, 150, 0.43)',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    marginLeft: '5%',
    fontSize: 14,
    lineHeight: 16,
    color: '#225196',
  },
  CommentInputBox: {
    marginTop: '10%',
    width: '90%',
    height: scalePoint * 89,
    borderWidth: 1,
    borderColor: 'rgba(34, 81, 150, 0.43)',
    borderRadius: 10,
    alignSelf: 'center',
  },
  CommentInputStyle: {
    marginLeft: '5%',
    marginTop: '5%',
    fontSize: 14,
    lineHeight: 16,
    color: '#225196',
  },
  filterBtn: {
    width: scalePoint * 150,
    height: scalePoint * 45,
    borderRadius: 10,
    marginTop: '5%',
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnText: {
    fontSize: 16,
    lineHeight: 18,
    color: '#fff',
    alignSelf: 'center',
  },
});
