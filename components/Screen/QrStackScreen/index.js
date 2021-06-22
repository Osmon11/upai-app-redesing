import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { Platform } from 'react-native';
import QrCodeScreen from './QRcodeScreen';
import QrSendMoneyScreen from './QrSuccessScreens';
import LastSuccessScreen from './QrSuccessScreens/LastSuccessScreen';

const Stack = createStackNavigator();

export default function QrStackScreen() {
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
      <Stack.Screen name="QrMainScreen" component={QrCodeScreen} />
      <Stack.Screen name="QrSuccessScreen" component={QrSendMoneyScreen} />
      <Stack.Screen name="LastSuccessScreen" component={LastSuccessScreen} />
    </Stack.Navigator>
  );
}
