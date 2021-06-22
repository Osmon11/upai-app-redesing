import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-shadow-cards';

import HeaderInStackScreens from '../../../Common/HeaderInStackScreens';
import ProfileInfo from '../../../Common/PropfileInfo';

import lastSuccessIcon from '../../../Images/lastSuccessScreenIcon.png';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function LastSuccessScreen({route}) {
  
  const {sum, name} = route.params
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContentBox}>
        <View style={styles.headerBox}>
          <HeaderInStackScreens />
        </View>
        <View style={styles.profileBox}>
          <ProfileInfo />
        </View>
        <Card style={styles.shadowCard}>
          <View style={styles.cardContent}>
            <Image source={lastSuccessIcon} style={styles.imgInCard} />
            <View style={styles.txtBox}>
              <Text style={styles.txtInCard}>
                <Text style={{ fontWeight: 'bold' }}>{sum} сом </Text>
                были успешно переведены пользователю 
                <Text style={{ fontWeight: 'bold' }}> {name}</Text>
              </Text>
            </View>

            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() =>
                navigation.navigate('QrMainScreen')
              }
            >
              <Text style={styles.btnText} >Закрыть</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </ScrollView>
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
  },
  headerBox: {
    marginTop: Platform.OS === 'ios' ? '15%' : '5%',
  },
  profileBox: {
    marginBottom: '5%',
  },
  shadowCard: {
    width: '100%',
    borderRadius: 10,
    marginTop: '5%',
    height: scalePoint * 413,
    alignItems: 'center',
  },
  imgInCard: {
    width: scalePoint * 104,
    height: scalePoint * 115,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: '20%',
  },
  txtBox: {
    marginTop: '10%',
    marginBottom: '10%',
    width: '50%',
  },
  txtInCard: {
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
  },
  filterBtn: {
    width: scalePoint * 150,
    height: scalePoint * 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF6B00',
    marginTop: '5%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnText: {
    fontSize: 16,
    lineHeight: 18,
    color: '#FF6B00',
    alignSelf: 'center',
  },
});
