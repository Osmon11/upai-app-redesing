import React, { useEffect, useState } from 'react';
import {
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Text, View } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
const finderWidth = 100;
const finderHeight = 100;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

export default function QRreader({cash}) {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState();
  useEffect(()=>{
    if(hasPermission != 'granted'){
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status == 'granted');
      })();
    }else{
      setHasPermission(null)
    }
  },[hasPermission])
  const [type, setType] = useState(BarCodeScanner.Constants.Type.back);
  const [scanned, setScanned] = useState(false);

  const req = async ()=>{
    
  }
  const handleBarCodeScanned = (scanningResult) => {
    if (!scanned) {
      setScanned(true);
      let num = scanningResult.data;
      if (num[0] + num[1] + num[2] == '996') {
     
        if(cash !==undefined || cash !== null){
          navigation.navigate('QrSuccessScreen', { num: num, cash:cash });
        }else{
          navigation.navigate('QrSuccessScreen', { num: num });
        } 
      }
    }
  };
  

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        type={type}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        style={[StyleSheet.absoluteFillObject, styles.container]}
      >
        <View
          style={{
            flex: 1,

            backgroundColor: 'transparent',
            margin: 15,
            flexDirection: 'row',
          }}
        ></View>

        <BarcodeMask edgeColor="orange" showAnimatedLine={false} />
        <Button title="Повторить" onPress={() => setScanned(false)} />
      </BarCodeScanner>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: Platform.OS == 'ios' ? 0 : '5%',
    height: Platform.OS == 'ios' ? '92%' : '90%',
  },

  title: {
    fontSize: 20,

    fontWeight: 'bold',
  },

  separator: {
    marginVertical: 30,

    height: 2,

    width: '80%',
  },
});
