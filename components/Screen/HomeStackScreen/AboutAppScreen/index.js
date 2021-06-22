import Constants from 'expo-constants';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import HeaderInStackScreens from '../../../Common/HeaderInStackScreens';
import oracleLogo from '../../../Images/OracleLogo.png';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function AboutAppScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContent}>
          <View style={styles.headerBox}>
            <HeaderInStackScreens />
          </View>
          <View>
            <Text style={styles.contentName}>О приложении</Text>
            <Text style={styles.contentTxt}>
              <Text style={styles.boldTxt}>Upai </Text> - это кэшбэк сервис, где
              пользователь может экономит на покупках получая часть потраченной
              суммы живыми деньгами, а субъект предпринимательства увеличивает
              продажи и получает лояльных клиентов.
            </Text>
            <Text style={styles.contentName}>Upai (для партнеров)</Text>
            <Text style={styles.contentTxt}>
              <Text style={styles.boldTxt}>Upai </Text> - это партнер Вашего
              бизнеса. Наша миссия в том, чтобы привлекать к Вам больше
              клиентов, которым вы будете перечислять кешбэк через сервис Upai.
              Вы зарабатываете на продаже своих товаров и услуг, получаете
              лояльных покупателей, экономите на рекламе.
            </Text>
            <Text style={styles.contentTxt}>
              Все что Вам нужно, это присоединится к системе Upai открыв бизнес
              профиль, пополнить лицевой счет в нашем сервисе, средства с
              которого будут перечисляться вашим клиентам в виде кэшбэк, при
              этом сервис взымает определенный процент с суммы кешбэк в качестве
              комиссии за услуги. Процентную ставку по кэшбэку Вы сможете
              устанавить сами.
            </Text>
          </View>
          <View>
            <Text style={styles.companyTxt}>
              Разработано и поддерживается компанией
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://odigital.app/')}
              style={styles.oracleLogoImgBox}
            >
              <Image source={oracleLogo} style={styles.oracleLogoImg} />
            </TouchableOpacity>
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
    paddingTop: Constants.statusBarHeight,
  },
  mainContent: {
    width: '95%',
    alignSelf: 'center',
    marginBottom: '15%',
  },
  headerBox: {
    marginTop: scalePoint * 20,
    width: '100%',
    height: scalePoint * 25,
  },
  contentName: {
    fontSize: 20,
    marginLeft: '5%',
    marginTop: '5%',
    fontFamily: 'Roboto',
  },
  contentTxt: {
    width: '90%',
    alignSelf: 'center',
    marginTop: '5%',
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Roboto',
    textAlign: 'justify',
  },
  boldTxt: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  companyTxt: {
    marginTop: scalePoint * 50,
    fontSize: 18,
    lineHeight: 23,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#4F4F4F',
    fontFamily: 'Roboto',
  },
  oracleLogoImgBox: {
    marginTop: scalePoint * 13,
    width: scalePoint * 109,
    height: scalePoint * 36,
    alignSelf: 'center',
  },
  oracleLogoImg: {
    width: scalePoint * 109,
    height: scalePoint * 36,
  },
});
