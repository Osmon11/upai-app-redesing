import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  Platform,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Header from '../../../../Common/Header';

import filterIcon from '../../../../Images/filterIcon.png';
import SendedCashbacks from './SendedCashbacks';
import CommentsToCashback from './CommentsToCashback';
import AsyncStorage from '@react-native-community/async-storage';
import { API } from '../../../../config';
const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function HistoryOfBuys({ route }) {
  const [openComments, setOpenComments] = useState(false);

  const navigation = useNavigation();
  const [viewLoader, setViewLoader] = React.useState(true);
  const [openCommentsForView, setOpenCommentsForView] = useState();
  const [cashBackGet, setCashBackGet] = React.useState();
  const [urls, setUrl] = React.useState('sell/?limit=100');

  // const { from, to } = route ? route.params : '';
  React.useEffect(() => {
    if (route?.params.from !== undefined && route?.params.to !== undefined) {
      getFilteredHistory(
        urls + `&from_date=${route?.params.from}&to_date=${route?.params.to}`
      );
    } else {
      getAll();
    }
  }, []);

  const getAll = async (val) => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(API + 'sell/?limit=100', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    const res = await req.json();
    setCashBackGet(res.results);
  };

  const openingComments = (index) => {
    setOpenComments(true);
    setOpenCommentsForView(index);
  };

  const closeComments = () => {
    setOpenComments(false);
  };

  const getFilteredHistory = async (val) => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(API + val, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    const res = await req.json();
    setCashBackGet(res.results);
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainBox}>
        <View
          style={
            route && route?.params.filtered !== undefined
              ? route && route?.params.filtered == true
                ? {
                    ...styles.headerBox,
                    marginTop:
                      Platform.OS === 'ios' ? scalePoint * 46 : scalePoint * 25,
                    marginLeft: scalePoint * 10,
                  }
                : styles.headerBox
              : styles.headerBox
          }
        >
          <Header />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollBox}
        >
          <View style={styles.mainContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View>
                <Text style={styles.mainText}>История</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('FilterBuyHistoryScreen')}
              >
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                  }}
                  source={filterIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          {openComments ? (
            <View style={{ flex: 1 }}>
              <CommentsToCashback
                close={closeComments}
                coment={cashBackGet[openCommentsForView]}
              />
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <SendedCashbacks
                open={openingComments}
                cashBackGet={cashBackGet}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBox: {
    width: '100%',
    height: scalePoint * 23,
  },
  mainBox: {
    width: '100%',
    alignSelf: 'center',
  },
  scrollBox: {
    width: '95%',
    alignSelf: 'center',
  },
  mainContent: {
    marginTop: '10%',
    marginBottom: '5%',
  },
  mainText: {
    fontSize: 24,
    lineHeight: 28,
  },
  btnContainer: {
    marginTop: '10%',
    flexDirection: 'row',
  },
  logInBtn: {
    width: '48%',
    height: 45,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#EBEBEB',
  },
  btnTxt: {
    color: '#000',
    marginTop: '9%',
    fontSize: 14,
    lineHeight: 17,
  },
  btnActive: {
    color: '#fff',
    marginTop: '9%',
    fontSize: 14,
    lineHeight: 17,
  },
  active: {
    backgroundColor: '#ff6b00',
    width: '48%',
    height: 45,
    alignItems: 'center',
    borderRadius: 4,
    color: '#fff',
  },
  CashbackSumsView: {
    marginTop: '15%',
  },
  inactiveBox: {
    display: 'none',
  },
});
