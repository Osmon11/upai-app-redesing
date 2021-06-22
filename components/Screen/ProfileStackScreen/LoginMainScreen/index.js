import React from 'react';
import leadLoginLogo from '../../../Images/LogoForLeadLogin.png';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Login from './Login';
import Registration from './Registration';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import ForgetPass from './ForgetPass';

const window = Dimensions.get('window');
const width = window.width * 0.9;
const scalePoint = width / 380;
import AnimatedLoader from 'react-native-animated-loader';
export default function LoginMainScreen() {
  const [open, setOpen] = React.useState(true);
  const [forgotPass, setForgotPass] = React.useState(false);
  const [auth, setAuth] = React.useState();
  const navigation = useNavigation();
  const [viewLoader, setViewLoader] = React.useState(true);
  React.useEffect(() => {
    getToken();
    const unsubscribe = navigation.addListener('focus', () => {
      setViewLoader(true);
      getToken();
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);
  const getToken = async () => {
    const result = await AsyncStorage.getItem('token');
    if (result != null) {
      setViewLoader(false);
    } else {
      setViewLoader(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : null}
      style={styles.container}
    >
      <AnimatedLoader
        visible={viewLoader}
        overlayColor="rgba(255,255,255,1)"
        source={require('../../../Common/loader.json')}
        animationStyle={{ width: 100, height: 100, resizeMode: 'cover' }}
        speed={1}
      ></AnimatedLoader>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={viewLoader ? {display:'none'} :styles.LeadLoginContainer}
      >
        <View style={styles.LeadLogoContainer}>
          <Image style={styles.LeadLogoIcon} source={leadLoginLogo} />
        </View>
        <View>
          {forgotPass ? (
            <View style={styles.forgetBox}>
              <ForgetPass />
            </View>
          ) : (
            <View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={open ? styles.active : styles.logInBtn}
                  onPress={() => setOpen(!open)}
                >
                  <Text style={open ? styles.btnActive : styles.btnTxt}>
                    Вход
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={open ? styles.logInBtn : styles.active}
                  onPress={() => setOpen(!open)}
                >
                  <Text style={open ? styles.btnTxt : styles.btnActive}>
                    Регистрация
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={
                  open ? styles.LoginContainer : styles.RegistrationContainer
                }
              >
                <Login />
              </View>
              <View
                style={
                  open ? styles.RegistrationContainer : styles.LoginContainer
                }
              >
                <Registration open={!open ? true : false} />
              </View>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => setForgotPass(!forgotPass)}
          style={styles.cantLoginBox}
        >
          <Text style={styles.cantloginTxt}>
            {!forgotPass ? 'Не можете войти ? ' : 'Войти'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('HomeStackScreen', { screen: 'HomeScreen' })
          }
          style={styles.laterBtnBox}
        >
          <Text style={styles.laterBtnTxt}>ПОЗЖЕ</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  LeadLoginContainer: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    marginTop: '8%',
    width: '100%',
  },
  forgetBox: {
    marginTop: '10%',
  },
  LeadLogoContainer: {
    marginTop: '30%',
    alignItems: 'center',
    width: '100%',
  },
  LeadLogoIcon: {
    width: scalePoint * 100,
    height: scalePoint * 100,
    resizeMode: 'contain',
  },
  LeadSocialText: {
    marginTop: '5%',
    fontSize: 18,
    lineHeight: 21,
    fontWeight: '300',
    color: '#515151',
  },
  LeadSocials: {
    flexDirection: 'row',
    display: 'flex',
    marginTop: '5%',
    width: '70%',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  LeadSocialView: {
    borderColor: '#225196',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    height: scalePoint * 50,
    width: scalePoint * 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
  },
  googleIcon: {
    width: scalePoint * 28,
    height: scalePoint * 28,
  },

  socialIcon: {
    width: scalePoint * 28,
    height: scalePoint * 28,
  },
  btnContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  logInBtn: {
    width: '45%',
    height: scalePoint * 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#EBEBEB',
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
    width: '45%',
    height: scalePoint * 45,
    alignItems: 'center',
    borderRadius: 4,
    color: '#fff',
    justifyContent: 'center',
  },
  LoginContainer: {
    marginTop: '5%',
    width: '100%',
  },
  RegistrationContainer: {
    width: '100%',
    display: 'none',
  },
  cantLoginBox: {
    alignSelf: 'center',
    marginTop: '5%',
  },
  cantloginTxt: {
    fontSize: 12,
    color: '#225196',
  },
  laterBtnBox: {
    alignSelf: 'center',
    marginTop: '5%',
    paddingBottom: '15%',
  },
  laterBtnTxt: {
    fontSize: 14,
    color: '#225196',
    textTransform: 'uppercase',
  },
});
