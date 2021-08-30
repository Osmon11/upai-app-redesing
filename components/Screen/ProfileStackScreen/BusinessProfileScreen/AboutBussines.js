import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import HeaderInStackScreens from "../../../Common/HeaderInStackScreens";

export default function AboutBussines() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainContent}
      >
        <View style={styles.headerBox}>
          <HeaderInStackScreens />
        </View>
        <View style={styles.showbleView}>
          <View style={styles.namePageView}>
            <Text style={styles.namePage}>Biznes profil nima</Text>
          </View>
          <View style={styles.textContent}>
            <Text style={styles.topTxt}>
              Upai - sizning biznes sherigingiz. Bizning vazifamiz Sizga ko'proq
              mijozlarni jalb qiling, ularni ro'yxatiga kiritasiz Upai xizmati
              orqali naqd pul qaytarish.{"\n"}
            </Text>
            <Text style={styles.bottomTxt}>
              Siz tovarlar va xizmatlarni sotishdan daromad olasiz, siz olasiz
              sodiq mijozlar, reklama tejash.{" "}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContent: {
    width: "95%",
    alignSelf: "center",
  },
  headerBox: {
    width: "100%",
    marginTop: Platform.OS === "ios" ? "15%" : "10%",
    height: 23,
  },
  showbleView: {
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  namePage: {
    color: "#313131",
    fontSize: 24,
    lineHeight: 26,
    marginLeft: "5%",
  },
  textContent: {
    marginTop: "10%",
  },
  topTxt: {
    color: "#000",
    fontSize: 14,
    lineHeight: 16,
    fontFamily: "Roboto",
    textAlign: "justify",
  },
  bottomTxt: {
    marginTop: "5%",
    color: "#000",
    fontSize: 14,
    lineHeight: 16,
    fontFamily: "Roboto",
    textAlign: "justify",
  },
});
