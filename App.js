import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import DrawerNavigator from './components/Navigations/DrawerNavigator';

export default function App() {
  const [loaded] = useFonts({
    Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
    RobotoLight: require('./assets/fonts/Roboto-Light.ttf'),
    SfPro: require('./assets/fonts/FontsFree-Net-SFProDisplay-Regular.ttf'),
    SfProLight: require('./assets/fonts/FontsFree-Net-SFProDisplay-Light.ttf'),
  });
  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer style={{ flex: 1 }}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
