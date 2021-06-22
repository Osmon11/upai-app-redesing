import React, { useState, useEffect, createRef } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import { BoxShadow } from 'react-native-shadow';
import { AntDesign } from '@expo/vector-icons';
import { ActionSheet, Root } from 'native-base';

import HeaderInStackScreens from '../../../../Common/HeaderInStackScreens';

import callIcon from '../../../../Images/callIcon.png';
import instagramIcon from '../../../../Images/instagramIcon.png';
import percentIcon from '../../../../Images/percentIcon.png';
import AboutUs from './AboutUs';
import CompanyInfo from './CompanyInfo';
import Gallery from './Gallery';
import Reviews from './Reviews';
import SendReview from './SendReview';
import { API } from '../../../../config';
import AsyncStorage from '@react-native-community/async-storage';
import HotCashesSlider from './HotCashbackScreen/HotCashesSlider';

import AnimatedLoader from 'react-native-animated-loader';
import DialogAlert from '../../../../Common/DialogAlert';
import { useLinkBuilder, useRoute } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const scalePoint = width / 380;
import * as Linking from 'expo-linking';

export default function CompanyScreen({ route, navigation }) {
  const [auth, setAuth] = useState(false);
  const [profile, setProfile] = useState(false);
  const [data, setDataCompany] = useState();
  const [review, setReview] = useState();
  const [revLim, setRevLim] = useState(5);
  const [phoneNum, setPhoneNum] = useState();
  const [instaPage, setInstaPage] = useState();
  const [webPage, setWebPage] = useState();
  const [workingDays, setWorkingDays] = useState();
  const [lowBalance, setLowBalance] = useState(false);
  const [complaintMessage, setComplaintMessage] = useState('Жалоба отправлена');
  const [answerModal, setAnswerModal] = useState(false);
  const [modalTxt, setModalTxt] = useState();
  const [viewLoader, setViewLoader] = React.useState(false);
  const [hot, setHot] = React.useState();
  const [tkn, setToken] = React.useState();
  const { itemId } = route?.params;

  useEffect(() => {
    getFullInfo();
    getInfo();
    getHot();
    getAllreview();
    getCompanyById();
  }, [navigation]);
  const getHot = async () => {
    const resp = await fetch(API + 'hot-cashback/?shop_id=' + itemId);
    const dat = await resp.json();
    setHot(dat.results);
  };

  const getFullInfo = async () => {
    const inUrl = await Linking.getInitialURL();
    const token = await AsyncStorage.getItem('token');
    setToken(token);
    const resp = await fetch(API + 'users/profile/', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    const data = await resp.json();

    setProfile(data);
  };

  const getInfo = async () => {
    const result = await AsyncStorage.getItem('token');
    if (result != null) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  };

  const getCompanyById = async () => {
    let resp = await fetch(API + 'shop/' + itemId + '/', {
      headers: {
        Accept: 'application/json',
      },
    });

    let json = await resp?.json();

    setDataCompany(json == '' || undefined ? null : json);
    let number = json?.phone;
    let instagram = json?.instagram;
    let website = json?.web_site;
    let workingDays = json?.working_days;
    setPhoneNum(number && number?.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 '));
    setInstaPage(instagram && instagram);
    setLowBalance(json?.speed ? true : false);
    setWebPage(website && website);
    setWorkingDays(workingDays && workingDays);
  };

  const getAllreview = async () => {
    let resp = await fetch(
      API + 'shop/' + itemId + '/review/?offset=0&limit=' + revLim
    );
    let req = await resp.json();
    setReview(req.results);
  };
  const setRevLimit = (n) => {
    setRevLim(n);
    getAllreview();
  };
  const sendReply = async (id, text) => {
    let data = {
      parent: id,
      opinion: text,
    };
    const token = await AsyncStorage.getItem('token');
    const resp = await fetch(API + 'shop/review/reply/', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const jso = await resp.json();

    getAllreview();
  };
  const addComplaint = () => {
    const btns = [
      'Спам',
      'Изображение обнаженного тела...',
      'Враждебные высказывания или...',
      'Насилие или опасные организации',
      'Продажа незаконных или подлежа...',
      'Травля или преследование',
      'Нарушение прав на интелектуаль...',
      'Самоубийство',
      'Нанесение себе увечий или расст...',
      'Мошенничество или обман',
      'Ложная информация',
      'Мне это не нравится',
      'Другое',
    ];

    ActionSheet.show(
      {
        options: btns,
        cancelButtonIndex: 13,
        title: 'Выберите способ...',
        destructiveButtonIndex: 11,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            setAnswerModal(true);
            setModalTxt(complaintMessage);
            report('spam');

            break;
          case 1:
            setAnswerModal(true);
            setModalTxt(complaintMessage);
            report('nudity');

            break;
          case 2:
            setAnswerModal(true);
            setModalTxt(complaintMessage);
            report('hate');
            break;
          case 3:
            setAnswerModal(true);
            setModalTxt(complaintMessage);
            report('violence');
            break;
          case 4:
            setAnswerModal(true);
            setModalTxt(complaintMessage);
            report('illegal');
            break;
          case 5:
            setAnswerModal(true);
            setModalTxt(complaintMessage);
            report('harassment');
            break;
          case 6:
            setAnswerModal(true);
            setModalTxt(complaintMessage);
            report('intellectual');
            break;
          case 7:
            setAnswerModal(true);
            setModalTxt(complaintMessage);
            report('suicide');
            break;
          case 8:
            setAnswerModal(true);
            setModalTxt(complaintMessage);
            report('scam');
            break;
          case 9:
            setAnswerModal(true);
            setModalTxt(complaintMessage);
            report('false');
            break;
          case 10:
            setAnswerModal(true);
            setModalTxt(complaintMessage);
            report('dislike');
            break;
          case 11:
            setAnswerModal(true);
            setModalTxt(complaintMessage);
            report('other');
            break;
          default:
            break;
        }
      }
    );
  };
  const report = async (message) => {
    let data = {
      category: message,
      shop: itemId,
    };
    const token = await AsyncStorage.getItem('token');
    const resp = await fetch(API + 'report/', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const jso = await resp.json();
  };

  const shadowOpt3 = {
    width: 26,
    height: 26,
    color: '#000',
    border: 3,
    radius: 10,
    opacity: 0.05,
    x: 0,
    y: 0,
    style: {
      alignSelf: 'center',
    },
  };

  return (
    <Root>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}
      >
        <AnimatedLoader
          visible={viewLoader}
          overlayColor="rgba(255,255,255,1)"
          source={require('../../../../Common/loader.json')}
          animationStyle={{ width: 100, height: 100, resizeMode: 'cover' }}
          speed={1}
        ></AnimatedLoader>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollBox}
          >
            <View style={styles.headerBox}>
              <HeaderInStackScreens />
            </View>
            <View
              style={{
                marginTop: Platform.OS === 'ios' ? '5%' : '5%',
              }}
            >
              <View style={styles.firstBox}>
                <View style={styles.accountImgBox}>
                  <View style={styles.accountImgFirstShadowCircle}>
                    <View style={styles.accountImgSecondShadowCircle}>
                      <View style={styles.accountImgThirdShadowCircle}>
                        <View style={styles.cashbacksCircle}>
                          <View style={styles.percentCircle}>
                            <Image
                              style={{
                                width: scalePoint * 10,
                                height: scalePoint * 10,
                                resizeMode: 'contain',
                              }}
                              source={percentIcon}
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 12,
                              lineHeight: 14,
                              color: '#fff',
                            }}
                          >
                            {data ? data.cashback : 0}%
                          </Text>
                        </View>
                        <Image
                          style={styles.accountImg}
                          source={{
                            uri: data ? data.logo : null,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.mainTxtBox}>
                  <Text style={styles.mainTxt}>{data ? data.name : null}</Text>
                  <View style={styles.numberAndInstaBox}>
                    {phoneNum && (
                      <TouchableOpacity
                        style={styles.numberBox}
                        onPress={
                          phoneNum === undefined
                            ? () => {}
                            : () => Linking.openURL(`tel:${data.phone}`)
                        }
                      >
                        <BoxShadow setting={shadowOpt3}>
                          <View style={styles.numberIconBox}>
                            <Image
                              style={{
                                width: scalePoint * 15,
                                height: scalePoint * 15,
                              }}
                              source={callIcon}
                            />
                          </View>
                        </BoxShadow>
                        <Text style={styles.numberText}>{phoneNum}</Text>
                      </TouchableOpacity>
                    )}

                    {data && data.instagram && (
                      <TouchableOpacity
                        style={styles.instaBox}
                        onPress={
                          instaPage !== null
                            ? () =>
                                Linking.openURL(
                                  `https://www.instagram.com/${data.instagram}/`
                                )
                            : () => {}
                        }
                      >
                        <BoxShadow setting={shadowOpt3}>
                          <View style={styles.instaIconBox}>
                            <Image
                              style={{
                                width: scalePoint * 15,
                                height: scalePoint * 15,
                              }}
                              source={instagramIcon}
                            />
                          </View>
                        </BoxShadow>
                        <Text style={styles.instaLoginText}>
                          {data ? data.instagram : null}
                        </Text>
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      onPress={addComplaint}
                      style={styles.instaBox}
                    >
                      <BoxShadow setting={shadowOpt3}>
                        <View style={styles.instaIconBox}>
                          <AntDesign
                            name="infocirlceo"
                            size={scalePoint * 15}
                            color="#ff0909"
                          />
                        </View>
                      </BoxShadow>
                      <Text style={styles.instaLoginText}>Пожаловаться</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ marginTop: '5%' }}>
              <View style={styles.secondMainBox}>
                <View
                  style={
                    lowBalance ? styles.speedOfCashbackBox : { display: 'none' }
                  }
                >
                  <Text style={styles.secondBoxTxt}>
                    Скорость отправки кэшбэка уменьшена: от 12 до 72 часов
                  </Text>
                </View>
                <AboutUs
                  about={data ? data : 'пусто'}
                  data={data}
                  itemId={itemId}
                />
                <View style={styles.companyInfoBox}>
                  <CompanyInfo
                    data={data}
                    number={phoneNum}
                    instaPage={instaPage}
                    webPage={webPage}
                    workDays={workingDays}
                  />
                </View>
                <View style={styles.screensBox}>
                  <HotCashesSlider
                    market={itemId}
                    profile={profile.shop}
                    hot={hot}
                  />
                </View>
                <View style={styles.screensBox}>
                  <Gallery gallery={data ? data.gallery : ''} />
                </View>
                <View style={styles.companyInfoBox}>
                  <Reviews
                    profile={profile.shop}
                    itemId={itemId}
                    review={review}
                    setRevLimit={setRevLimit}
                    revLim={revLim}
                    sendReply={sendReply}
                  />
                </View>
                <View style={styles.companyInfoBox}>
                  <SendReview
                    shop={itemId}
                    open={() =>
                      navigation.navigate('ProfileStackScreen', {
                        screen: 'LoginMainStackScreen',
                      })
                    }
                    getAllreview={getAllreview}
                  />
                </View>
              </View>
            </View>
            <DialogAlert
              answerModal={answerModal}
              setAnswerModal={setAnswerModal}
              message={modalTxt}
              funcOk={() => setAnswerModal(false)}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Root>
  );
}

const styles = StyleSheet.create({
  optionsTxt: {
    fontSize: 14,
  },
  scrollBox: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  headerBox: {
    marginTop: Platform.OS === 'ios' ? scalePoint * 46 : scalePoint * 25,
    width: '95%',
    alignSelf: 'center',
  },
  firstBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  accountImgFirstShadowCircle: {
    width: scalePoint * 142,
    height: scalePoint * 142,
    backgroundColor: '#fff',
    borderRadius: scalePoint * 142 * 0.5,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowRadius: 13,
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  accountImgSecondShadowCircle: {
    width: scalePoint * 124,
    height: scalePoint * 124,
    backgroundColor: '#fff',
    borderRadius: scalePoint * 124 * 0.5,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowRadius: 13,
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: '#fff',
    elevation: 8,
  },
  accountImgThirdShadowCircle: {
    shadowColor: '#000',
    shadowRadius: 13,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: -1,
      height: 0,
    },
    elevation: 8,
    backgroundColor: '#fff',
    borderRadius: scalePoint * 107 * 0.5,
    width: scalePoint * 107,
    height: scalePoint * 107,
    alignItems: 'center',
    alignSelf: 'center',
  },
  cashbacksCircle: {
    width: scalePoint * 45,
    height: scalePoint * 45,
    borderRadius: scalePoint * 45 * 0.5,
    backgroundColor: '#ff0707',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 999,
    alignSelf: 'flex-end',
    left: '80%',
    top: '-6%',
  },
  percentCircle: {
    position: 'absolute',
    top: '60%',
    left: '-10%',
    zIndex: 10,
    width: scalePoint * 16,
    height: scalePoint * 16,
    borderRadius: scalePoint * 16 * 0.5,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#27ae60',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  accountImgBox: {
    marginLeft: '5%',
    width: '40%',
  },
  accountImg: {
    alignSelf: 'center',
    borderRadius: scalePoint * 107 * 0.5,
    width: scalePoint * 107,
    height: scalePoint * 107,
    resizeMode: 'cover',
  },
  mainTxtBox: {
    width: '50%',
    marginLeft: '5%',
  },
  mainTxt: {
    fontSize: 24,
    lineHeight: 28,
    color: '#313131',
  },
  numberAndInstaBox: {
    marginLeft: '5%',
  },
  numberBox: {
    flexDirection: 'row',
    marginTop: '15%',
  },
  numberIconBox: {
    width: 26,
    height: 26,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 12,
    lineHeight: 14,
    alignSelf: 'center',
    paddingLeft: '3%',
    color: '#535353',
  },
  instaBox: {
    flexDirection: 'row',
    marginTop: '5%',
  },
  instaIconBox: {
    width: 26,
    height: 26,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instaLoginText: {
    fontSize: 12,
    lineHeight: 14,
    alignSelf: 'center',
    paddingLeft: '3%',
    color: '#535353',
  },
  speedOfCashbackBox: {
    width: '86%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ff6b00',
    borderRadius: 10,
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '10%',
  },
  secondMainBox: {
    width: '100%',
    marginTop: '5%',
    justifyContent: 'center',
    marginBottom: '10%',
  },
  secondBoxTxt: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    color: '#ff6b00',
  },
  screensBox: {
    flex: 1,
    marginTop: '5%',
    marginBottom: '10%',
    width: '100%',
    alignSelf: 'center',
  },
  companyInfoBox: {
    flex: 1,
    marginTop: '5%',
    marginBottom: '10%',
    width: '95%',
    alignSelf: 'center',
  },
});
