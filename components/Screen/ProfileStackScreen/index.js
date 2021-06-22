import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import ProflieScreen from './ProfileScreen';
import LoginMainScreen from './LoginMainScreen';
import ProflieSettingScreen from './ProfileSettingScreen';
import PrivacyPolicyScreen from './LoginMainScreen/PrivacyPolicyScreen';
import ReferalsScreen from '../HomeStackScreen/ReferalsStackScreen/ReferalsScreen/index';
import SingleReferalScreen from '../HomeStackScreen/ReferalsStackScreen/ReferalsScreen/SingleReferalScreen';
import MyReferalsScreen from '../HomeStackScreen/ReferalsStackScreen/MyReferalsScreen';
import FilterReferalsScreen from '../HomeStackScreen/ReferalsStackScreen/MyReferalsScreen/FilterReferalsScreen';
import AboutReferalScreen from '../HomeStackScreen/ReferalsStackScreen/ReferalsScreen/AboutReferalScreen';
import WalletSettingsScreen from './WalletSettingsScreen';
import GetMoneyScreen from './GetMoneyScreen';
import BusinessProfileScreen from './BusinessProfileScreen';
import FaqScreen from './FaqScreen';
import CompanySettingsScreen from './ProfileScreen/CompanySettingsScreen';
import CashbackSettingScreen from '../ProfileStackScreen/ProfileScreen/CompanySettingsScreen/CashbackSettings';
const Stack = createStackNavigator();

import AsyncStorage from '@react-native-community/async-storage';
import ProfileScreen from './ProfileScreen';
import { Platform } from 'react-native';
import QrStackScreen from '../QrStackScreen';
import CompanyScreen from '../HomeStackScreen/CompaniesScreen/CompanyScreen';

import AboutAppScreen from '../HomeStackScreen/AboutAppScreen';
import ReplanishAccount from './ProfileScreen/ReplenishScreen/ReplenishThroughOptima';

import AnimatedLoader from 'react-native-animated-loader';
import { useNavigation } from '@react-navigation/native';
import AboutBussines from './BusinessProfileScreen/AboutBussines';

export default function ProfileStackScreen() {
  const [viewLoader, setViewLoader] = React.useState(true);
  const [auth, setAuth] = React.useState(false);
  const navigation = useNavigation();
  React.useEffect(() => {
    getInfo();
  });
  React.useEffect(() => {
    getInfo;
    const unsubscribe = navigation.addListener('focus', () => {
      setViewLoader(true);
      getInfo();
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const getInfo = async () => {
    const result = await AsyncStorage.getItem('token');
    if (result != null) {
      setAuth(true);
      setViewLoader(false);
    } else {
      setAuth(false);
      setViewLoader(false);
    }
  };
  return (
    <>
      <AnimatedLoader
        visible={viewLoader}
        overlayColor="rgba(255,255,255,1)"
        source={require('../../Common/loader.json')}
        animationStyle={{ width: 100, height: 100, resizeMode: 'cover' }}
        speed={1}
      ></AnimatedLoader>

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator:
            Platform.OS === 'ios'
              ? CardStyleInterpolators.forHorizontalIOS
              : CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="ProfileScreen" component={ProflieScreen} />
        <Stack.Screen name="LoginMainScreen" component={LoginMainScreen} />

        <Stack.Screen name="AboutBussines" component={AboutBussines} />

        <Stack.Screen name="ReferalsScreen" component={ReferalsScreen} />
        <Stack.Screen name="MyReferalsScreen" component={MyReferalsScreen} />
        <Stack.Screen
          name="SingleReferalScreen"
          component={SingleReferalScreen}
        />
        <Stack.Screen
          name="ProfileSettingScreen"
          component={ProflieSettingScreen}
        />
        <Stack.Screen
          name="FilterReferalsScreen"
          component={FilterReferalsScreen}
        />
        <Stack.Screen
          name="AboutReferalScreen"
          component={AboutReferalScreen}
        />
        <Stack.Screen
          name="WalletSettingsScreen"
          component={WalletSettingsScreen}
        />
        <Stack.Screen name="GetMoneyScreen" component={GetMoneyScreen} />
        <Stack.Screen
          name="BusinessProfileScreen"
          component={BusinessProfileScreen}
        />
        <Stack.Screen name="QrCodeScreen" component={QrStackScreen} />
        <Stack.Screen name="FaqScreen" component={FaqScreen} />
        <Stack.Screen
          name="CompanySettingsScreen"
          component={CompanySettingsScreen}
        />
        <Stack.Screen
          name="CashbackSettingScreen"
          component={CashbackSettingScreen}
        />
        <Stack.Screen
          name="PrivacyPolicyScreen"
          component={PrivacyPolicyScreen}
        />
        <Stack.Screen name="CompanyScreen" component={CompanyScreen} />
        <Stack.Screen name="AboutAppScreen" component={AboutAppScreen} />
        <Stack.Screen
          name="ReplanishAccountScreen"
          component={ReplanishAccount}
        />
      </Stack.Navigator>
    </>
  );
}
