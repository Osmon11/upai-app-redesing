import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import sliderImg from "../../Images/sliderImg.png";
import sliderImg2 from "../../Images/sliderImg.png";
import sliderImg3 from "../../Images/sliderImg.png";

import { Foundation } from "@expo/vector-icons";
import { API } from "../../config";
import { useNavigation } from "@react-navigation/native";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;
const width = window.width;
const height = width * 0.6;
const heightOfScroll = width * 0.62;

const images = [sliderImg, sliderImg2, sliderImg3];

export default function AdSlider() {
  const [active, setActive] = useState(0);
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    getBanners();
  }, []);

  async function getBanners() {
    const resp = await fetch(API + "banner/");
    const data = await resp.json();
    setBanners(data);
  }

  function slide({ nativeEvent }) {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  }

  const navigation = useNavigation();

  return (
    <View style={styles.adSliderContainer}>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={slide}
        showsHorizontalScrollIndicator={false}
        style={{ width, height: heightOfScroll, alignSelf: "center" }}
      >
        {banners.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              navigation.navigate("CompanyScreen", { itemId: item.shop })
            }
            key={index}
            style={index == 0 ? styles.firstSliderImgBox : styles.sliderImgBox}
          >
            <Image style={styles.sliderImg} source={{ uri: item.image }} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {banners.map((i, index) => (
          <Text
            key={index}
            style={
              index == active ? styles.pagingActiveText : styles.pagingText
            }
          >
            __
          </Text>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  adSliderContainer: {
    width: width,
    alignSelf: "center",
    marginTop: "5%",
  },
  sliderImgBox: {
    shadowColor: "rgba(0,0,0,0.25)",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.45,
    shadowRadius: 2.22,
    elevation: 3,
    alignSelf: "center",
  },
  firstSliderImgBox: {
    shadowColor: "rgba(0,0,0,0.25)",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.45,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop: 3.5,
    marginLeft: 4,
  },
  sliderImg: {
    width: width * 0.98,
    height,
    borderRadius: scalePoint * 10,
    resizeMode: "cover",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    borderRadius: 20,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    marginRight: width * 0.02,
  },
  pagination: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? "-2%" : "-3%",
    backgroundColor: "transparent",
  },
  pagingText: {
    fontSize: 14,
    color: "#000",
    marginLeft: scalePoint * 10,
  },
  pagingActiveText: {
    fontSize: 14,
    color: "#01C65C",
    marginLeft: scalePoint * 10,
  },
});
