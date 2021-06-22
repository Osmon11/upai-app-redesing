import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import GoBackIcon from '../../Images/GoBackIcon.png';

import { CommonActions, useNavigation } from '@react-navigation/native';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function HeaderInStackScreens({ nav }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBackBox}
        onPress={() =>
          nav == true
            ? navigation.dispatch(
                CommonActions.reset({ routes: [{ name: 'ProfileScreen' }] })
              )
            : navigation.goBack()
        }
      >
        <Image style={styles.imgStyle} source={GoBackIcon} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: scalePoint * 21,
  },
  goBackBox: {
    width: scalePoint * 20,
    height: scalePoint * 21,
  },
  imgStyle: {
    width: scalePoint * 20,
    height: scalePoint * 17.15,
    resizeMode: 'contain',
  },
});
