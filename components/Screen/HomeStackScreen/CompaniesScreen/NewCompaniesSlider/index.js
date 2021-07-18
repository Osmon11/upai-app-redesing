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

import RatingComponent from '../../CategoriesStackScreen/RatingComponent';
import newCompaniesSliderImg from '../../../../Images/newCompaniesSliderImg.png';
import newCompaniesIcon from '../../../../Images/newCompaniesIcon.png';
import { Card } from 'react-native-shadow-cards';
import { API } from '../../../../config';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function NewCompaniesSlider() {
  const [newCash, setNewCash] = useState([]);
  const [itemName, setItemName] = useState();
  const [namesList, setNamesList] = useState([]);

  useEffect(() => {
    getAllNewCashBack();
  }, []);

  const getAllNewCashBack = async () => {
    const resp = await fetch(API + 'shop/?offset=0&ordering=newest&limit=5');
    const data = await resp.json();
    setNewCash(data.results);
  };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.nameOfCategoryGroupBox}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.nameOfCategoryGroup}>Новинки</Text>
            <Image style={styles.newCompaniesIcon} source={newCompaniesIcon} />
          </View>
          <TouchableOpacity
            style={styles.allPageBtn}
            onPress={() => {
              navigation.navigate('NewCompaniesScreen', { data: newCash });
            }}
          >
            <Text style={styles.allPageBtnTxt}>Все</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '100%' }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              alignSelf: 'center',
              marginTop: '2%',
            }}
          >
            {newCash.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={index}
                  style={index === 0 ? styles.firstImageBox : styles.imageBox}
                  key={item.id}
                  onPress={() => {
                    navigation.navigate('CompanyScreen', { itemId: item.id });
                  }}
                >
                  <Card opacity={0.2} style={styles.imageShadow}>
                    <Image
                      style={styles.image}
                      source={{ uri: item.main_image }}
                    />
                  </Card>

                  <View
                    style={{
                      marginLeft: '6%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: scalePoint * 10,
                    }}
                  >
                    <View style={{ marginTop: '1%', width: '75%' }}>
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
                          {item.categories[0]}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        paddingTop: scalePoint * 6,
                      }}
                    >
                      <Text style={styles.percentOfChashback}>
                        <Text>{item.cashback}%</Text>
                        {'\n'}на все
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
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
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameOfCategoryGroup: {
    fontSize: 16,
    lineHeight: 18,
  },
  newCompaniesIcon: {
    height: scalePoint * 19,
    width: scalePoint * 20,
    marginLeft: '1%',
  },
  allPageBtnTxt: {
    fontSize: 12,
    color: '#8d8d8d',
    marginTop: '8%',
    fontFamily: 'RobotoLight',
  },
  firstImageBox: {
    width: scalePoint * 200,
    marginRight: scalePoint * 10,
    marginLeft: scalePoint * 8,
  },
  imageBox: {
    width: scalePoint * 200,
    marginRight: scalePoint * 10,
  },
  imageShadow: {
    borderRadius: 10,
    width: scalePoint * 200,
    height: scalePoint * 85,
    elevation: 5,
    marginLeft: scalePoint * 3,
  },
  image: {
    borderWidth: 0.5,
    borderColor: 'rgba(146, 146, 146, 0.37)',
    borderRadius: 10,
    width: scalePoint * 200,
    height: scalePoint * 85,
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
    paddingLeft: scalePoint * 15,
  },
  percentNum: {
    fontSize: 12,
    lineHeight: 15,
    fontFamily: 'RobotoMedium',
  },
});
