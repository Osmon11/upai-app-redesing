import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../../Common/Header';
import CashbackSum from './CashbackSum';
import GettingCashbacksList from './GettingCashbacksList';

import filterIcon from '../../../Images/filterIcon.png';
import AsyncStorage from '@react-native-community/async-storage';
import { API } from '../../../config';
import AnimatedLoader from 'react-native-animated-loader';
import { setNotificationHandler } from 'expo-notifications';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function NotificationsScreen({ route }) {
  const [businessStatus, setBusinessStatus] = useState(false);
  const [cashBackGet, setCashBackGet] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [viewLoader, setViewLoader] = React.useState(false);
  const navigation = useNavigation();
  // const [status, setStatus] = React.useState();
  // const [fromd, setFromd] = React.useState();
  // const [tod, setTod] = React.useState();
  const [s, setS] = React.useState();
  const [fromd, setFromd] = React.useState();
  const [tod, setTod] = React.useState();

  const { status } = route?.params;
  const { from } = route?.params;
  const { to } = route?.params;

  React.useEffect(() => {
    console.log('status', route?.params.status);
    console.log('from', route?.params.from);
    setS(status ? '&kind=' + status && status : '');
    setFromd(fromd ? '&from_date=' + fromd : '');
    setNotificationHandler(tod ? '&to_date=' + tod : '');
    getAll();

    getFullInfo();

    const unsubscribe = navigation.addListener('focus', () => {
      setViewLoader(true);
      getFullInfo();
    });
    return () => {
      unsubscribe;
    };
  }, [route?.params.status]);

  const getFullInfo = async () => {
    const token = await AsyncStorage.getItem('token');
    const resp = await fetch(API + 'users/profile/', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    const data = await resp.json();
    data && data.shop ? setBusinessStatus(true) : setBusinessStatus(false);

    data && setViewLoader(false);
  };

  const getAll = async () => {
    console.log('date', from);
    const token = await AsyncStorage.getItem('token');
    console.log(
      API +
        `users/notification/?offset=0&limit=50${
          status !== undefined ? `&kind=${status}` : ``
        }${from !== undefined ? `&from_date=${from}` : ``}${
          to !== undefined ? `&to_date=${to}` : ``
        }`
    );
    const req = await fetch(
      API +
        `users/notification/?offset=0&limit=50${
          status !== undefined ? `&kind=${status}` : ``
        }${from !== undefined ? `&from_date=${from}` : ``}${
          to !== undefined ? `&to_date=${to}` : ``
        }`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    );
    const res = await req.json();
    req && setViewLoader(false);
    console.log('res', res);
    setCashBackGet(res.results);
  };

  return (
    <View style={styles.container}>
      <AnimatedLoader
        visible={viewLoader}
        overlayColor="rgba(255,255,255,1)"
        source={require('../../../Common/loader.json')}
        animationStyle={{ width: 100, height: 100, resizeMode: 'cover' }}
        speed={1}
      ></AnimatedLoader>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollBox}>
        <View style={styles.headerBox}>
          <Header />
        </View>
        <View style={{ width: '95%', alignSelf: 'center' }}>
          <View
            style={
              businessStatus ? styles.mainTxtBox : styles.businessMainTxtBox
            }
          >
            <Text style={styles.mainText}>Уведомления</Text>
            <TouchableOpacity
              style={businessStatus ? { display: 'flex' } : { display: 'none' }}
              onPress={() => navigation.navigate('FilterNotificationsScreen')}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                }}
                source={filterIcon}
              />
            </TouchableOpacity>
          </View>
          <View
            style={businessStatus ? { display: 'none' } : styles.btnContainer}
          >
            <TouchableOpacity
              onPress={() => setOpen(!open)}
              style={open ? styles.active : styles.logInBtn}
            >
              <Text style={open ? styles.btnActive : styles.btnTxt}>
                Поступления
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOpen(!open)}
              style={open ? styles.logInBtn : styles.active}
            >
              <Text style={open ? styles.btnTxt : styles.btnActive}>Вывод</Text>
            </TouchableOpacity>
          </View>
          <View
            style={
              businessStatus ? styles.CashbackSumsView : styles.inactiveBox
            }
          >
            <CashbackSum cashBackGet={cashBackGet} />
          </View>
          <View
            style={businessStatus ? styles.inactiveBox : { display: 'flex' }}
          >
            <View style={open ? styles.CashbackSumsView : styles.inactiveBox}>
              <CashbackSum cashBackGet={cashBackGet} />
            </View>
            <View style={open ? styles.inactiveBox : styles.CashbackSumsView}>
              <GettingCashbacksList refresh={viewLoader} />
            </View>
          </View>
        </View>
      </ScrollView>
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
    marginTop: Platform.OS === 'ios' ? scalePoint * 46 : scalePoint * 25,
  },
  headerBox: {
    width: '100%',
    height: scalePoint * 23,
  },
  mainTxtBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: scalePoint * 37,
    alignItems: 'center',
    alignSelf: 'center',
  },
  businessMainTxtBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginTop: '10%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  mainText: {
    fontSize: 24,
    lineHeight: 28,
  },
  btnContainer: {
    marginTop: scalePoint * 20,
    flexDirection: 'row',
    width: '95%',
    height: scalePoint * 35,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBEBEB',
    borderRadius: 4,
    alignItems: 'center',
  },
  logInBtn: {
    width: '50%',
    height: scalePoint * 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: '#000',
    fontSize: 14,
    lineHeight: 17,
  },
  btnActive: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 17,
  },
  active: {
    backgroundColor: '#ff6b00',
    width: '50%',
    height: scalePoint * 33,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    color: '#fff',
  },
  CashbackSumsView: {
    flex: 1,
    paddingBottom: '5%',
    marginTop: scalePoint * 27,
  },
  inactiveBox: {
    display: 'none',
  },
});
