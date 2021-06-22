import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import phoneIcon from '../../../Images/PhoneIcon.png';
import passIcon from '../../../Images/PassIcon.png';
import { API } from '../../../config';
import AsyncStorage from '@react-native-community/async-storage';
import DialogAlert from '../../../Common/DialogAlert';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function ForgetPass() {
  const navigation = useNavigation();

  const [value, numbersInput] = useState('Введите ваш номер');
  const [value1, passInput] = useState('Введите пин');
  const [phone, setPhone] = useState('996');
  const [changePass, setChangePass] = useState(false);
  const [prettyPhoneNum, setPrettyPhoneNum] = useState('996');
  const [pin, setPin] = useState('');
  const [pass2, setPass2] = useState('');
  const [answerModal, setAnswerModal] = useState(false);
  const [modalTxt, setModalTxt] = useState();

  const getToken = async () => {
    let data = {
      phone: phone,
      password: pass2,
    };
    try {
      const response = await fetch(API + 'users/token/', {
        method: 'POST', // или 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
      });
      const json = await response.json();

      if (json.access) {
        await AsyncStorage.setItem('token', json.access);
        navigation.navigate('ProfileScreen');
      } else {
        setAnswerModal(true);
        setModalTxt(json.detail);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  const forgotPass = async () => {
    const resp = await fetch(API + 'users/forgot-password/?phone=' + phone, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await resp.json();
    if (data.message) {
      setAnswerModal(true);
      setModalTxt(data.message);
      setChangePass(true);
    } else {
      setAnswerModal(true);
      setModalTxt(data.phone[0]);
    }
  };
  const changePassReq = async () => {
    const datas = {
      phone: phone,
      code: pin,
      password: pass2,
    };
    try {
      const response = await fetch(API + 'users/forgot-password/', {
        method: 'POST', // или 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datas), // данные могут быть 'строкой' или {объектом}!
      });
      const json = await response.json();

      if (json.message) {
        getToken();
      } else if (json.code) {
        setAnswerModal(true);
        setModalTxt(json.code[0]);
      } else if (json.phone) {
        setAnswerModal(true);
        setModalTxt(json.phone[0]);
      } else if (json.password) {
        setAnswerModal(true);
        setModalTxt(json.password[0]);
      } else if (json.error) {
        setAnswerModal(true);
        setModalTxt(json.error);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const getPhoneNum = (text) => {
    let value = text;
    setPrettyPhoneNum(
      value
        .split('')
        .reverse()
        .join('')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        .split('')
        .reverse()
        .join('')
        .trim()
    );
    setPhone(value.replace(/\s/g, ''));
  };

  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
      }}
    >
      <View style={styles.inputBox}>
        <Image style={styles.textInputsIcon} source={phoneIcon} />
        <TextInput
          style={styles.textInputStyle}
          keyboardType="number-pad"
          placeholder={value}
          value={prettyPhoneNum}
          onChangeText={(text) => getPhoneNum(text)}
          maxLength={15}
        />
      </View>
      {changePass && (
        <>
          <View style={styles.inputBox}>
            <Image style={styles.textInputsIcon} source={passIcon} />
            <TextInput
              style={styles.textInputStyle}
              placeholder={value1}
              keyboardType="number-pad"
              value={pin}
              maxLength={4}
              onChangeText={(text) => setPin(text)}
            />
          </View>

          <View style={styles.inputBox}>
            <Image style={styles.textInputsIcon} source={passIcon} />
            <TextInput
              style={styles.textInputStyle}
              secureTextEntry={true}
              placeholder={'Придумайте новый пароль'}
              value={pass2}
              onChangeText={(e) => setPass2(e)}
            />
          </View>
        </>
      )}

      <View
        style={{
          alignItems: 'center',
          marginTop: '5%',
        }}
      >
        <TouchableOpacity
          style={styles.btnSignIn}
          onPress={() => {
            !changePass ? forgotPass() : changePassReq();
          }}
        >
          <Text
            style={{
              marginTop: '8%',
              color: '#fff',
              fontSize: 16,
              lineHeight: 19,
            }}
          >
            Отправить
          </Text>
        </TouchableOpacity>
      </View>
      <DialogAlert
        answerModal={answerModal}
        setAnswerModal={setAnswerModal}
        message={modalTxt}
        funcOk={() => setAnswerModal(false)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  btnSignIn: {
    width: scalePoint * 163,
    height: scalePoint * 45,
    backgroundColor: '#225196',
    alignItems: 'center',
    borderRadius: 30,
  },
  inputBox: {
    width: '100%',
    marginTop: '5%',
    height: 45,
    borderColor: '#225196',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textInputsIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  textInputStyle: {
    width: '80%',
    height: 40,
    marginLeft: '5%',
    fontSize: 16,
    lineHeight: 18,
    fontFamily: 'SfPro',
    color: '#225196',
  },
});
