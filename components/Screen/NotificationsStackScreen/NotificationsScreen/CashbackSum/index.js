import React from "react";
import { BoxShadow } from "react-native-shadow";

import { Image, View, StyleSheet, Text, Dimensions } from "react-native";
import cashbacksIncomeIcon from "../../../../Images/cashbacksIncomeIcon.png";
import AsyncStorage from "@react-native-community/async-storage";
import { API } from "../../../../config";

import AnimatedLoader from "react-native-animated-loader";
import EmptyComponent from "../../../../Common/EmptyComponent";
import gettingCashbacksIcon from "../../../../Images/gettingCashbacksIcon.png";
import waitingCashbacksIcon from "../../../../Images/waitingCashbacksIcon.png";
import declinedCashbacksIcon from "../../../../Images/declinedCashbacksIcon.png";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;

export default function CashbackSum({ cashBackGet }) {
  const [s, setS] = React.useState();
  const [from, setFrom] = React.useState();
  const [to, setTo] = React.useState();

  const [viewLoader, setViewLoader] = React.useState(true);
  const shadowOpt = {
    width: 51,
    height: 50,
    color: "#A0A0A0",
    border: 2,
    radius: 10,
    opacity: 0.05,
    x: 0,
    y: 2,
  };
  useEffect(() => {
    setTimeout(() => {
      setViewLoader(false);
    }, 2000);
  }, []);
  const getImg = {
    success: gettingCashbacksIcon,
    balance_changed: gettingCashbacksIcon,
    new_shop: gettingCashbacksIcon,
    pending: waitingCashbacksIcon,
  };
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <AnimatedLoader
        visible={viewLoader}
        overlayColor='rgba(255,255,255,1)'
        source={require("../../../../Common/loader.json")}
        animationStyle={{ width: 100, height: 100 }}
        speed={1}
      ></AnimatedLoader>

      <View>
        {cashBackGet?.length !== 0 ? (
          cashBackGet?.map((item, index) => (
            <View
              style={{
                flexDirection: "row",
                height: 70,
                borderBottomWidth: 1,
                borderBottomColor: "#EBEBEB",
                alignItems: "center",
                paddingLeft: "2%",
                width: "98%",
              }}
              key={index}
            >
              <BoxShadow setting={shadowOpt}>
                <View style={styles.iconBox}>
                  <Image
                    style={styles.boxImage}
                    source={
                      Boolean(getImg[item.kind])
                        ? getImg[item.kind]
                        : declinedCashbacksIcon
                    }
                  />
                </View>
              </BoxShadow>
              <View style={styles.cashbacksInfoBox}>
                <View style={styles.cashbacksInfoTxtBox}>
                  <Text style={styles.cashbacksInfoText}>{item.title}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: scalePoint * 10,
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.shopNameBox}>
                    <Text style={styles.shopName}>
                      {String(item.sender).length > 16
                        ? String(item.sender).substr(0, 16) + "..."
                        : item.sender}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginRight: scalePoint * 70,
                      alignSelf: "flex-start",
                    }}
                  >
                    <Text style={styles.cashbacksComesTime}>
                      {new Date(item.created).getHours() <= 9
                        ? "0" + new Date(item.created).getHours()
                        : new Date(item.created).getHours()}
                      :
                      {new Date(item.created).getMinutes() <= 9
                        ? "0" + new Date(item.created).getMinutes()
                        : new Date(item.created).getMinutes()}
                    </Text>
                    <Text style={styles.cashbacksComesDate}>
                      {moment(item.created).format("DD.MM.YYYY")}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        ) : (
          <EmptyComponent />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 50,
    height: 50,
    borderWidth: 0.5,
    borderColor: "rgba(146, 146, 146, 0.37)",
    justifyContent: "center",
  },
  boxImage: {
    width: 20,
    height: 20,
    alignSelf: "center",
  },
  cashbacksInfoBox: {
    marginLeft: "5%",
    width: "95%",
  },
  cashbacksInfoTxtBox: {
    marginTop: scalePoint * 3,
    width: "100%",
  },
  cashbacksInfoText: {
    fontSize: 14,
    lineHeight: 16,
    width: "85%",
    fontFamily: "SfPro",
  },
  cashbacksComesDate: {
    fontSize: 10,
    lineHeight: 14,
    color: "#6B6B6B",
    marginLeft: "15%",
    fontFamily: "RobotoLight",
  },
  cashbacksComesTime: {
    fontSize: 10,
    lineHeight: 14,
    color: "#6B6B6B",
    marginRight: "5%",
    fontFamily: "RobotoLight",
  },
  shopNameBox: {
    justifyContent: "center",
  },
  shopName: {
    fontSize: 12,
    fontFamily: "RobotoLight",
    lineHeight: 14,
    color: "#313131",
  },
});
