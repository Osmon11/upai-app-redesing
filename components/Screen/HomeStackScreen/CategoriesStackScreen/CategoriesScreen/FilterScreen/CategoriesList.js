import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from "react-native";

import { BoxShadow } from "react-native-shadow";
import { useNavigation } from "@react-navigation/native";

import HeaderInStackScreens from "../../../../../Common/HeaderInStackScreens";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;

export default function CategoriesList({ route }) {
  const { data } = route.params;
  const navigation = useNavigation();

  const shadowOpt = {
    width: 65,
    height: 67,
    color: "#000",
    border: 2,
    radius: 10,
    opacity: 0.05,
    x: 0,
    y: 2,
  };
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollStyle}
      >
        <View style={styles.headerBox}>
          <HeaderInStackScreens />
        </View>

        <View style={styles.showbleView}>
          <View style={styles.namePageView}>
            <Text style={styles.namePage}>Toifalar</Text>
          </View>
        </View>
        <View style={styles.renderBox}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              delayPressIn={5}
              style={styles.filtersBox}
              key={index}
              onPress={() =>
                navigation.navigate("SingleCategoryScreen", {
                  category: item.id,
                  name: item.name,
                })
              }
            >
              <BoxShadow setting={shadowOpt}>
                <View style={styles.filterItemIconBox}>
                  <Image
                    style={styles.filterItemIcon}
                    key={index}
                    source={{ uri: item.icon }}
                  />
                </View>
              </BoxShadow>
              <Text style={styles.filterItemText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  scrollStyle: {
    width: "90%",
    alignSelf: "center",
    alignContent: "center",
  },
  headerBox: {
    marginTop: Platform.OS === "ios" ? "15%" : "5%",
    marginBottom: "10%",
  },
  namePageView: {
    marginLeft: "5%",
    marginBottom: "5%",
  },
  namePage: {
    width: "100%",
    color: "#313131",
    fontSize: 24,
    lineHeight: 28,
  },
  showbleView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  renderBox: {
    paddingBottom: "10%",
  },
  allPageBtnTxt: {
    fontSize: 12,
    color: "#8d8d8d",
    marginRight: "5%",
    marginTop: "8%",
  },
  filtersBox: {
    flexDirection: "row",
    marginTop: "2%",
    alignItems: "center",
  },
  filterItemIconBox: {
    width: 65,
    height: 65,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "rgba(146, 146, 146, 0.37)",
    justifyContent: "center",
    paddingBottom: "1%",
  },
  filterItemIcon: {
    width: 29,
    height: 29,
    alignSelf: "center",
    resizeMode: "contain",
  },
  filterItemText: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    alignSelf: "center",
    marginLeft: "10%",
  },
});
