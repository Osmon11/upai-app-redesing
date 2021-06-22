import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

import emptyImg from '../../Images/EmptyComponentImg.png';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function EmptyComponent() {
  return (
    <View style={styles.container}>
      <View style={styles.mainContentBox}>
        <Text style={styles.mainTxt}>Здесь пока что пусто</Text>
        <View style={styles.mainImgBox}>
          <Image style={styles.emptyImg} source={emptyImg} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContentBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTxt: {
    fontSize: 16,
    color: '#6b6b6b',
  },
  mainImgBox: {
    marginTop: '3%',
  },
  emptyImg: {
    width: scalePoint * 172,
    height: scalePoint * 109,
  },
});
