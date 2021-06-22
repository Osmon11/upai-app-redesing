import React, { useState, useEffect } from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import NotificationsScreen from './NotificationsScreen';
import FilterNotificationsScreen from './FilterNotifications';
import LoginMainScreen from '../ProfileStackScreen/LoginMainScreen';
import { Platform } from 'react-native';
const Stack = createStackNavigator();

export default function NotificationsStackNavigator() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {}, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator:
          Platform.OS === 'ios'
            ? CardStyleInterpolators.forHorizontalIOS
            : CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="NotificationMainScreen"
        component={NotificationsScreen}
        initialParams={{ from: undefined }, {to: undefined},{status:undefined}}
      />

      <Stack.Screen
        name="FilterNotificationsScreen"
        component={FilterNotificationsScreen}
      />
    </Stack.Navigator>
  );
}
