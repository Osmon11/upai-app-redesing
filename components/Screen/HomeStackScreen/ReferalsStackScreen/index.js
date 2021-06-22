import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ReferalsScreen from './ReferalsScreen';
import MyReferalsScreen from './MyReferalsScreen';
import SingleReferalScreen from './ReferalsScreen/SingleReferalScreen';
import FilterReferalsScreen from './MyReferalsScreen/FilterReferalsScreen';
import AboutReferalScreen from './ReferalsScreen/AboutReferalScreen';

const Stack = createStackNavigator();

export default function ReferalsStakNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ReferalsMainScreen" component={ReferalsScreen} />
      <Stack.Screen name="MyReferalsScreen" component={MyReferalsScreen} />
      <Stack.Screen
        name="SingleReferalScreen"
        component={SingleReferalScreen}
      />
      <Stack.Screen
        name="FilterReferalsScreen"
        component={FilterReferalsScreen}
      />
      <Stack.Screen name="AboutReferalScreen" component={AboutReferalScreen} />
    </Stack.Navigator>
  );
}
