import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';

import { ActionSheet, Root } from 'native-base';
import HeaderInStackScreens from '../../../Common/HeaderInStackScreens';
import SetProfileInfo from './SetProfileInfo';
import SetPass from './setPass';
import { useNavigation } from '@react-navigation/native';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function ProfileSettingScreen(props) {
  const navigation = useNavigation();
  return (
    <Root>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollBox}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        >
          <View style={styles.headerBox}>
            <HeaderInStackScreens nav={true} />
          </View>

          <View style={styles.profileInfoBox}>
            <SetProfileInfo />
          </View>
          <View
            style={{
              marginTop: '5%',
              marginBottom: '18%',
            }}
          >
            <SetPass />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Root>
  );
}
const styles = StyleSheet.create({
  scrollBox: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBox: {
    marginTop: Platform.OS === 'ios' ? '15%' : '10%',
    width: '95%',
    height: scalePoint * 17,
    alignSelf: 'center',
  },
  profileInfoBox: {
    marginTop: '5%',
  },
});
