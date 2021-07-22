import React from "react";
import { BoxShadow } from "react-native-shadow";

import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import cashbacksIncomeIcon from "../../../../Images/trash.png";
import AsyncStorage from "@react-native-community/async-storage";
import { API } from "../../../../config";
import EmptyComponent from "../../../../Common/EmptyComponent";
import AnimatedLoader from "react-native-animated-loader";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;

export default function SendedCashbacks({ open, cashBackGet }) {
  const shadowOpt = {
    width: 51,
    height: 50,
    color: "#A0A0A0",
    border: 2,
    radius: 10,
    opacity: 0.1,
    x: -1,
    y: 1.5,
  };
  const [viewLoader, setViewLoader] = React.useState(true);

  React.useEffect(() => {}, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", width: "98%" }}>
      <AnimatedLoader
        visible={viewLoader}
        overlayColor='rgba(255,255,255,1)'
        source={require("../../../../Common/loader.json")}
        animationStyle={{ width: 100, height: 100 }}
        speed={1}
      ></AnimatedLoader>
      <View>
        {cashBackGet && cashBackGet?.length !== 0 ? (
          cashBackGet?.map((item, index) => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                width: "100%",
                borderBottomWidth: 1.5,
                borderBottomColor: "rgba(146, 146, 146, 0.15)",
                paddingBottom: scalePoint * 13,
                marginTop: scalePoint * 12,
              }}
              key={index}
              onPress={() => open(index)}
            >
              <BoxShadow setting={shadowOpt}>
                <View style={styles.iconBox}>
                  <Image style={styles.boxImage} source={cashbacksIncomeIcon} />
                </View>
              </BoxShadow>
              <View style={styles.cashbacksInfoBox}>
                <View style={styles.nameAndSumBox}>
                  <View style={styles.nameBox}>
                    <Text style={styles.cashbacksInfoText}>
                      {item.customer_name}
                    </Text>
                    <Text style={styles.commentTxt}>Комментарий:</Text>
                  </View>
                  <View style={styles.sumBox}>
                    <Text style={styles.shopSum}>{item.amount} сом</Text>
                    <Text style={styles.cashbackSum}>{item.cashback} сом</Text>
                  </View>
                </View>

                <View
                  style={{ flexDirection: "row", marginTop: scalePoint * 2 }}
                >
                  <Text style={styles.cashbacksComesDate}>
                    {new Date(item.created).getHours() <= 9
                      ? "0" + new Date(item.created).getHours()
                      : new Date(item.created).getHours()}
                    :
                    {new Date(item.created).getMinutes() <= 9
                      ? "0" + new Date(item.created).getMinutes()
                      : new Date(item.created).getMinutes()}
                  </Text>
                  <Text style={styles.cashbacksComesTime}>
                    {new Date(item.created).getDate() <= 9
                      ? "0" + new Date(item.created).getDate()
                      : new Date(item.created).getDate()}
                    .
                    {new Date(item.created).getMonth() + 1 <= 9
                      ? "0" + (new Date(item.created).getMonth() + 1)
                      : new Date(item.created).getMonth() + 1}
                    .{new Date(item.created).getFullYear()}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
    width: 15,
    height: 15,
    alignSelf: "center",
  },
  cashbacksInfoBox: {
    marginLeft: "5%",
    marginTop: scalePoint * 2,
  },
  nameAndSumBox: {
    width: "100%",
    flexDirection: "row",
  },
  nameBox: {
    width: "60%",
    marginRight: "7%",
  },
  sumBox: {
    width: "25%",
    marginTop: scalePoint * 2,
  },
  shopSum: {
    fontFamily: "SfPro",
    fontSize: 12,
    lineHeight: 14.5,
    color: "#27AE60",
    alignSelf: "flex-end",
  },
  cashbackSum: {
    fontFamily: "SfPro",
    fontSize: 10,
    lineHeight: 12,
    color: "#515151",
    marginTop: "8%",
    alignSelf: "flex-end",
  },
  cashbacksInfoText: {
    fontSize: 14,
    lineHeight: 16,
    color: "#313131",
    fontFamily: "SfPro",
  },
  commentTxt: {
    fontSize: 10,
    color: "#6b6b6b",
    marginTop: scalePoint * 3,
    fontFamily: "RobotoLight",
  },
  cashbacksComesTime: {
    marginTop: "5%",
    flexDirection: "row",
    width: "100%",
  },
  cashbacksComesDate: {
    fontSize: 10,
    lineHeight: 12,
    color: "#6B6B6B",
    marginRight: "9%",
    fontFamily: "RobotoLight",
  },
  cashbacksComesTime: {
    fontSize: 10,
    lineHeight: 12,
    color: "#6B6B6B",
    marginLeft: "-3%",
    fontFamily: "RobotoLight",
  },
});
