import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import referalsImg from '../../../../Images/reviewsAccountImg.png';
import EmptyComponent from '../../../../Common/EmptyComponent';
import EmptyAvatar from '../../../../Images/emptyProfileAccountImg.png';

const myReferalsList = [
  {
    image: referalsImg,
    name: 'Азим Дженалиев',
    referalID: 'ID123456789',
    date: '27.10.2020',
    sum: '1500',
  },
  {
    image: referalsImg,
    name: 'Азим Дженалиев',
    referalID: 'ID123456789',
    date: '27.10.2020',
    sum: '1500',
  },
  {
    image: referalsImg,
    name: 'Азим Дженалиев',
    referalID: 'ID123456789',
    date: '27.10.2020',
    sum: '1500',
  },
  {
    image: referalsImg,
    name: 'Азим Дженалиев',
    referalID: 'ID123456789',
    date: '27.10.2020',
    sum: '1500',
  },
  {
    image: referalsImg,
    name: 'Азим Дженалиев',
    referalID: 'ID123456789',
    date: '27.10.2020',
    sum: '1500',
  },
];

const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function MyReferals({ all }) {
  const navigation = useNavigation();

  console.log('ref', all);

  return (
    <View>
      <View style={styles.showbleView}>
        <View style={styles.namePageView}>
          <Text style={styles.namePage}>Мои рефералы</Text>
        </View>
        <TouchableOpacity
          style={styles.allPageBtn}
          onPress={() => {
            navigation.navigate('MyReferalsScreen', { all: all });
          }}
        >
          <Text style={styles.allPageBtnTxt}>Все</Text>
        </TouchableOpacity>
      </View>
      <View>
        {all && all.length > 0 ? (
          all.map((item, index) => {
            if (index <= 6) {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.referalsListItem}
                  onPress={() =>
                    navigation.navigate('SingleReferalScreen', { data: item })
                  }
                >
                  <View style={styles.imgBox}>
                    <Image
                      style={styles.imgStyle}
                      source={
                        item.avatar !== null
                          ? { uri: item.avatar }
                          : EmptyAvatar
                      }
                    />
                  </View>
                  <View style={styles.nameTxtBox}>
                    <Text style={styles.nameTxt}>{item.fullname}</Text>
                    <View style={styles.smallTxtBox}>
                      <Text style={styles.smallTxt}>{item.phone}</Text>
                      <Text style={styles.smallTxt}>{item.date}</Text>
                    </View>
                  </View>
                  <View style={styles.sumsTxtBox}>
                    <Text style={styles.sumNumber}>{item.total_revenue}</Text>
                    <Text style={styles.sumTxt}>сом</Text>
                  </View>
                </TouchableOpacity>
              );
            }
          })
        ) : (
          <View style={{ marginTop: '5%' }}>
            <EmptyComponent />
          </View>
        )}
        {/* 
        if the list is empty use 
         
        */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  showbleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  namePage: {
    color: '#313131',
    fontSize: 20,
    lineHeight: 24,
    marginLeft: '8%',
  },
  allPageBtnTxt: {
    fontSize: 12,
    color: '#8d8d8d',
    marginRight: '5%',
    marginTop: '10%',
  },
  referalsListItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    borderBottomWidth: 1,
    borderColor: '#ebebeb',
    paddingBottom: '5%',
    marginLeft: '2%',
  },
  imgBox: {
    width: scalePoint * 50,
    height: scalePoint * 50,
    borderRadius: scalePoint * 50 * 0.5,
    marginRight: '5%',
  },
  imgStyle: {
    width: scalePoint * 50,
    height: scalePoint * 50,
    resizeMode: 'contain',
    borderRadius: scalePoint * 50 * 0.5,
  },
  nameTxtBox: {
    width: '60%',
  },
  nameTxt: {
    fontSize: 16,
    lineHeight: 18,
    color: '#515151',
  },
  smallTxtBox: {
    marginTop: '3%',
    flexDirection: 'row',
  },
  smallTxt: {
    fontSize: 12,
    lineHeight: 13,
    color: '#8e8e8e',
    marginRight: '5%',
  },
  sumsTxtBox: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sumNumber: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: 'bold',
  },
  sumTxt: {
    fontSize: 10,
    lineHeight: 12,
    color: '#515151',
  },
});
