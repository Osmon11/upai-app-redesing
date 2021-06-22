import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import HeaderInStackScreens from '../../../Common/HeaderInStackScreens';

export default function AboutBussines() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainContent}
      >
        <View style={styles.headerBox}>
          <HeaderInStackScreens />
        </View>
        <View style={styles.showbleView}>
          <View style={styles.namePageView}>
            <Text style={styles.namePage}>Что такое бизнес профиль</Text>
          </View>
          <View style={styles.textContent}>
            <Text style={styles.topTxt}>
              Upai это партнер Вашего бизнеса. Наша миссия в том, чтобы
              привлекать к Вам больше клиентов, которым вы будете перечислять
              кэшбэк через сервис Upai.{'\n'}
            </Text>
            <Text style={styles.bottomTxt}>
              Вы зарабатываете на продаже своих товаров и услуг, получите
              лояльных покупателей, экономите на рекламе.{' '}
            </Text>
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
  mainContent: {
    width: '95%',
    alignSelf: 'center',
  },
  headerBox: {
    width: '100%',
    marginTop: Platform.OS === 'ios' ? '15%' : '10%',
    height: 23,
  },
  showbleView: {
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  namePage: {
    color: '#313131',
    fontSize: 24,
    lineHeight: 26,
    marginLeft: '5%',
  },
  textContent: {
    marginTop: '10%',
  },
  topTxt: {
    color: '#000',
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Roboto',
    textAlign: 'justify',
  },
  bottomTxt: {
    marginTop: '5%',
    color: '#000',
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Roboto',
    textAlign: 'justify',
  },
});
