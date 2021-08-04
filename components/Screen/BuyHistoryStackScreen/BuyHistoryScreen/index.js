import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Card } from "react-native-shadow-cards";

import Header from "../../../Common/Header";
import HistoryOfBuys from "./BusinessBuyHistory/HistoryOfBuys";

import myBuysLikeIcon from "../../../Images/myBuysLikeIcon.png";
import myBuysCashsSumIcon from "../../../Images/myBuysCashsSumIcon.png";
import myBuysSumIcon from "../../../Images/myBuysSumIcon.png";

import AsyncStorage from "@react-native-community/async-storage";
import { API } from "../../../config";
import EmptyComponent from "../../../Common/EmptyComponent";
import AnimatedLoader from "react-native-animated-loader";
import moment from "moment";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;

export default function BuyHistoryBuys() {
  const navigation = useNavigation();
  const [purchase, setPurchase] = useState([]);
  const [companyLog, setCompanyLog] = useState(false);
  const [viewLoader, setViewLoader] = React.useState(true);

  React.useEffect(() => {
    getPurchase();
    getFullInfo();
  }, [navigation]);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setViewLoader(true);
      getPurchase();
      getFullInfo();
    });
    return () => {
      unsubscribe;
    };
  }, []);
  const getPurchase = async () => {
    const token = await AsyncStorage.getItem("token");
    const resp = await fetch(API + "users/purchase/?limit=100", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();

    setPurchase(data.results);
  };

  const getFullInfo = async () => {
    const token = await AsyncStorage.getItem("token");
    const resp = await fetch(API + "users/profile/", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    if (data && data.shop) {
      setCompanyLog(true);
    } else {
      setCompanyLog(false);
    }
    setViewLoader(false);
  };
  const { width, height } = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100;
  return (
    <View style={styles.container}>
      <AnimatedLoader
        visible={viewLoader}
        overlayColor='rgba(255,255,255,1)'
        source={require("../../../Common/loader.json")}
        animationStyle={{ width: 100, height: 100 }}
        speed={1}
      ></AnimatedLoader>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollBox}>
        <View style={companyLog ? { flex: 1 } : { display: "none" }}>
          <HistoryOfBuys />
        </View>
        <View style={companyLog ? { display: "none" } : { flex: 1 }}>
          <View style={styles.headerBox}>
            <Header />
          </View>
          <View style={styles.screenMainTxtBox}>
            <Text style={styles.nameOfCategoryGroup}>Mening xaridlarim</Text>
          </View>

          <View style={styles.renderBox}>
            {purchase?.length !== 0 ? (
              purchase.map((item, index) => (
                <View style={styles.shadowCard} key={index}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("CompanyScreen", {
                        itemId: item.seller,
                      })
                    }
                    style={styles.renderItem}
                  >
                    <View style={styles.itemLeftSide}>
                      <View style={styles.leftLogoBox}>
                        <Image
                          style={styles.leftLogo}
                          source={{ uri: item.shop_logo }}
                        />
                      </View>
                      <TouchableOpacity
                        style={styles.reviewBtnBox}
                        onPress={() =>
                          navigation.navigate("CompanyScreen", {
                            itemId: item.seller,
                          })
                        }
                      >
                        <Image style={styles.icon} source={myBuysLikeIcon} />
                        <Text style={styles.reviewBtnTxt}>
                          Taqriz qoldirish
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.dateTxt}>
                        {moment(item.created).format("DD.MM.YYYY")}
                      </Text>
                    </View>
                    <View style={styles.rightSideBox}>
                      <Text style={styles.shopName}>
                        {String(item.shop_name).length > 16
                          ? String(item.shop_name).substr(0, 16) + "..."
                          : item.shop_name}
                      </Text>
                      <View
                        style={{
                          marginTop: scalePoint * 13,
                        }}
                      >
                        <View style={styles.sumIconBox}>
                          <Image
                            style={styles.sumIcon}
                            source={myBuysSumIcon}
                          />
                          <Text style={styles.sum}>{item.amount} сом</Text>
                        </View>
                        <View style={styles.cashbackBox}>
                          <Image
                            style={styles.sumIcon}
                            source={myBuysCashsSumIcon}
                          />
                          <Text style={styles.cashbackSum}>
                            {item.cashback} сом
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <EmptyComponent />
            )}
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
  headerBox: {
    width: "100%",
    height: scalePoint * 23,
  },
  screenMainTxtBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scalePoint * 35,
    marginBottom: scalePoint * 35,
  },
  nameOfCategoryGroup: {
    marginLeft: "5%",
    fontSize: 24,
    lineHeight: 26,
  },
  scrollBox: {
    width: "95%",
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? scalePoint * 46 : scalePoint * 25,
  },
  shadowCard: {
    width: "100%",
    height: scalePoint * 86,
    borderRadius: 10,
    marginTop: scalePoint * 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1,

    elevation: 3,
  },
  renderBox: {
    marginRight: "4%",
    marginLeft: "4%",
    marginBottom: "5%",
  },
  renderItem: {
    alignSelf: "center",
    width: "100%",
    height: scalePoint * 86,
    borderWidth: 0.5,
    borderColor: " rgba(146, 146, 146, 0.37)",
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  itemLeftSide: {
    width: "50%",
    borderRightWidth: 1,
    borderRightColor: "#ebebeb",
    alignItems: "center",
    marginTop: scalePoint * 13,
    marginBottom: scalePoint * 14,
  },
  reviewBtnBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: scalePoint * 7,
  },
  reviewBtnTxt: {
    fontFamily: "RobotoLight",
    fontSize: 10,
    lineHeight: 12,
    marginLeft: "1%",
    marginTop: "-2%",
    fontWeight: "100",
  },
  dateTxt: {
    fontSize: 10,
    lineHeight: 12,
    marginTop: "2%",
    color: "#8d8d8d",
    fontFamily: "Roboto",
  },
  leftLogoBox: {
    width: scalePoint * 37,
    height: scalePoint * 37,
    borderRadius: scalePoint * 37 * 0.5,
    justifyContent: "center",
    alignSelf: "center",
  },
  leftLogo: {
    width: scalePoint * 37,
    height: scalePoint * 37,
    borderRadius: scalePoint * 37 * 0.5,
    resizeMode: "cover",
  },
  icon: {
    width: scalePoint * 13,
    height: scalePoint * 13,
    resizeMode: "contain",
    marginTop: "-5%",
  },
  rightSideBox: {
    width: "50%",
    alignItems: "center",
    marginTop: scalePoint * 13,
    marginBottom: scalePoint * 14,
  },
  shopName: {
    fontSize: 14,
    lineHeight: 16,
    color: "#313131",
  },
  sumIconBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sumIcon: {
    width: scalePoint * 15,
    height: scalePoint * 15,
    resizeMode: "contain",
    marginRight: scalePoint * 3,
  },
  sum: {
    fontSize: 10,
    lineHeight: 12,
    color: "#515151",
    fontFamily: "RobotoLight",
  },
  cashbackBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cashbackSum: {
    fontSize: 10,
    lineHeight: 12,
    color: "#515151",
    marginLeft: "1%",
    fontFamily: "RobotoLight",
  },
});
