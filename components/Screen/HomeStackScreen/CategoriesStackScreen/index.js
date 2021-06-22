import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CategoriesScreen from './CategoriesScreen';
import FilterScreen from '../CategoriesStackScreen/CategoriesScreen/FilterScreen';
import SingleCategoryScreen from '../CategoriesStackScreen/CategoriesScreen/SingleCategoryScreen';

const Stack = createStackNavigator();

export default function CategoriesStakNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />

      <Stack.Screen
        name="SingleCategoryScreen"
        component={SingleCategoryScreen}
      />
    </Stack.Navigator>
  );
}
