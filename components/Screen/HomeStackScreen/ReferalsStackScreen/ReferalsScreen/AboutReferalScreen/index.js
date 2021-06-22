import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import HeaderInStackScreens from '../../../../../Common/HeaderInStackScreens';

export default function AboutReferalScreen() {
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
            <Text style={styles.namePage}>Что такое реферал</Text>
          </View>
          <View style={styles.textContent}>
            <Text style={styles.topTxt}>
              Хочешь добавить свою компанию в УПАЙ {'\n'}
              Укажите название , номер и мы свяжемся с вами. {'\n'}
            </Text>
            <Text style={styles.bottomTxt}>
              Пригласи друга по уникальной ссылке и получай бонусы Получай
              бонусы приглашая друзей
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
    color: '#515151',
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'RobotoLight',
  },
  bottomTxt: {
    marginTop: '5%',
    color: '#515151',
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'RobotoLight',
  },
});
