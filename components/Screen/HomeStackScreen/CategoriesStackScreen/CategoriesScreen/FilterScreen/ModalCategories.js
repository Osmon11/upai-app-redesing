import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
const window = Dimensions.get('window');
const scalePoint = window.width / 380;
import GoBackIcon from '../../../../../Images/GoBackIcon.png';
import { useNavigation } from '@react-navigation/native';

export default function ModalCategories({ cat, setCat, funcOk, category }) {
  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCat(false);
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);
  const shadowOpt = {
    width: 65,
    height: 67,
    color: '#000',
    border: 2,
    radius: 10,
    opacity: 0.03,
    x: 0,
    y: 1,
  };
  return (
    <Dialog
      visible={cat}
      onTouchOutside={() => setCat(false)}
      onHardwareBackPress={() => setCat(false)}
    >
      <DialogContent style={styles.answerModalBox}>
        <ScrollView style={styles.container}>
          <TouchableOpacity
            style={styles.goBackBox}
            onPress={() => {
              setCat(false);
              funcOk(null);
            }}
          >
            <Image style={styles.imgStyle} source={GoBackIcon} />
          </TouchableOpacity>

          {category &&
            category.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.filtersBox}
                key={index}
                onPress={() => {
                  funcOk(item);
                  setCat(false);
                }}
              >
                <BoxShadow setting={shadowOpt}>
                  <View style={styles.filterItemIconBox}>
                    <Image
                      style={styles.filterItemIcon}
                      key={index}
                      source={{ uri: item.icon }}
                    />
                  </View>
                </BoxShadow>
                <Text style={styles.filterItemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </DialogContent>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: scalePoint * 370,
    height: scalePoint * 900,
    paddingBottom: '15%',
  },
  answerModalBox: {
    backgroundColor: '#fff',
    width: scalePoint * 370,
    height: scalePoint * 750,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    width: '80%',
    fontSize: 18,
    fontFamily: 'RobotoLight',
    color: '#000',
    height: scalePoint * 70,
  },
  btnTxt: {
    fontSize: 14,
    color: '#ff6b00',
    alignSelf: 'center',
  },
  accessBox: {
    marginBottom: scalePoint * 5,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  goBackBox: {
    width: scalePoint * 20,
    height: scalePoint * 21,
    marginLeft: '4%',
    marginTop: Platform.OS === 'ios' ? '20%' : '5%',
  },
  imgStyle: {
    width: scalePoint * 20,
    height: scalePoint * 17.15,
    resizeMode: 'contain',
  },
  filtersBox: {
    flexDirection: 'row',
    marginTop: '2%',
    alignItems: 'center',
    marginLeft: '5%',
  },
  filterItemIconBox: {
    width: 65,
    height: 65,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(146, 146, 146, 0.37)',
    justifyContent: 'center',
    paddingBottom: '1%',
  },
  filterItemIcon: {
    width: 29,
    height: 29,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  filterItemText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 19,
    alignSelf: 'center',
    marginLeft: '10%',
  },
});
