import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import HeaderInStackScreens from '../../../../../Common/HeaderInStackScreens';
import CalendarHotCash from './CalendarHotCash';

import qrIconIOS from '../../../../../Images/qrIconTabMenu.png';
import hotCashClockImg from '../../../../../Images/hotCashesClockImg.png';
import fireCashSumIcon from '../../../../../Images/fireCashSumImg.png';
import phoneIcon from '../../../../../Images/сompanyCallIcon.png';
import AnimatedLoader from 'react-native-animated-loader';
import { API } from '../../../../../config';
import { AntDesign } from '@expo/vector-icons';
import DialogAlert from '../../../../../Common/DialogAlert';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

const window = Dimensions.get('window');
const width = Dimensions.get('screen').width;
const scalePoint = window.width / 380;
export default function HotCashbacksInfoScreen({ route }) {
  const [viewLoader, setViewLoader] = React.useState(true);
  const { itemId } = route.params;
  const [data, setData] = React.useState();
  const [profile, setProfile] = React.useState();
  const navigation = useNavigation();
  const [answerModal, setAnswerModal] = React.useState(false);
  const [all, setAll] = React.useState([]);
  const [time, setTime] = React.useState([]);

  React.useEffect(() => {
    getFullInfo();
    getFullInfoUser();
    const unsubscribe = navigation.addListener('focus', () => {
      getFullInfo();
      getFullInfoUser();
    });
    return () => {
      unsubscribe;
    };
  }, []);

  const getFullInfo = async () => {
    const resp = await fetch(API + 'hot-cashback/?limit=1000');
    const data = await resp.json();
    let one;
    data.results.filter((el) => {
      if (el.id == itemId) {
        one = el;
      }
    });
    let all = [];
    setData(one);
    let fH = new Date(one?.ts_range[0]?.lower).getHours();
    let fM = new Date(one?.ts_range[0]?.lower).getMinutes();
    let sH = new Date(one?.ts_range[0]?.upper).getHours();
    let sM = new Date(one?.ts_range[0]?.upper).getMinutes();
    setTime(
      `${fH <= 9 ? '0' + fH : fH}:${fM <= 9 ? '0' + fM : fM} - ${
        sH <= 9 ? '0' + sH : sH
      }:${sM <= 9 ? '0' + sM : sM}`
    );

    one.ts_range.forEach((el) => {
      all.push(el.upper);
    });

    setAll(all);

    data && setViewLoader(false);
  };
  const getFullInfoUser = async () => {
    const token = await AsyncStorage.getItem('token');
    const resp = await fetch(API + 'users/profile/', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    const data = await resp.json();

    setProfile(data);
  };
  const deleteHot = async () => {
    const token = await AsyncStorage.getItem('token');
    const resp = await fetch(API + 'hot-cashback/' + itemId + '/', {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    setAnswerModal(false);
    // navigation.navigate("ProfileStackScreen", {screen:'ProfileScreen'})
    navigation.navigate('HomeMainScreen');
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <AnimatedLoader
        visible={viewLoader}
        overlayColor="rgba(255,255,255,1)"
        source={require('../../../../../Common/loader.json')}
        animationStyle={{ width: 100, height: 100, resizeMode: 'cover' }}
        speed={1}
      ></AnimatedLoader>

      <View style={styles.headerBox}>
        {data && profile && data.shop == profile.shop && (
          <View style={styles.upBtnsBox}>
            <View style={styles.deleteBtnBox}>
              <AntDesign
                name="delete"
                onPress={() => setAnswerModal(true)}
                size={24}
                color="#ff6b00"
              />
            </View>
            <View>
              <AntDesign
                name="edit"
                size={24}
                onPress={() =>
                  navigation.navigate('CashbackSettingScreen', {
                    cashId: itemId,
                  })
                }
                color="#ff6b00"
              />
            </View>
          </View>
        )}
        <HeaderInStackScreens />
      </View>

      <View style={styles.sliderItem}>
        <View style={styles.cashSumBox}>
          <View style={styles.fireImgBox}>
            <Image source={fireCashSumIcon} style={styles.fireImg} />
          </View>
          <Text style={styles.cashSumTxt}>{data && data.cashback}%</Text>
        </View>
        <Image source={{ uri: data && data.img }} style={styles.sliderImg} />
      </View>

      <View style={styles.mainContent}>
        {data && profile && data.shop == profile.shop && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('QrMainScreen', { cashback: itemId })
            }
            style={styles.btnStyles}
          >
            <Image source={qrIconIOS} style={styles.qrIcon} />
          </TouchableOpacity>
        )}
        <View style={styles.mainTxtBox}>
          <Text style={styles.mainTxt}>
            {data ? data.title : 'название отсутствует'}
          </Text>
        </View>
        <View style={styles.contentBox}>
          <Text style={styles.contentTxt}>О горящем кэшбэке</Text>
          <Text style={styles.aboutCashTxt}>
            {data ? data.description : 'описание отсутствует'}
          </Text>
        </View>
        <View style={styles.contentBox}>
          <Text style={styles.contentTxt}>Даты горящего кэшбэка</Text>
          <View style={styles.calendarBox}>
            <CalendarHotCash all={all} />
          </View>
        </View>
        <View style={styles.contentBox}>
          <Text style={styles.contentTxt}>Горящий кэшбэк действует</Text>
          <View style={styles.cashTimeBox}>
            <View style={styles.cashClockImgBox}>
              <Image source={hotCashClockImg} style={styles.clockImg} />
            </View>
            <Text style={styles.timeTxt}>
              C <Text style={styles.greenTxt}>{time}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.lastContentBox}>
          <Text style={styles.contentTxt}>Узнать подробнее</Text>
          <View style={styles.cashTimeBox}>
            <View style={styles.cashClockImgBox}>
              <Image source={phoneIcon} style={styles.phoneImg} />
            </View>
            <Text style={styles.timeTxt}>+{data && data.phone}</Text>
          </View>
        </View>
        <DialogAlert
          answerModal={answerModal}
          setAnswerModal={setAnswerModal}
          message={'Удалить?'}
          funcOk={deleteHot}
        />
        {/* <View style={styles.contentBox}>
          <Reviews />
        </View>
        <View style={styles.contentBox}>
          <SendReview />
        </View> */}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContent: {
    width: '95%',
    alignSelf: 'center',
  },
  headerBox: {
    marginTop: Platform.OS === 'ios' ? '15%' : '10%',
    marginBottom: '5%',
    width: '95%',
    alignSelf: 'center',
    height: scalePoint * 20,
  },
  upBtnsBox: {
    position: 'absolute',
    zIndex: 999,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  deleteBtnBox: {
    marginRight: scalePoint * 10,
  },
  sliderItem: {
    width: width,
    height: scalePoint * 199,
  },
  sliderImg: {
    width: '100%',
    height: scalePoint * 199,
    resizeMode: 'cover',
  },
  mainTxtBox: {
    width: '80%',
    justifyContent: 'center',
    marginTop: '5%',
    marginBottom: '10%',
  },
  mainTxt: {
    marginLeft: '5%',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#313131',
  },
  cashSumBox: {
    width: scalePoint * 45,
    height: scalePoint * 45,
    borderRadius: scalePoint * 45 * 0.5,
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 9999,
    right: scalePoint * 20,
    bottom: scalePoint * 20,

    justifyContent: 'center',
  },
  cashSumTxt: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ff0707',
    marginLeft: scalePoint * 13,
  },
  fireImgBox: {
    width: scalePoint * 18,
    height: scalePoint * 18,
    borderRadius: scalePoint * 18 * 0.5,
    backgroundColor: '#ff0707',
    position: 'absolute',
    zIndex: 9999,

    right: scalePoint * 31,
    top: scalePoint * 24,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: 'transparent',
  },
  fireImg: {
    width: scalePoint * 9,
    height: scalePoint * 12,
    resizeMode: 'contain',
  },
  contentBox: {
    marginBottom: '10%',
  },
  lastContentBox: {
    marginBottom: '20%',
  },
  contentTxt: {
    fontSize: 18,
    color: '#505050',
    marginLeft: '5%',
  },
  aboutCashTxt: {
    marginTop: '5%',
    width: '90%',
    alignSelf: 'center',
    fontSize: 14,
    lineHeight: 20,
    color: '#000',
  },
  calendarBox: {
    marginTop: '5%',
    width: '100%',

    borderWidth: 1,
    borderColor: '#225196',
    borderRadius: scalePoint * 10,
  },
  cashTimeBox: {
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  cashClockImgBox: {
    marginRight: '3%',
  },
  clockImg: {
    width: scalePoint * 17,
    height: scalePoint * 17,
    resizeMode: 'contain',
  },
  timeTxt: {
    fontSize: 14,
  },
  greenTxt: {
    color: '#28ea60',
  },
  phoneImg: {
    width: scalePoint * 20,
    height: scalePoint * 20,
    resizeMode: 'contain',
  },
  btnStyles: {
    marginTop: scalePoint * 15,
    backgroundColor: '#ff0909',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: scalePoint * 60,
    height: scalePoint * 60,
    borderRadius: scalePoint * 30,
    alignSelf: 'flex-end',
    position: 'absolute',
    zIndex: 999,

    borderColor: '#fff',
  },
  qrIcon: {
    width: scalePoint * 36,
    height: scalePoint * 36,
    resizeMode: 'contain',
  },
});
