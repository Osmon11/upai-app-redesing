import React, { useState, useRef } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import Header from "../../../Common/Header";

import emptyProfileAccountImg from "../../../Images/emptyProfileAccountImg.png";

import profileScreenBuyIcon from "../../../Images/profileScreenBuyIcon.png";
import profileScreenBuysNumIcon from "../../../Images/profileScreenBuysNumIcon.png";
import profileScreenCashsNumIcon from "../../../Images/profileScreenCashsNumIcon.png";
import settingProfileIcon from "../../../Images/settingProflieIcon.png";
import * as Notifications from "expo-notifications";
import MyBuys from "../../BuyHistoryStackScreen/BuyHistoryScreen/MyBuys";
import ProfileScreenMenu from "./ProfileScreenMenu";
import { API } from "../../../config";
import AsyncStorage from "@react-native-community/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import AnimatedLoader from "react-native-animated-loader";
const width = Dimensions.get("window").width;
const scalePoint = width / 380;

export default function ProfileScreen() {
  const [data, setData] = React.useState();
  const [purchase, setPurchase] = React.useState([]);
  const [auth, setAuth] = React.useState(false);
  const [notification, setNotification] = React.useState();

  const [viewLoader, setViewLoader] = React.useState(true);

  React.useEffect(() => {
    getInfo();
  });
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  React.useEffect(() => {
    getFullInfo();
    getPurchase();
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});
    const unsubscribe = navigation.addListener("focus", () => {
      setViewLoader(true);
      getFullInfo();
      getPurchase();
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const { width, height } = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100;

  const navigation = useNavigation();
  const getFullInfo = async () => {
    const token = await AsyncStorage.getItem("token");
    const resp = await fetch(API + "users/profile/", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    setViewLoader(false);
    setData(data);
  };
  const getInfo = async () => {
    const result = await AsyncStorage.getItem("token");
    if (result === null) {
      setAuth(false);
      // navigation.navigate('LoginMainScreen');
    } else {
      setAuth(true);
    }
  };
  const getPurchase = async () => {
    const token = await AsyncStorage.getItem("token");

    const resp = await fetch(API + "users/purchase/?limit=5", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    setPurchase(data.results);
  };
  return (
    <View style={styles.container}>
      <AnimatedLoader
        visible={viewLoader}
        overlayColor='rgba(255,255,255,1)'
        source={require("../../../Common/loader.json")}
        animationStyle={{ width: 100, height: 100 }}
        speed={1}
      ></AnimatedLoader>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: "95%",
          alignSelf: "center",
        }}
      >
        <View>
          <View style={styles.headerBox}>
            <Header />
          </View>

          <View style={styles.profileInfoBox}>
            <View style={{ width: "100%", alignItems: "center" }}>
              <View style={styles.accountImgFirstShadowCircle}>
                <View style={styles.accountImgSecondShadowCircle}>
                  <View style={styles.profileSettingsBtnBox}>
                    <TouchableOpacity
                      style={styles.profileSettingsBtn}
                      onPress={() =>
                        navigation.navigate("ProfileSettingScreen")
                      }
                    >
                      <Image
                        style={{
                          width: scalePoint * 15,
                          height: scalePoint * 15,
                          resizeMode: "contain",
                        }}
                        source={settingProfileIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.accountImgThirdShadowCircle}>
                    <Image
                      style={{
                        width: scalePoint * 107,
                        height: scalePoint * 107,
                        borderRadius: scalePoint * 107 * 0.5,
                      }}
                      source={
                        Boolean(data) && Boolean(data.avatar)
                          ? { uri: data.avatar }
                          : emptyProfileAccountImg
                      }
                    />
                  </View>
                </View>
              </View>
              <Text style={styles.profileNameTxt}>
                {/* {data && data?.fullname && String(data?.fullname).length > 12
                  ? String(data?.fullname).substring(0, 12) + '...'
                  : data?.fullname
                  ? data?.fullname
                  : ''} */}
                {data && data?.fullname}
              </Text>
            </View>
          </View>

          <LinearGradient
            colors={["#313131", "#0c0c0c"]}
            style={styles.profileBuysInfoBox}
          >
            <View style={styles.buyOneBoxStyle}>
              <Text style={styles.buyNumsText}>
                {data && data.shop ? data.total_sale : data?.total_purchase}
              </Text>
              <Text style={styles.buyStringText}>покупок</Text>
              <Image style={styles.buyBoxImg} source={profileScreenBuyIcon} />
            </View>
            <View style={styles.buyOneBoxStyle}>
              <Text style={styles.buyNumsText}>
                {data && data.shop
                  ? data.total_sale_amount
                  : data?.total_purchase_amount}
              </Text>
              <Text style={styles.buyStringText}>
                общая сумма {"\n"} покупок
              </Text>
              <Image
                style={styles.buyBoxImg}
                source={profileScreenBuysNumIcon}
              />
            </View>
            <View style={styles.buyLastBoxStyle}>
              {data && data.shop ? (
                <>
                  <Text style={styles.buyNumsText}>
                    {data && data.total_given_cashback}
                  </Text>
                  <Text style={styles.buyStringText}>выдано кэшбэка</Text>
                </>
              ) : (
                <>
                  <Text style={styles.buyNumsText}>{data && data.balance}</Text>
                  <Text style={styles.buyStringText}>на счету</Text>
                </>
              )}
              <Image
                style={styles.buyBoxImg}
                source={profileScreenCashsNumIcon}
              />
            </View>
          </LinearGradient>
        </View>
        {data && !data.shop ? (
          <View>
            <View style={{ marginTop: "5%" }}>
              <MyBuys purchase={purchase ? purchase : null} />
            </View>

            <TouchableOpacity
              style={styles.getCashBtn}
              onPress={() => navigation.navigate("GetMoneyScreen")}
            >
              <Text style={styles.btnTxt}>Pullarni chiqarib olish</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View
          style={{
            marginTop: "5%",
            marginBottom: "5%",
          }}
        >
          <ProfileScreenMenu data={data} />
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
    marginTop: Platform.OS === "ios" ? scalePoint * 46 : 44,
    height: scalePoint * 23,
  },
  accountImgFirstShadowCircle: {
    width: scalePoint * 142,
    height: scalePoint * 142,
    backgroundColor: "#fff",
    borderRadius: scalePoint * 142 * 0.5,
    justifyContent: "center",
    shadowColor: "#000",
    shadowRadius: 13,
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  accountImgSecondShadowCircle: {
    flexDirection: "row",
    width: scalePoint * 124,
    height: scalePoint * 124,
    backgroundColor: "#fff",
    borderRadius: scalePoint * 124 * 0.5,
    justifyContent: "center",
    shadowColor: "#000",
    shadowRadius: 13,
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: "#fff",
    elevation: 8,
  },
  accountImgThirdShadowCircle: {
    shadowColor: "#000",
    shadowRadius: 13,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: -1,
      height: 0,
    },
    elevation: 8,
    backgroundColor: "#fff",
    borderRadius: scalePoint * 107 * 0.5,
    width: scalePoint * 107,
    height: scalePoint * 107,
    alignItems: "center",
    alignSelf: "center",
  },
  profileSettingsBtnBox: {
    position: "absolute",
    zIndex: 999,
    left: "84%",
    top: "6%",
  },
  profileSettingsBtn: {
    width: scalePoint * 34,
    height: scalePoint * 34,
    borderRadius: scalePoint * 34 * 0.5,
    backgroundColor: "#01C65C",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfoBox: {
    alignItems: "center",
    marginBottom: "5%",
    marginTop: "10%",
  },
  profileNameTxt: {
    marginTop: "5%",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
  },
  profileBuysInfoBox: {
    width: "100%",
    height: scalePoint * 80,
    backgroundColor: "#313131",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  buyOneBoxStyle: {
    width: "33%",
    height: scalePoint * 70,
    marginTop: "5%",
    marginBottom: "5%",
    borderRightWidth: 1,
    borderColor: "#636363",
    alignItems: "center",
    justifyContent: "center",
  },
  buyLastBoxStyle: {
    width: "33%",
    height: scalePoint * 70,
    marginTop: "5%",
    marginBottom: "5%",
    borderColor: "#636363",
    alignItems: "center",
    justifyContent: "center",
  },
  buyNumsText: {
    fontSize: 20,
    lineHeight: 24,
    color: "#fff",
  },
  buyStringText: {
    fontSize: 10,
    lineHeight: 12,
    color: "#fff",
    textAlign: "center",
  },
  buyBoxImg: {
    width: scalePoint * 50,
    height: scalePoint * 50,
    position: "absolute",
    top: "60%",
  },
  getCashBtn: {
    marginTop: "10%",
    width: scalePoint * 168,
    height: scalePoint * 45,
    borderWidth: 1,
    borderColor: "#01C65C",
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: {
    fontSize: 14,
    lineHeight: 16,
    color: "#01C65C",
  },
});
