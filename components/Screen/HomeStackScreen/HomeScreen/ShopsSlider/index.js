import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-shadow-cards';

import RatingComponent from '../../CategoriesStackScreen/RatingComponent';
import { API } from '../../../../config';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function ShopsSlider() {
  const [hotCash, setHotCash] = useState([]);

  useEffect(() => {
    getAllHotCashBack();
  }, []);

  const getAllHotCashBack = async () => {
    const resp = await fetch(API + 'shop/?ordering=rating&limit=10&category=3');
    const data = await resp.json();
    setHotCash(data.results);
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.nameOfCategoryGroupBox}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.nameOfCategoryGroup}>Магазины</Text>
          </View>
          <TouchableOpacity
            style={styles.allPageBtn}
            onPress={() => {
              navigation.navigate('MarketScreen', { data: hotCash });
            }}
          >
            <Text style={styles.allPageBtnTxt}>Все</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: '2%' }}
        >
          {hotCash.map((item, index) => (
            <Card
              key={item.id}
              corner={scalePoint * 10}
              opacity={0.2}
              style={index == 0 ? styles.firstImageShadow : styles.imageShadow}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.sliderImgBox}
                key={item.id}
                onPress={() => {
                  navigation.navigate('CompanyScreen', { itemId: item.id });
                }}
              >
                <Image style={styles.image} source={{ uri: item.main_image }} />

                <View style={styles.shopInfoBox}>
                  <View style={styles.ratingCompBox}>
                    <RatingComponent
                      reviewStatus={false}
                      rate={item.rate}
                      review={item.total_review}
                    />
                  </View>
                  <View style={styles.textBox}>
                    <Text style={styles.nameOfItem}>
                      {item.name.length > 10
                        ? item.name.substring(0, 10) + '...'
                        : item.name}
                    </Text>
                    <Text style={styles.categoryOfItem}>
                      {item.categories[0]}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Card>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: '5%',
  },
  nameOfCategoryGroupBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
    marginLeft: 5,
  },
  nameOfCategoryGroup: {
    fontSize: 16,
    lineHeight: 18,
  },
  allPageBtnTxt: {
    fontSize: 12,
    color: '#8d8d8d',
    marginTop: '8%',
    fontFamily: 'RobotoLight',
  },
  firstSliderImgBox: {
    width: scalePoint * 100,
    height: scalePoint * 111,
    alignItems: 'center',
  },
  sliderImgBox: {
    width: scalePoint * 100,
    height: scalePoint * 111,
    alignItems: 'center',
  },
  firstImageShadow: {
    marginTop: scalePoint * 10,
    marginBottom: scalePoint * 10,
    borderRadius: scalePoint * 10,
    width: scalePoint * 100,
    height: scalePoint * 111,
    elevation: 4,
    marginLeft: scalePoint * 15,
    marginRight: scalePoint * 15,
  },
  imageShadow: {
    marginTop: scalePoint * 10,
    marginBottom: scalePoint * 10,
    borderRadius: scalePoint * 10,
    width: scalePoint * 100,
    height: scalePoint * 111,
    elevation: 4,
    marginLeft: scalePoint * 15,
  },
  image: {
    marginTop: scalePoint * 10,
    width: scalePoint * 90,
    height: scalePoint * 30,
    resizeMode: 'cover',
  },
  shopInfoBox: {
    width: '100%',
  },
  ratingCompBox: {
    marginTop: '5%',
    alignSelf: 'center',
    width: '80%',
  },
  textBox: {
    width: '100%',
    marginTop: '5%',
  },
  nameOfItem: {
    width: '80%',

    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
    alignSelf: 'center',
  },
  categoryOfItem: {
    fontSize: 10,
    lineHeight: 12,
    color: '#8d8d8d',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: '5%',
  },
  percentOfChashback: {
    fontSize: 11,
    lineHeight: 12,
    color: '#27ea60',
    textAlign: 'center',
  },
});
