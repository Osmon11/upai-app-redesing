import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-shadow-cards';

import RatingComponent from '../../CategoriesStackScreen/RatingComponent';
import fireIcon from '../../../../Images/fireIcon.png';
import { API } from '../../../../config';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function FireCashbacksSlider() {
  const [hotCash, setHotCash] = useState([]);

  useEffect(() => {
    getAllHotCashBack();
  }, []);

  const getAllHotCashBack = async () => {
    const resp = await fetch(API + 'hot-cashback/?limit=5');
    const data = await resp.json();
    setHotCash(data.results);
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.nameOfCategoryGroupBox}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.nameOfCategoryGroup}>Горящий кэшбэк</Text>
            <Image style={styles.fireIcon} source={fireIcon} />
          </View>
          <TouchableOpacity
            style={styles.allPageBtn}
            onPress={() => {
              navigation.navigate('CashbacksScreen', { data: hotCash });
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
          {hotCash &&
            hotCash.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                style={
                  index === 0 ? styles.firstSliderImgBox : styles.sliderImgBox
                }
                key={item.id}
                onPress={() => {
                  navigation.navigate('HotCashbackInfoScreen', {
                    itemId: item.id,
                  });
                }}
              >
                <Card
                  corner={scalePoint * 10}
                  opacity={0.2}
                  style={styles.imageShadow}
                >
                  <Image style={styles.image} source={{ uri: item.img }} />
                </Card>
                <View
                  style={{
                    marginLeft: '6%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{ marginTop: '1%', width: '80%', marginRight: '3%' }}
                  >
                    <View>
                      <RatingComponent
                        reviewStatus={true}
                        rate={item.rate}
                        review={item.total_review}
                      />
                    </View>
                    <View>
                      <Text style={styles.nameOfItem}>{item.name}</Text>
                      <Text style={styles.categoryOfItem}>
                        {item.categories && item.categories[0]}
                      </Text>
                    </View>
                  </View>
                  <View style={{ paddingTop: scalePoint * 3 }}>
                    <Text style={styles.percentOfChashback}>
                      до{'\n'}
                      <Text style={styles.percentNum}>{item.cashback}%</Text>
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
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
  },
  nameOfCategoryGroupBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
  },
  nameOfCategoryGroup: {
    fontSize: 16,
    lineHeight: 18,
  },
  fireIcon: {
    height: scalePoint * 19,
    width: scalePoint * 20,
    marginLeft: '1%',
    resizeMode: 'contain',
  },
  allPageBtnTxt: {
    fontSize: 12,
    color: '#8d8d8d',
    marginTop: '8%',
    fontFamily: 'RobotoLight',
  },
  firstSliderImgBox: {
    width: scalePoint * 200,
    marginRight: scalePoint * 10,
    marginLeft: scalePoint * 8,
  },
  sliderImgBox: {
    width: scalePoint * 200,
    marginRight: scalePoint * 10,
  },
  imageShadow: {
    borderRadius: scalePoint * 10,
    width: scalePoint * 200,
    height: scalePoint * 85,
    elevation: 4,
    marginLeft: scalePoint * 3,
  },
  image: {
    borderWidth: 0.5,
    borderColor: 'rgba(146, 146, 146, 0.37)',
    borderRadius: 10,
    width: scalePoint * 200,
    height: scalePoint * 85,
    resizeMode: 'cover',
  },
  nameOfItem: {
    paddingTop: '2%',
    fontSize: 12,
    lineHeight: 14,
  },
  categoryOfItem: {
    fontSize: 10,
    lineHeight: 12,
    color: '#8d8d8d',
    paddingTop: '2%',
    fontFamily: 'RobotoLight',
  },
  percentOfChashback: {
    fontSize: 11,
    lineHeight: 12,
    color: '#27ea60',
    textAlign: 'center',
  },
  percentNum: {
    fontSize: 12,
    lineHeight: 15,
  },
});
