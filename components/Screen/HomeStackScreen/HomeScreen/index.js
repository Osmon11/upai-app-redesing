import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  Platform,
  Text,
} from "react-native";

import Header from "../../../Common/Header";
import AdSlider from "../../../Common/AdSlider";
import FilterCategories from "../CategoriesStackScreen/CategoriesScreen/FilterScreen/FilterCategories";
import ProfileInfo from "../../../Common/PropfileInfo";
import FireCashbacksSlider from "../FireCashbacksScreen/FireCashbacksSlider";
import NewCompaniesSlider from "../CompaniesScreen/NewCompaniesSlider";
import AsyncStorage from "@react-native-community/async-storage";
import * as Linking from "expo-linking";
import AnimatedLoader from "react-native-animated-loader";

import ShopsSlider from "./ShopsSlider";
import { useNavigation } from "@react-navigation/native";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;
export default function HomeScreen() {
  const [auth, setAuth] = useState(true);
  const [openSearch, setOpenSearch] = useState(false);
  const [viewLoader, setViewLoader] = useState(true);
  const [scroll, setScroll] = useState(true);

  const navigation = useNavigation();
  React.useEffect(() => {
    getInfo();

    const unsubscribe = navigation.addListener("focus", () => {
      setViewLoader(true);
      getInfo();
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const getInfo = async () => {
    const result = await AsyncStorage.getItem("token");
    if (result != null) {
      setAuth(true);
      setViewLoader(false);
    } else {
      setAuth(false);
      setViewLoader(false);
    }
  };
  const openSearchComp = () => {
    setOpenSearch(true);
    setScroll(false);
  };
  const closeSearchComp = () => {
    setOpenSearch(false);
    setScroll(true);
  };
  return (
    <View style={styles.container}>
      <AnimatedLoader
        visible={viewLoader}
        overlayColor='rgba(255,255,255,1)'
        source={require("../../../Common/loader.json")}
        animationStyle={styles.lottie}
        speed={1}
      ></AnimatedLoader>

      <ScrollView
        style={styles.scrollStyle}
        showsVerticalScrollIndicator={false}
        scrollEnabled={scroll}
      >
        <View style={styles.headerBox}>
          <Header
            open={openSearchComp}
            close={closeSearchComp}
            display={true}
          />
        </View>
        {auth && (
          <View style={styles.profileBox}>
            <ProfileInfo nav={viewLoader} />
          </View>
        )}
        <View style={styles.contentContainer}>
          <AdSlider />
        </View>
        <View style={styles.contentContainer}>
          <FilterCategories />
        </View>
        <View style={styles.contentContainer}>
          <FireCashbacksSlider />
        </View>
        <View style={styles.contentContainer}>
          <NewCompaniesSlider />
        </View>

        <View style={styles.lastContentBox}>
          <ShopsSlider />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  scrollStyle: {
    width: window.width,
    alignSelf: "center",
  },
  headerBox: {
    width: "95%",
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? scalePoint * 46 : 43,
    height: scalePoint * 23,
    zIndex: 9999,
    marginLeft: "1%",
  },
  openedHeaderBox: {
    width: "95%",
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? "15%" : "8%",
    height: scalePoint * 200,
  },
  profileBox: {
    marginTop: scalePoint * 9,
    width: "100%",
  },
  lottie: {
    width: 100,
    height: 100,
  },
  contentContainer: {
    marginTop: scalePoint * 21,
  },
  lastContentBox: {
    marginBottom: "8%",
  },
});
