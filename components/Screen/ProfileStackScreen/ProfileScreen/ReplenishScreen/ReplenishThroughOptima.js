import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import HeaderInStackScreens from '../../../../Common/HeaderInStackScreens';
import optimaLogo from '../../../../Images/OptimaLogo.png';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function ReplanishAccount() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.headerBox}>
          <HeaderInStackScreens />
        </View>
        <View style={styles.optimaLogoBox}>
          <Image source={optimaLogo} style={styles.optimaLogo} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.contentName}>
            Пополнить лицевой счет Вы сможее с помощью электронного кошелька
            Элсом.
          </Text>
          <Text style={{ ...styles.contentName, marginBottom: '5%' }}>
            Для этого вам необходимо:
          </Text>
          <Text style={styles.contentTxt}>
            1. Откройте на телефоне приложение онлайн-банкинг Оптима24
          </Text>
          <Text style={styles.contentTxt}>
            2. Перейдите в раздел «переводы» и выберите подраздел «перевод на
            карту/счёт»
          </Text>
          <Text style={styles.contentTxt}>
            3. Далее вводите номер карты нашей компании: 4169 6151 8802 7175 -
            О.Р. Далее впишите нужную сумму перевода и затем нажимаете кнопку
            «оплатить»
          </Text>
        </View>
        <View style={styles.simpleContainer}>
          <Text style={styles.contentTitle}>Пример оплаты</Text>
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
    fontSize: 16,
    marginLeft: '5%',
    marginTop: '5%',
    fontFamily: 'Roboto',
    color: '#393939',
  },
  optimaLogoBox: {
    width: 105,
    height: 105,
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optimaLogo: {
    width: 80,
    height: 82,
  },
  textContainer: {
    borderBottomWidth: 1,
    paddingBottom: 20,
    borderBottomColor: '#D9D9D9',
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
  simpleContainer: {
    marginTop: 20,
  },
  contentTitle: {
    fontFamily: 'Roboto',
    fontSize: 18,
    lineHeight: 27,
  },
});
