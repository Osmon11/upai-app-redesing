import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import BuyHistoryScreen from './BuyHistoryScreen';
import FilterBuyHistoryScreen from './FilterBuyHistoryScreen';
import HistoryOfBuys from './BuyHistoryScreen/BusinessBuyHistory/HistoryOfBuys';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

export default function BuyHistoryStackNavigator() {
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
      <Stack.Screen name="BuyHistoryMainScreen" component={BuyHistoryScreen} />
      <Stack.Screen
        name="FilterBuyHistoryScreen"
        component={FilterBuyHistoryScreen}
      />
      <Stack.Screen name="HistoryOfBuys" component={HistoryOfBuys} />
    </Stack.Navigator>
  );
}
