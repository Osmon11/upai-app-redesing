import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import InviteIcon from '../../../Images/profileMenuInviteIcon.png';
import CashbackIcon from '../../../Images/FireCashbacksIcon.png';
import SettingIcon from '../../../Images/profileMenuSettingIcon.png';
import FaqIcon from '../../../Images/profileMenuFaqIcon.png';
import BusinessProfileIcon from '../../../Images/profileMenuBusinessProfileIcon.png';
import ShareIcon from '../../../Images/profileMenuShareIcon.png';
import LogOutIcon from '../../../Images/profileMenuLogOutIcon.png';
import myStoreIcon from '../../../Images/profileMenuMyStoreIcon.png';
import storeSettingIcon from '../../../Images/profileMenuStoreSettingIcon.png';
import aboutIcon from '../../../Images/AboutIcon.png';
import ReplanishIcon from '../../../Images/ReplanishAccountImg.png';

import AsyncStorage from '@react-native-community/async-storage';

import { Share } from 'react-native';
import ExitDialog from '../../../Common/ExitDialog';

export default function ProfileScreenMenu({ data }) {
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();
  const shareAppIos = () => {
    Share.share({
      title: 'Cкачай приложение UPAI и получай кэшбэк',
      message: 'https://apps.apple.com/ru/app/upai/id1553749845',
    });
  };
  const shareAppAndroid = () => {
    Share.share({
      title: 'Cкачай приложение UPAI и получай кэшбэк',
      message: 'https://play.google.com/store/apps/details?id=com.up.upaii',
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      {data && data.shop !== null ? (
        <>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() =>
              navigation.navigate('CompanyScreen', { itemId: data.shop })
            }
          >
            <View style={styles.btnContent}>
              <Image style={styles.btnIcon} source={myStoreIcon} />
              <Text style={styles.btnText}>Моё заведение</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => navigation.navigate('CashbackSettingScreen')}
          >
            <View style={styles.btnContent}>
              <Image style={styles.btnIcon} source={CashbackIcon} />
              <Text style={styles.btnText}>Горящий кэшбэк</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => navigation.navigate('ReferalsScreen')}
        >
          <View style={styles.btnContent}>
            <Image style={styles.btnIcon} source={InviteIcon} />
            <Text style={styles.btnText}>Пригласить друга</Text>
          </View>
        </TouchableOpacity>
      )}

      {data && !data.shop ? (
        <>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => navigation.navigate('WalletSettingsScreen')}
          >
            <View style={styles.btnContent}>
              <Image style={styles.btnIcon} source={SettingIcon} />
              <Text style={styles.btnText}>Кошелек</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => navigation.navigate('FaqScreen')}
          >
            <View style={styles.btnContent}>
              <Image style={styles.btnIcon} source={FaqIcon} />
              <Text style={styles.btnText}>FAQ</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => navigation.navigate('BusinessProfileScreen')}
          >
            <View style={styles.btnContent}>
              <Image style={styles.btnIcon} source={BusinessProfileIcon} />
              <Text style={styles.btnText}>Бизнес профиль</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => {
              Platform.OS === 'android' ? shareAppAndroid() : shareAppIos();
            }}
          >
            <View style={styles.btnContent}>
              <Image style={styles.btnIcon} source={ShareIcon} />
              <Text style={styles.btnText}>Поделиться приложением</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : null}

      {data && data.shop ? (
        <>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => navigation.navigate('AboutAppScreen')}
          >
            <View style={styles.btnContent}>
              <Image style={styles.btnIcon} source={aboutIcon} />
              <Text style={styles.btnText}>О программе</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => navigation.navigate('ReplanishAccountScreen')}
          >
            <View style={styles.btnContent}>
              <Image style={styles.btnIcon} source={ReplanishIcon} />
              <Text style={styles.btnText}>Пополнение через Optima</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => navigation.navigate('FaqScreen')}
          >
            <View style={styles.btnContent}>
              <Image style={styles.btnIcon} source={FaqIcon} />
              <Text style={styles.btnText}>FAQ</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() =>
              navigation.navigate('CompanySettingsScreen', {
                shopId: data.shop,
              })
            }
          >
            <View style={styles.btnContent}>
              <Image style={styles.btnIcon} source={storeSettingIcon} />
              <Text style={styles.btnText}>Настройки</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : null}
      {/* <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => navigation.navigate('ReferalsScreen')}
      >
        <View style={styles.btnContent}>
          <Image style={styles.btnIcon} source={InviteIcon} />
          <Text style={styles.btnText}>Пригласить друга</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => navigation.navigate('WalletSettingsScreen')}
      >
        <View style={styles.btnContent}>
          <Image style={styles.btnIcon} source={SettingIcon} />
          <Text style={styles.btnText}>Настройки кошелька</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => navigation.navigate('FaqScreen')}
      >
        <View style={styles.btnContent}>
          <Image style={styles.btnIcon} source={FaqIcon} />
          <Text style={styles.btnText}>FAQ</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => navigation.navigate('BusinessProfileScreen')}
      >
        <View style={styles.btnContent}>
          <Image style={styles.btnIcon} source={BusinessProfileIcon} />
          <Text style={styles.btnText}>Бизнес профиль</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={
          Platform.OS === 'ios' ? () => shareAppIos() : () => shareAppAndroid()
        }
      >
        <View style={styles.btnContent}>
          <Image style={styles.btnIcon} source={ShareIcon} />
          <Text style={styles.btnText}>Поделиться приложением</Text>
        </View>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => setIsVisible(true)}
      >
        <View style={styles.btnContent}>
          <Image style={styles.btnIcon} source={LogOutIcon} />
          <Text style={styles.btnText}>Выйти</Text>
        </View>
      </TouchableOpacity>
      <ExitDialog
        answerModal={isVisible}
        funcOk={() => {
          AsyncStorage.removeItem('token');
          setIsVisible(false);
          navigation.navigate('LoginMainScreen');
        }}
        setAnswerModal={setIsVisible}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  btnStyle: {
    width: '90%',
    height: 40,
    borderTopWidth: 1,
    borderTopColor: '#ebebeb',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  btnContent: {
    marginTop: '5%',
    flexDirection: 'row',
    marginBottom: '5%',
  },
  btnIcon: {
    width: 19,
    height: 19,
    resizeMode: 'contain',
    marginLeft: '10%',
    marginRight: '7%',
  },
  btnText: {
    fontSize: 16,
    lineHeight: 18,
    color: '#313131',
    fontFamily: 'SfPro',
  },
});
