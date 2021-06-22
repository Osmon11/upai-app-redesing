import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import HeaderInStackScreens from '../../../Common/HeaderInStackScreens';
import SendRequest from './SendRequest';

import emptyProfileAccountImg from '../../../Images/emptyProfileAccountImg.png';

import AsyncStorage from '@react-native-community/async-storage';
import { API } from '../../../config';
const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function BusinessProfileScreen() {
  const [avatar, setAvatar] = React.useState();
  React.useEffect(() => {
    getFullInfo();
  }, []);
  const getFullInfo = async () => {
    const token = await AsyncStorage.getItem('token');
    const resp = await fetch(API + 'users/profile/', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    const data = await resp.json();
    setAvatar(data.avatar);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainContentBox}
      >
        <View style={styles.headerBox}>
          <HeaderInStackScreens />
        </View>
        <View style={styles.contentBox}>
          <View style={styles.accountImgFirstShadowCircle}>
            <View style={styles.accountImgSecondShadowCircle}>
              <View style={styles.accountImgThirdShadowCircle}>
                <Image
                  style={styles.accountImg}
                  source={avatar ? { uri: avatar } : emptyProfileAccountImg}
                />
              </View>
            </View>
          </View>
        </View>
        <View>
          <SendRequest />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    marginBottom: '10%',
  },

  headerBox: {
    marginTop: Platform.OS === 'ios' ? '15%' : '5%',
    width: '100%',
    height: scalePoint * 23,
  },
  contentBox: {
    alignSelf: 'center',
    marginTop: '10%',
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
    flexDirection: 'row',
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
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  accountImg: {
    width: scalePoint * 107,
    height: scalePoint * 107,
    borderRadius: scalePoint * 107 * 0.5,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
});
