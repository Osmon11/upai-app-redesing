import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { API } from '../../../../../config';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;
export default function FilterCategories() {
  const [categories, setCategories] = useState([]);
  const [isPress, setIsPress] = useState(false);
  useEffect(() => {
    getAllCategories();
    
  }, []);

  const getAllCategories = async () => {
    const resp = await fetch(API + 'category/');
    const data = await resp.json();
    setCategories(data);
  };

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <SafeAreaView>
        <View style={styles.showbleView}>
          <View style={styles.namePageView}>
            <Text style={styles.namePage}>Категории</Text>
          </View>
          <TouchableOpacity
            style={styles.allPageBtn}
            onPress={() => {
              navigation.navigate('CategoriesList', { data: categories });
            }}
          >
            <Text style={styles.allPageBtnTxt}>Все</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            paddingTop: '2%',
            width: '100%',
            alignSelf: 'center',
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((item, index) => (
            <View
              style={index === 0 ? styles.firstFiltersBox : styles.filtersBox}
              key={index}
            >
              <View style={styles.filterItem}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('SingleCategoryScreen', {
                      category: item.id,
                      name: item.name,
                    })
                  }
                  underlayColor={'transparent'}
                  style={
                    index === 0
                      ? styles.firstFilterItemIconBox
                      : styles.filterItemIconBox
                  }
                >
                  <Image
                    style={styles.filterItemIcon}
                    key={index}
                    source={{ uri: item.icon }}
                  />
                </TouchableOpacity>
                <Text style={styles.filterItemText}>{item.name}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  namePage: {
    color: '#313131',
    fontSize: 16,
    lineHeight: 19,
  },
  showbleView: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  allPageBtnTxt: {
    fontSize: 12,
    color: '#8D8D8D',
    marginTop: '8%',
  },
  firstFiltersBox: {
    width: scalePoint * 82,
    marginRight: scalePoint * 19,
    marginLeft: scalePoint * 8,
    backgroundColor: '#fff',
  },
  filtersBox: {
    width: scalePoint * 85,
    marginRight: scalePoint * 19,
    backgroundColor: '#fff',
  },
  filterItem: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    elevation: 5,
  },
  filterItemIconBox: {
    width: scalePoint * 82,
    height: scalePoint * 80,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(146, 146, 146, 0.37)',
    justifyContent: 'center',
    paddingBottom: '1%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    elevation: 4,
  },
  firstFilterItemIconBox: {
    width: scalePoint * 80,
    height: scalePoint * 80,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(146, 146, 146, 0.37)',
    justifyContent: 'center',
    paddingBottom: '1%',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.07,
    elevation: 4,
    marginLeft: '4%',
  },
  filterItemIcon: {
    width: scalePoint * 29,
    height: scalePoint * 29,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  filterItemText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 14,
    marginTop: scalePoint * 13,
    fontFamily: 'RobotoLight',
  },
});
