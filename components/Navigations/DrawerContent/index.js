import React, { useState, useEffect } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import categoriesIcon from '../../Images/CategoriesIcon.png';
import GoBackIcon from '../../Images/GoBackIcon.png';
import notificationIcon from '../../Images/NotificationIcon.png';
import fireCashbacksIcon from '../../Images/FireCashbacksIcon.png';
import fireCashbacksIOSIcon from '../../Images/FireCashbacksIOSIcon.png';
import SettingIcon from '../../Images/profileMenuStoreSettingIcon.png';
import referalsIcon from '../../Images/ReferalsIcon.png';
import aboutIcon from '../../Images/AboutIcon.png';
import questionsIcon from '../../Images/QuestionsIcon.png';
import logoutIcon from '../../Images/LogoutIcon.png';
import loginIcon from '../../Images/LoginIcon.png';
import { Title } from 'react-native-paper';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import ProfileInfo from '../../Common/PropfileInfo';
import logo from '../../Images/logoMenu.png';

import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import ExitDialog from '../../Common/ExitDialog';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;
const width = window.width;
const holeHeight = window.height;

export function DrawerContent(props) {
  const [auth, setAuth] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    getInfo();
  }, [props]);
  const getInfo = async () => {
    const result = await AsyncStorage.getItem('token');
    if (result != null) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.menuContainer}>
        <DrawerItem
          pressColor={'#fff'}
          style={styles.goBack}
          onPress={() => props.navigation.closeDrawer()}
          label={() => <Title style={styles.linksText}></Title>}
          icon={() => (
            <View
              style={{
                width: scalePoint * 20,
                height: scalePoint * 19,
              }}
            >
              <Image
                style={{
                  width: scalePoint * 20,
                  height: scalePoint * 17.15,
                  resizeMode: 'contain',
                }}
                source={GoBackIcon}
              />
            </View>
          )}
        />
        {auth ? <ProfileInfo /> : null}
        <View style={auth ? styles.menuLinks : styles.notAuthMenuLink}>
          <DrawerItem
            pressColor={'#fff'}
            style={styles.linksBox}
            icon={() => (
              <Image
                style={{
                  width: scalePoint * 12,
                  height: scalePoint * 11.11,
                  resizeMode: 'cover',
                }}
                source={categoriesIcon}
              />
            )}
            label={() => <Title style={styles.linksText}>Категории</Title>}
            onPress={() => {
              props.navigation.navigate('CategoriesStackScreen', {
                screen: 'CategoriesScreen',
              });
            }}
          />
          {auth && (
            <DrawerItem
              pressColor={'#fff'}
              style={styles.linksBox}
              icon={() => (
                <Image
                  style={{
                    width: scalePoint * 12.16,
                    height: scalePoint * 14,
                    resizeMode: 'contain',
                  }}
                  source={notificationIcon}
                />
              )}
              label={() => <Title style={styles.linksText}>Уведомления</Title>}
              onPress={() => {
                props.navigation.navigate('NotificationsScreen');
              }}
            />
          )}

          {auth ? (
            <DrawerItem
              pressColor={'#fff'}
              style={styles.linksBox}
              icon={() => (
                <Image
                  style={{
                    width: scalePoint * 11.11,
                    height: scalePoint * 14.82,
                  }}
                  source={
                    Platform.OS === 'ios'
                      ? fireCashbacksIOSIcon
                      : fireCashbacksIcon
                  }
                />
              )}
              label={() => (
                <Title style={styles.linksText}>Горящий кэшбэк</Title>
              )}
              onPress={() => {
                props.navigation.navigate('CashbacksScreen');
              }}
            />
          ) : (
            <DrawerItem
              pressColor={'#fff'}
              style={styles.linksBox}
              icon={() => (
                <Image
                  style={{
                    width: scalePoint * 11.11,
                    height: scalePoint * 14.82,
                    resizeMode: 'contain',
                  }}
                  source={
                    Platform.OS === 'ios'
                      ? fireCashbacksIOSIcon
                      : fireCashbacksIcon
                  }
                />
              )}
              label={() => (
                <Title style={styles.linksText}>Горящий кэшбэк</Title>
              )}
              onPress={() => {
                props.navigation.navigate('CashbacksScreen');
              }}
            />
          )}
          <DrawerItem
            pressColor={'#fff'}
            style={styles.linksBox}
            icon={() => (
              <Image
                style={{
                  width: scalePoint * 14,
                  height: scalePoint * 10,
                  resizeMode: 'contain',
                }}
                source={referalsIcon}
              />
            )}
            label={() => (
              <Title style={styles.linksText}>Партнерская программа</Title>
            )}
            onPress={() => {
              props.navigation.navigate(
                auth ? 'ReferalsStackScreen' : 'ProfileStackScreen',
                { screen: 'LoginMainScreen' }
              );
            }}
          />

          <DrawerItem
            pressColor={'#fff'}
            style={styles.linksBox}
            icon={() => (
              <Image
                style={{
                  width: scalePoint * 15,
                  height: scalePoint * 14,
                  resizeMode: 'cover',
                }}
                source={aboutIcon}
              />
            )}
            label={() => <Title style={styles.linksText}>О программе</Title>}
            onPress={() => {
              props.navigation.navigate('AboutAppScreen');
            }}
          />
          <DrawerItem
            pressColor={'#fff'}
            style={styles.linksBox}
            icon={() => (
              <Image
                style={{
                  width: scalePoint * 18,
                  height: scalePoint * 18,
                  resizeMode: 'cover',
                }}
                source={questionsIcon}
              />
            )}
            label={() => <Title style={styles.linksText}>FAQ</Title>}
            onPress={() => {
              props.navigation.navigate('FaqScreen');
            }}
          />
          {auth && (
            <DrawerItem
              pressColor={'#fff'}
              style={styles.linksBox}
              icon={() => (
                <Image style={{ width: 12, height: 12 }} source={SettingIcon} />
              )}
              label={() => <Title style={styles.linksText}>Настройки</Title>}
              onPress={() =>
                props.navigation.navigate('ProfileStackScreen', {
                  screen: 'ProfileSettingScreen',
                })
              }
            />
          )}
          {auth ? (
            <DrawerItem
              pressColor={'#fff'}
              style={styles.lastLinkBox}
              icon={() => (
                <Image
                  style={{
                    width: scalePoint * 13,
                    height: scalePoint * 13,
                    resizeMode: 'cover',
                  }}
                  source={logoutIcon}
                />
              )}
              onPress={() => setIsVisible(true)}
              label={() => <Title style={styles.linksText}>Выйти</Title>}
            />
          ) : (
            <DrawerItem
              pressColor={'#fff'}
              style={styles.lastLinkBox}
              icon={() => (
                <Image
                  style={{
                    width: scalePoint * 13,
                    height: scalePoint * 13,
                    resizeMode: 'cover',
                  }}
                  source={loginIcon}
                />
              )}
              onPress={() => {
                props.navigation.navigate('ProfileStackScreen', {
                  screen: 'LoginMainScreen',
                });
              }}
              label={() => <Title style={styles.linksText}>Войти</Title>}
            />
          )}
        </View>
        <ExitDialog
          answerModal={isVisible}
          funcOk={() => {
            AsyncStorage.removeItem('token');
            setIsVisible(false);
            props.navigation.navigate('LoginMainScreen');
          }}
          setAnswerModal={setIsVisible}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'ios' ? '10%' : '5%',
  },
  menuContainer: {
    flex: 1,
    width: '100%',
    height: holeHeight,
    marginTop: '0.5%',
    backgroundColor: '#fff',
  },
  notAuthMenuLink: {
    marginTop: '5%',
    width: '100%',
    height: '100%',
    marginLeft: '2%',
  },
  goBack: {},
  menuLinks: {
    width: '100%',
    height: '100%',
    marginTop: '5%',
  },
  linksBox: {
    width: '90%',
    height: scalePoint * 47,
    paddingLeft: '10%',
    borderBottomWidth: 1,
    borderColor: '#ebebeb',
    borderRadius: 0,
    justifyContent: 'center',
  },
  lastLinkBox: {
    paddingLeft: '10%',
    width: '100%',
    borderRadius: 0,
    paddingBottom: '5%',
  },
  linksText: {
    width: '100%',
    fontSize: 16,
    lineHeight: 17,
    fontFamily: 'Roboto',
  },
});
