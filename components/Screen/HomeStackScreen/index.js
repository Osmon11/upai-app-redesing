import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import HomeScreen from '../HomeStackScreen/HomeScreen';
import CategoriesStackScreen from '../HomeStackScreen/CategoriesStackScreen';
import CashbacksScreen from '../HomeStackScreen/FireCashbacksScreen';
import CompanyScreen from './CompaniesScreen/CompanyScreen/index';
import NewCompaniesScreen from './CompaniesScreen/NewCompaniesScreen';
import ReferalsStackScreen from './ReferalsStackScreen';
import SingleCategoryScreen from '../HomeStackScreen/CategoriesStackScreen/CategoriesScreen/SingleCategoryScreen';
import FaqScreen from '../ProfileStackScreen/FaqScreen';
import CategoriesListScreen from './CategoriesStackScreen/CategoriesScreen/FilterScreen/CategoriesList';
import { Platform } from 'react-native';
import HotCashbacksInfoScreen from './CompaniesScreen/CompanyScreen/HotCashbackScreen';
import AboutAppScreen from './AboutAppScreen';
import AnimatedLoader from 'react-native-animated-loader';
import CashbackSettings from '../ProfileStackScreen/ProfileScreen/CompanySettingsScreen/CashbackSettings';
import QrCodeScreen from '../QrStackScreen/QRcodeScreen';
import QrSendMoneyScreen from '../QrStackScreen/QrSuccessScreens';
import LastSuccessScreen from '../QrStackScreen/QrSuccessScreens/LastSuccessScreen';
import MarketScreen from './MarketsScreen';
import FilterScreen from './CategoriesStackScreen/CategoriesScreen/FilterScreen';
import FireCashbacksFilterScreen from './FireCashbacksScreen/FireCashbacksFilterScreen';
const Stack = createStackNavigator();

export default function HomeStakNavigator(route) {
  const [viewLoader, setViewLoader] = React.useState(true);

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator:
            Platform.OS === 'ios'
              ? CardStyleInterpolators.forHorizontalIOS
              : CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="HomeMainScreen" component={HomeScreen} />
        <Stack.Screen name="MarketScreen" component={MarketScreen} />
        <Stack.Screen
          name="CashbackSettingScreen"
          component={CashbackSettings}
        />
        <Stack.Screen
          name="CategoriesStackScreen"
          component={CategoriesStackScreen}
        />
        <Stack.Screen name="FilterScreen" component={FilterScreen} />
        <Stack.Screen name="QrMainScreen" component={QrCodeScreen} />
        <Stack.Screen name="LastSuccessScreen" component={LastSuccessScreen} />
        <Stack.Screen name="QrSuccessScreen" component={QrSendMoneyScreen} />
        <Stack.Screen name="CashbacksScreen" component={CashbacksScreen} />
        <Stack.Screen name="CompanyScreen" component={CompanyScreen} />
        <Stack.Screen
          name="NewCompaniesScreen"
          component={NewCompaniesScreen}
        />
        <Stack.Screen
          name="SingleCategoryScreen"
          component={SingleCategoryScreen}
        />
        <Stack.Screen name="CategoriesList" component={CategoriesListScreen} />
        <Stack.Screen
          name="ReferalsStackScreen"
          component={ReferalsStackScreen}
        />
        <Stack.Screen name="FaqScreen" component={FaqScreen} />
        <Stack.Screen
          name="HotCashbackInfoScreen"
          component={HotCashbacksInfoScreen}
        />
        <Stack.Screen name="AboutAppScreen" component={AboutAppScreen} />
        <Stack.Screen
          name="FireCashbacksFilterScreen"
          component={FireCashbacksFilterScreen}
        />
      </Stack.Navigator>
    </>
  );
}
