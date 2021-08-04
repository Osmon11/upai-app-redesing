import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import CashbackSum from "../../NotificationsStackScreen/NotificationsScreen/CashbackSum";

export default function WalletHistory() {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.showbleView}>
        <View style={styles.namePageView}>
          <Text style={styles.namePage}>История</Text>
        </View>
        <TouchableOpacity
          style={styles.allPageBtn}
          onPress={() => {
            navigation.navigate("NotificationsScreen");
          }}
        >
          <Text style={styles.allPageBtnTxt}>Barchasi</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
        }}
      >
        <CashbackSum />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContentBox: {
    marginTop: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "10%",
    marginRight: "5%",
  },
  mainText: {
    fontSize: 24,
    lineHeight: 28,
  },
  showbleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  namePage: {
    color: "#313131",
    fontSize: 20,
    lineHeight: 24,
    marginLeft: "10%",
  },
  allPageBtnTxt: {
    fontSize: 12,
    color: "#8d8d8d",
    marginRight: "5%",
    marginTop: "8%",
  },
});
