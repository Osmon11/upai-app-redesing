import React from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { SimpleLineIcons } from '@expo/vector-icons';

import fireCashbacksIOSIcon from '../../../../../Images/FireCashbacksIOSIcon.png';
import fireCashSumIcon from '../../../../../Images/fireCashSumImg.png';
import { useNavigation } from '@react-navigation/native';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function HotCashesSlider({ market, hot, profile }) {
  const navigation = useNavigation();

  return (
    <View>
      <ScrollView
        style={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {hot &&
          hot.map((el) => (
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('HotCashbackInfoScreen', {
                    itemId: el.id,
                  })
                }
              >
                <Card style={styles.sliderItem}>
                  <View style={styles.sliderImg}>
                    <View style={styles.cashSumBox}>
                      <View style={styles.fireImgBox}>
                        <Image
                          source={fireCashSumIcon}
                          style={styles.fireImg}
                        />
                      </View>
                      <Text style={styles.cashSumTxt}>{el.cashback}%</Text>
                    </View>
                    <Image source={{ uri: el.img }} style={styles.sliderImg} />
                    <View style={styles.sliderTxtBox}>
                      <Text style={styles.sliderTxt}>{el.title}</Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
      {market == profile && (
        <TouchableOpacity
          style={styles.createCashbackBtn}
          onPress={() =>
            navigation.navigate('ProfileStackScreen', {
              screen: 'CashbackSettingScreen',
            })
          }
        >
          <View style={styles.fireIcon}>
            <SimpleLineIcons name="fire" size={16} color="#fff" />
          </View>

          <Text style={styles.createCashbackText}>Создать кэшбэк</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderItem: {
    width: scalePoint * 304,
    height: scalePoint * 212,
    marginLeft: scalePoint * 5,
    marginBottom: scalePoint * 5,
    marginRight: scalePoint * 15,
    elevation: 1,
    shadowOpacity: 0.1,
    borderRadius: scalePoint * 10,
  },
  sliderImg: {
    width: '100%',
    height: scalePoint * 160,
    resizeMode: 'cover',
  },
  sliderTxtBox: {
    justifyContent: 'center',
    height: scalePoint * 52,
  },
  sliderTxt: {
    marginLeft: '5%',
    fontSize: 16,
    color: '#313131',
  },
  cashSumBox: {
    width: scalePoint * 45,
    height: scalePoint * 45,
    borderRadius: scalePoint * 45 * 0.5,
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 9999,
    right: scalePoint * 10,
    bottom: scalePoint * 10,

    justifyContent: 'center',
  },
  cashSumTxt: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ff0707',
    marginLeft: scalePoint * 13,
  },
  fireImgBox: {
    width: scalePoint * 18,
    height: scalePoint * 18,
    borderRadius: scalePoint * 18 * 0.5,
    backgroundColor: '#ff0707',
    position: 'absolute',
    zIndex: 9999,

    right: scalePoint * 31,
    top: scalePoint * 24,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: 'transparent',
  },
  fireImg: {
    width: scalePoint * 12,
    height: scalePoint * 12,
    resizeMode: 'contain',
  },
  createCashbackBtn: {
    marginTop: '10%',
    width: scalePoint * 225,
    height: scalePoint * 45,
    backgroundColor: '#ff6b00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  fireIcon: {
    width: 16,
    height: 16,
    marginRight: '5%',
    alignSelf: 'center',
  },
  createCashbackText: {
    fontSize: 14,
    lineHeight: 16,
    color: '#fff',
  },
});
