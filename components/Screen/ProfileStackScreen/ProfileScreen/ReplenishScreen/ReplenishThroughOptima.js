import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import HeaderInStackScreens from '../../../../Common/HeaderInStackScreens';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function ReplanishAccount() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.headerBox}>
          <HeaderInStackScreens />
        </View>
        <View>
          <Text style={styles.contentName}>Как пополнить кошелек?</Text>
          <Text style={styles.contentTxt}>
            1. Вам необходимо в терминале выбрать "Электронные кошельки"
          </Text>
          <Text style={styles.contentTxt}>
            2. Выберите услугу "Upai - Пополнение баланса"
          </Text>
          <Text style={styles.contentTxt}>
            3. Введите следующий реквизит "Укажите номер телефона"
          </Text>
          <Text style={styles.centralContentTxt}>Комиссия системы: 5.00%</Text>
        </View>
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
    width: '100%',
    height: scalePoint * 25,
  },
  contentName: {
    fontSize: 20,
    marginLeft: '5%',
    marginTop: '5%',
  },
  contentTxt: {
    width: '90%',
    alignSelf: 'center',
    marginTop: '5%',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'RobotoLight',
    textAlign: 'justify',
  },
  centralContentTxt: {
    alignSelf: 'center',
    marginTop: '10%',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'RobotoLight',
    textAlign: 'justify',
  },
  boldTxt: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'RobotoLight',
    fontWeight: '700',
  },
});
