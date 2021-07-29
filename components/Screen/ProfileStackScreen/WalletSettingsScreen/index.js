import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Platform,
  Dimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import HeaderInStackScreens from "../../../Common/HeaderInStackScreens";
import CardBox from "./CardBox";
import WalletHistory from "./History";
import GettingCashbacksList from "../../NotificationsStackScreen/NotificationsScreen/GettingCashbacksList";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;

export default function WalletSettingScreen() {
  const navigation = useNavigation();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    return () => {
      unsubscribe;
    };
  }, [navigation]);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollBox} showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.headerBox}>
            <HeaderInStackScreens />
          </View>
          <View style={styles.mainContentBox}>
            <Text style={styles.mainText}>Kошелeк</Text>
          </View>

          <CardBox />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: "100%",
            marginTop: "10%",
            height: scalePoint * 235,
          }}
        >
          <GettingCashbacksList />
        </ScrollView>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => navigation.navigate("GetMoneyScreen")}
        >
          <Text style={styles.btnTxt}>Вывести деньги </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollBox: {
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#fff",
  },
  headerBox: {
    marginTop: Platform.OS === "ios" ? "15%" : "5%",
  },
  mainContentBox: {
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "10%",
  },
  mainText: {
    fontSize: 24,
    lineHeight: 28,
  },
  btnStyle: {
    width: "60%",
    marginTop: "5%",
    marginBottom: "15%",
    height: scalePoint * 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#01C65C",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    fontSize: 14,
    lineHeight: 16,
    color: "#01C65C",
  },
});
