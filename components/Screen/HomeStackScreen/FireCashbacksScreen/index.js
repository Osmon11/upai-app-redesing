import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Header from '../../../Common/Header';
import { useNavigation } from '@react-navigation/native';

import RatingComponent from '../CategoriesStackScreen/RatingComponent';
import filterIcon from '../../../Images/filterIcon.png';

import { API } from '../../../config';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;
import AnimatedLoader from 'react-native-animated-loader';

export default function FireCashbacksScreen({ route }) {
  const [hotCash, setHotCash] = useState([]);
  const [viewLoader, setViewLoader] = React.useState(true);

  useEffect(() => {
    getAllHotCashBack();
  }, []);

  const getAllHotCashBack = async () => {
    const resp = await fetch(API + 'hot-cashback/?limit=100');
    const data = await resp.json();
    setHotCash(data.results);
    setViewLoader(false);
  };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AnimatedLoader
        visible={viewLoader}
        overlayColor="rgba(255,255,255,1)"
        source={require('../../../Common/loader.json')}
        animationStyle={{ width: 100, height: 100, resizeMode: 'cover' }}
        speed={1}
      ></AnimatedLoader>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollBox}>
        <View style={styles.headerBox}>
          <Header />
        </View>
        <View style={styles.mainTxtBox}>
          <Text style={styles.mainText}>Горящий кэшбэк</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FilterScreen', {
                name: 'hot-cashback', 
              })
            }
            style={styles.filterBtn}
          >
            <Image
              style={{
                width: scalePoint * 20,
                height: scalePoint * 20,
                resizeMode: 'contain',
              }}
              source={filterIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContentBox}>
          <View style={styles.scrollItem}>
            {hotCash
              ? hotCash.map((item, index) => {
                  if (item.active != true) {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={
                          (index + 1) % 2 === 0
                            ? styles.imageBox2
                            : styles.imageBox
                        }
                        onPress={() =>
                          navigation.navigate('HotCashbackInfoScreen', {
                            itemId: item.id,
                          })
                        }
                      >
                        <Image
                          style={styles.image}
                          source={{ uri: item.img }}
                        />
                        <View style={{ marginLeft: '1%' }}>
                          <Text style={styles.nameOfItem}>{item.name}</Text>
                          <View style={styles.nameOfItem}>
                            <RatingComponent
                              rate={item.rate}
                              review={item.total_review}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                })
              : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollBox: {
    width: '95%',
    alignSelf: 'center',
  },
  headerBox: {
    marginTop: Platform.OS === 'ios' ? '15%' : '8%',
  },
  mainTxtBox: {
    marginTop: '5%',
    marginBottom: '10%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainText: {
    marginLeft: '5%',
    fontSize: 20,
    lineHeight: 24,
  },
  filterBtn: {
    position: 'absolute',
    right: 0,
    top: -scalePoint * 38,
  },
  mainContentBox: {
    width: '100%',
  },
  nameOfCategoryGroup: {
    fontSize: 16,
    lineHeight: 18,
    marginLeft: '5%',
  },
  scrollItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
  },
  imageBox: {
    width: '45%',
    paddingBottom: '8%',
  },
  imageBox2: {
    width: '45%',
    marginTop: '-5%',
  },
  image: {
    borderWidth: 0.5,
    borderColor: 'rgba(146, 146, 146, 0.37)',
    borderRadius: 10,
    width: scalePoint * 160,
    height: scalePoint * 160,
  },
  nameOfItem: {
    paddingLeft: '5%',
    paddingTop: '2%',
    fontSize: 16,
    lineHeight: 18,
  },
});
