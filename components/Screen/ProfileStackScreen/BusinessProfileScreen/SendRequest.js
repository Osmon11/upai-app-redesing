import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { API } from '../../../config';

import referalsQuestionIcon from '../../../Images/referalsQuestionIcon.png';
import SuccessScreen from './SuccessBusinessScreen';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;

import { useNavigation } from '@react-navigation/native';
import DialogAlert from '../../../Common/DialogAlert';

export default function SendRequest() {
  const navigation = useNavigation();

  const [opened, setOpened] = useState(true);
  const [value1, numberInput] = useState('Название бизнес профиля');
  const [value2, passInput] = useState('Телефон');
  const [nameMarket, setNameMarket] = useState('');
  const [phone, setPhone] = useState('996');
  const [answerModal, setAnswerModal] = useState(false);
  const [modalTxt, setModalTxt] = useState();

  const sendReq = async () => {
    const token = await AsyncStorage.getItem('token');
    let data = {
      shop_name: nameMarket,
      phone: phone,
    };
    ;
    try {
      const response = await fetch(API + 'shop/request/', {
        method: 'POST', // или 'PUT'
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
      });
      const json = await response.json();
      ;

      if (json.detail) {
        setAnswerModal(true);
        setModalTxt(json.detail);
      } else if (json?.phone && typeof json?.phone != 'string') {
        setAnswerModal(true);
        setModalTxt(json?.phone[0]);
      } else if (json?.shop_name && typeof json?.shop_name != 'string') {
        setAnswerModal(true);
        setModalTxt('Имя заведения обязательно к заполнению');
      } else {
        setModalTxt('Ваш запрос отправлен');
        setOpened(false);
        setAnswerModal(true);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={opened ? { display: 'none' } : { display: 'flex' }}>
        <SuccessScreen />
      </View>
      <View style={opened ? { display: 'flex' } : { display: 'none' }}>
        <View style={styles.mainContentBox}>
          <Text style={styles.mainText}>Бизнес профиль</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AboutBussines')}
          >
            <Image style={styles.questionIcon} source={referalsQuestionIcon} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: '5%',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              lineHeight: 16,
              textAlign: 'justify',
              color: '#000',
              fontFamily: 'Roboto',
            }}
          >
            Upai это партнер Вашего бизнеса. Наша миссия в том, чтобы привлекать
            к Вам больше клиентов, которым вы будете перечислять кэшбэк через
            сервис Upai. Вы зарабатываете на продаже своих товаров и услуг,
            получите лояльных покупателей, экономите на рекламе.{' '}
          </Text>
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.textInputStyle}
            placeholder={value1}
            value={nameMarket}
            onChangeText={(text) => setNameMarket(text)}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.textInputStyle}
            keyboardType="number-pad"
            placeholder={value2}
            maxLength={12}
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        <TouchableOpacity style={styles.btnStyle} onPress={sendReq}>
          <Text style={styles.btnTxt}>Оставить заявку на звонок</Text>
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
  container: {},
  mainContentBox: {
    marginTop: '10%',
    marginLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 24,
    lineHeight: 28,
  },
  questionIcon: {
    width: scalePoint * 20,
    height: scalePoint * 20,
    resizeMode: 'contain',
  },
  inputBox: {
    width: '100%',
    marginTop: '5%',
    height: scalePoint * 40,
    borderColor: '#225196',
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    width: '80%',
    height: scalePoint * 40,
    marginLeft: '5%',
    fontSize: 16,
  },
  btnStyle: {
    marginTop: '10%',
    width: '70%',
    height: scalePoint * 45,
    borderRadius: 10,
    backgroundColor: '#ff6b00',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    fontSize: 14,
    lineHeight: 16,
    color: '#fff',
  },
});
