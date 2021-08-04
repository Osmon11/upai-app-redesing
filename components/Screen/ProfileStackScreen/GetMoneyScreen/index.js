import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import HeaderInStackScreens from "../../../Common/HeaderInStackScreens";
import GetMoneyBlog from "./GetMoneyBlog";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;

export default function GetMoneyScreen() {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : null}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.mainContentBox}
        >
          <View style={styles.headerBox}>
            <HeaderInStackScreens />
          </View>
          <View style={styles.contentBox}>
            <Text style={styles.mainText}>Chiqarish денег</Text>
          </View>
          <View style={{ flex: 1 }}>
            <GetMoneyBlog />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerBox: {
    marginTop: Platform.OS === "ios" ? "15%" : "5%",
    width: "100%",
    height: scalePoint * 17,
  },
  mainContentBox: {
    flex: 1,
    width: "95%",
    alignSelf: "center",
  },
  contentBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "10%",
  },
  mainText: {
    fontSize: 24,
    lineHeight: 28,
  },
});
