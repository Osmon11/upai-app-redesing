import React from 'react';
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

import { useNavigation } from '@react-navigation/native';

import HeaderInStackScreens from '../../../../../Common/HeaderInStackScreens';
import RatingComponent from '../../RatingComponent';

import CategoriesHeader from '../../CategoriesHeader';
import { API } from '../../../../../config';
import percentIcon from '../../../../../Images/percentIcon.png';
const window = Dimensions.get('window');
const scalePoint = window.width / 380;

import AnimatedLoader from 'react-native-animated-loader';
export default function SingleCategoryScreen({ route }) {
  const [categories, setData] = React.useState();
  const [name, setName] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const [viewLoader, setViewLoader] = React.useState(true);
  React.useEffect(() => {
    setViewLoader(false);
  }, [route]);
  React.useEffect(() => {
    reloadPage();
  });

  const reloadPage = () => {
    setName(route.params?.name);
    if (route.params?.markets && !route.params?.filter) {
      setData(route.params?.markets);
    } else {
      if (route.params?.filter !== '' || route.params?.filter !== undefined) {
        setFilter(`?ordering=${route.params?.filter}&`);
      } else {
        setFilter('?');
      }
      getAllCatById();
    }
  };
  const getAllCatById = async () => {
    let resp = await fetch(
      API +
        'shop/?offset=0&' +
        filter +
        'category=' +
        route.params?.category +
        '&limit=100'
    );
    let req = await resp.json();

    setData(req.results);
  };
  const navigation = useNavigation();

  const { width, height } = Dimensions.get('window'),
    vw = width / 100,
    vh = height / 100;

  return (
    <View style={styles.container}>
      <AnimatedLoader
        visible={viewLoader}
        overlayColor="rgba(255,255,255,1)"
        source={require('../../../../../Common/loader.json')}
        animationStyle={{ width: 100, height: 100, resizeMode: 'cover' }}
        speed={1}
      ></AnimatedLoader>
      <ScrollView
        style={styles.scrollStyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerBox}>
          <HeaderInStackScreens />
        </View>
        <View style={styles.categoriesHeader}>
          <CategoriesHeader name={name} />
        </View>
        <View style={styles.mainContentBox}>
          <View>
            <Text style={styles.nameOfCategoryGroup}>{name}</Text>
          </View>
          <View style={styles.scrollItem}>
            {categories
              ? categories.map((item, index) => (
                  <TouchableOpacity
                    style={
                      (index + 1) % 2 === 0 ? styles.imageBox2 : styles.imageBox
                    }
                    onPress={() =>
                      navigation.navigate('CompanyScreen', { itemId: item.id })
                    }
                  >
                    <View style={styles.cashbacksCircle}>
                      <View style={styles.percentCircle}>
                        <Image
                          style={{
                            width: scalePoint * 10,
                            height: scalePoint * 10,
                            resizeMode: 'contain',
                          }}
                          source={percentIcon}
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 14,
                          lineHeight: 14,
                          color: '#fff',
                        }}
                      >
                        {item.cashback}%
                      </Text>
                    </View>
                    <Image
                      style={styles.image}
                      source={{ uri: item.main_image }}
                    />
                    <View style={{ marginLeft: '1%' }}>
                      <Text style={styles.nameOfItem}>{item.name}</Text>
                      <View style={styles.nameOfItem}>
                        <RatingComponent
                          reviewStatus={true}
                          rate={item.rate}
                          review={item.total_review}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
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
  scrollStyle: {
    width: '90%',
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? '10%' : 0,
  },
  headerBox: {
    marginTop: Platform.OS === 'ios' ? '5%' : '8%',
    width: '100%',
    height: scalePoint * 23,
  },
  cashbacksCircle: {
    width: scalePoint * 45,
    height: scalePoint * 45,
    borderRadius: scalePoint * 45 * 0.5,
    backgroundColor: '#ff0707',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: scalePoint * 5,
    top: scalePoint * 5,
    zIndex: 9,
  },
  percentCircle: {
    position: 'absolute',
    top: '60%',
    left: '-10%',
    zIndex: 10,
    width: scalePoint * 16,
    height: scalePoint * 16,
    borderRadius: scalePoint * 16 * 0.5,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#27ae60',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesHeader: {
    marginTop: '5%',
    marginBottom: '10%',
    width: '100%',
    height: scalePoint * 45,
  },
  mainContentBox: {
    width: '100%',
  },
  nameOfCategoryGroup: {
    fontSize: 16,
    lineHeight: 18,
  },
  scrollItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '98%',
    marginTop: '5%',
    paddingBottom: '15%',
    justifyContent: 'space-between',
  },
  imageBox: {
    width: scalePoint * 160,
    paddingBottom: '8%',
  },
  imageBox2: {
    width: scalePoint * 160,
    paddingBottom: '16%',
    marginTop: '-8%',
  },
  image: {
    borderWidth: 0.5,
    borderColor: 'rgba(146, 146, 146, 0.37)',
    borderRadius: 10,
    width: scalePoint * 160,
    height: scalePoint * 160,
    resizeMode: 'cover',
  },
  nameOfItem: {
    paddingLeft: '5%',
    paddingTop: '2%',
    fontSize: 16,
    lineHeight: 18,
  },
});
