import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '../DrawerContent';

import MainTabNavigator from '../MainTabNavigator';
import { StatusBar } from 'react-native';
import { View } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export default function DrawerNavigator(l) {
  const Drawer = createDrawerNavigator();
  

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Drawer.Navigator
        
        style={{ flex: 1 }}
        drawerStyle={{
          width: '100%',
          border: 0,
          backgroundColor: '#fff',
        }}
        drawerContent={(props) => <DrawerContent {...props} />
        }
      >
        <Drawer.Screen name="Home" component={MainTabNavigator}  />
      </Drawer.Navigator>
    </View>
  );
}
