import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';

import Header from '../../../../Common/Header';
import BigSliderOfCategory from '../BigSliderOfCatefory';
import SmallSliderOfCategory from '../SmallSiderOfCategory';
import AdSlider from '../../../../Common/AdSlider';
import CategoriesHeader from '../CategoriesHeader';
import { API } from '../../../../config';

import AnimatedLoader from 'react-native-animated-loader';
const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function CategoriesScreen() {
  const [category, setCategory] = React.useState();
  const [openSearch, setOpenSearch] = React.useState(false);
  React.useEffect(() => {
    getAllCategoties();
  });
  const [viewLoader, setViewLoader] = React.useState(true);

  const getAllCategoties = async () => {
    const resp = await fetch(API + 'category/');
    const data = await resp.json();
    setCategory(data);
    data && setViewLoader(false);
  };
  const openSearchComp = () => {
    setOpenSearch(true);
  };
  const closeSearchComp = () => {
    setOpenSearch(false);
  };
  return (
    <View style={styles.container}>
      <AnimatedLoader
        visible={viewLoader}
        overlayColor="rgba(255,255,255,1)"
        source={require('../../../../Common/loader.json')}
        animationStyle={{ width: 100, height: 100, resizeMode: 'cover' }}
        speed={1}
      ></AnimatedLoader>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollBox}>
        <View style={styles.headerBox}>
          <Header
            open={openSearchComp}
            close={closeSearchComp}
            display={true}
          />
        </View>
        <View style={styles.categoriesHeaderBox}>
          <CategoriesHeader />
        </View>
        {category &&
          category.map((item, index) =>
          
            
          
            item.shops_count >= 1 ? (
              (index + 1) / 3 == 1 ? (
                <View key={index} style={styles.adSlideBox}>
                  <AdSlider />
                </View>
              ) : (index + 1) % 2 !== 0 ? (
                <BigSliderOfCategory
                  key={item.id}
                  category={item.id}
                  categoryName={item.name}
                />
              ) : (
                <>
                  <SmallSliderOfCategory
                    key={item.id}
                    category={item.id}
                    categoryName={item.name}
                  />
                </>
              )
            ) : null
          )}
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
    marginTop: Platform.OS === 'ios' ? scalePoint * 46 : scalePoint * 25,
    width: '100%',
    alignSelf: 'center',
  },
  headerBox: {
    width: '95%',
    alignSelf: 'center',
  },
  categoriesHeaderBox: {
    marginTop: '10%',
    width: '95%',
    alignSelf: 'center',
    zIndex: -1,
  },
  adSlideBox: {
    zIndex: -1,
  },
  lastSliderBox: {
    paddingBottom: '10%',
  },
});
