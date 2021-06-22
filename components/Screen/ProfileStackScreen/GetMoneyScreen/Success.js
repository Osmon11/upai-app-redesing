import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-shadow-cards';

import successIcon from '../../../Images/successIcon.png';

export default function Success({data}) {
  const navigation = useNavigation();
  const shadowOpt1 = {
    width: 325,
    height: 376,
    color: '#000',
    border: 5,
    radius: 10,
    opacity: 0.1,
    x: 0,
    y: 5,
  };

  return (
    <View>
      <Card
        style={{
          width: '95%',
          height: 376,
          borderRadius: 10,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
          }}
        >
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
            }}
            source={successIcon}
          />
        </View>
        <View
          style={{
            width: '70%',
            marginTop: '10%',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              lineHeight: 19,
              textAlign: 'center',
              color: '#515151',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 19,
                fontWeight: 'bold',
              }}
            >
              {data && data.amount} сом{' '}
            </Text>
            были успешно переведены на {data && data.method == 'o_money' ? 'О деньги' : data && data.method == 'balance' ? "Beeline Balance" : data && data.method == 'mega_pay' ? "Mega Pay" : null}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => navigation.navigate('ProfileScreen')}
        >
          <Text style={styles.btnTxt}>Закрыть</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  btnStyle: {
    marginTop: '15%',
    marginBottom: '5%',
    width: 225,
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ff6b00',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    fontSize: 14,
    lineHeight: 16,
    color: '#ff6b00',
  },
});
