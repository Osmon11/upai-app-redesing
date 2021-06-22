import React from 'react';
import { BoxShadow } from 'react-native-shadow';

import { Image, View, StyleSheet, Text } from 'react-native';

import gettingCashbacksIcon from '../../../../Images/gettingCashbacksIcon.png';
import waitingCashbacksIcon from '../../../../Images/waitingCashbacksIcon.png';
import declinedCashbacksIcon from '../../../../Images/declinedCashbacksIcon.png';
import { API } from '../../../../config';
import AsyncStorage from '@react-native-community/async-storage';
import EmptyComponent from '../../../../Common/EmptyComponent';

export default function GettingCashbacksList({ refresh }) {
  const [cashBackGet, setCashBackGet] = React.useState([]);
  React.useEffect(() => {
    getAll();
  }, []);
  React.useEffect(() => {
    getAll();
  }, [refresh]);
  const getAll = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('token', token);
    const req = await fetch(API + 'users/withdrawal/?limit=50', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    const res = await req.json();
    console.log('data', res);
    setCashBackGet(res.results);
  };
  const shadowOpt = {
    width: 51,
    height: 50,
    color: '#A0A0A0',
    border: 2,
    radius: 10,
    opacity: 0.1,
    x: -1,
    y: 1.5,
  };

  return (
    <View style={{ backgroundColor: '#fff', height: '100%' }}>
      <View>
        {cashBackGet?.length !== 0 ? (
          cashBackGet?.map((item, index) => (
            <View
              style={{
                flexDirection: 'row',
                height: 70,
                borderBottomWidth: 1,
                borderBottomColor: '#EBEBEB',
                alignItems: 'center',
                paddingLeft: '2%',
              }}
              key={index}
            >
              <BoxShadow setting={shadowOpt}>
                <View style={styles.iconBox}>
                  <Image
                    style={styles.boxImage}
                    source={item.status=='unprocessed' ?waitingCashbacksIcon :gettingCashbacksIcon}
                  />
                </View>
              </BoxShadow>
              <View style={styles.cashbacksInfoBox}>
                <View style={styles.cashbacksInfoTextBox}>
                  <Text style={styles.cashbacksInfoText}>
                    {String(item.text).length > 36
                      ? String(item.text).substr(0, 36) + '...'
                      : item.text}
                  </Text>
                  <Text style={styles.cashbacksInfoText} >
                    На номер +{item.requisite}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.cashbacksComesDate}>
                    {' '}
                    {new Date(item.created).getDate() <= 9
                      ? '0' + new Date(item.created).getDate()
                      : new Date(item.created).getDate()}
                    .
                    {new Date(item.created).getMonth() <= 9
                      ? '0' + (new Date(item.created).getMonth() + 1)
                      : new Date(item.created).getMonth() + 1}
                    .{new Date(item.created).getFullYear()}
                  </Text>
                  <Text style={styles.cashbacksComesTime}>
                    {new Date(item.created).getHours() <= 9
                      ? '0' + new Date(item.created).getHours()
                      : new Date(item.created).getHours()}{' '}
                    :{' '}
                    {new Date(item.created).getMinutes() <= 9
                      ? '0' + new Date(item.created).getMinutes()
                      : new Date(item.created).getMinutes()}
                  </Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <EmptyComponent />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 50,
    height: 50,
    borderWidth: 0.5,
    borderColor: 'rgba(146, 146, 146, 0.37)',
    justifyContent: 'center',
  },
  boxImage: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  cashbacksInfoBox: {
    marginLeft: '2%',
    marginTop: '2%',
    width: '100%',
  },
  cashbacksInfoTextBox: {
    width: '90%',
  },
  cashbacksInfoText: {
    fontSize: 13,
    lineHeight: 15,
    width: '90%',
  },
  cashbacksComesTime: {
    marginTop: '5%',
    flexDirection: 'row',
    width: '100%',
  },
  cashbacksComesDate: {
    fontSize: 10,
    lineHeight: 12,
    color: '#6B6B6B',
    marginRight: '9%',
    marginTop: 5,
    fontFamily: 'RobotoLight',
  },
  cashbacksComesTime: {
    fontSize: 10,
    lineHeight: 12,
    color: '#6B6B6B',
    marginTop: 5,
    fontFamily: 'RobotoLight',
  },
  shopNameBox: {
    width: '50%',
  },
  shopName: {
    fontSize: 12,
    color: '#313131',
  },
});
