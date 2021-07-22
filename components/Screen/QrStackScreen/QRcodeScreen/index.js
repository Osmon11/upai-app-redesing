import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Card } from "react-native-shadow-cards";

import Header from "../../../Common/Header";
import ProfileInfo from "../../../Common/PropfileInfo";
import AsyncStorage from "@react-native-community/async-storage";

import { API } from "../../../config";
import { useNavigation } from "@react-navigation/native";
import QRreader from "./QRreader";
import AnimatedLoader from "react-native-animated-loader";

const window = Dimensions.get("window");
const height = Dimensions.get("window").height * 0.85;
const scalePoint = window.width / 380;

export default function QrCodeScreen({ route }) {
  const navigation = useNavigation();
  const [data, setData] = React.useState();
  const [businessStatus, setBusinessStatus] = React.useState(false);
  const [viewLoader, setViewLoader] = React.useState(true);
  const [cashback, setCashback] = React.useState();

  React.useEffect(() => {
    getFullInfo();
    if (route?.params && route?.params.cashback != undefined) {
      setCashback(route?.params.cashback);
    }
    const unsubscribe = navigation.addListener("focus", () => {
      getFullInfo();
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);
  const getFullInfo = async () => {
    const token = await AsyncStorage.getItem("token");
    const resp = await fetch(API + "users/profile/", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    setData(data);

    if (data?.shop) {
      setBusinessStatus(true);
      setTimeout(() => {
        setViewLoader(false);
      }, 500);
    } else {
      setBusinessStatus(false);
      setTimeout(() => {
        setViewLoader(false);
      }, 500);
    }
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
      <View style={{ width: "100%", flex: 1 }}>
        {!businessStatus && (
          <View style={styles.headerBox}>
            <Header />
          </View>
        )}

        {businessStatus ? (
          <View style={styles.qrReaderBox}>
            <QRreader cash={cashback} />
          </View>
        ) : (
          <View style={styles.contentBox}>
            <View style={styles.visibleBox}>
              <View style={styles.profileBox}>
                <ProfileInfo />
              </View>
              <Card style={styles.shadowCard}>
                <View style={styles.qrBox}>
                  <Text style={styles.mainTxt}>Сканировать QR</Text>
                  <View style={styles.qrImageBox}>
                    <QRCode
                      size={scalePoint * 123}
                      color={"#225196"}
                      value={data ? data.phone : "oops"}
                    />
                  </View>
                  <View style={styles.cardTxtBox}>
                    <Text style={styles.cardTxt}>
                      Предъявите QR-код сотруднику магазина на кассе, для
                      начисления бонусных баллов
                    </Text>
                  </View>
                </View>
              </Card>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  headerBox: {
    width: "95%",
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? "15%" : "8%",
    height: scalePoint * 23,
  },
  profileBox: {
    marginTop: scalePoint * 7,
    width: "100%",
    marginBottom: scalePoint * 54,
  },
  contentBox: {
    width: "100%",
    flex: 1,
  },
  mainTxt: {
    fontSize: 20,
    lineHeight: 24,
    marginTop: "10%",
  },
  visibleBox: {
    width: "100%",
  },
  shadowCard: {
    width: scalePoint * 325,
    height: scalePoint * 376,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: scalePoint * 10,
  },
  qrBox: {
    width: scalePoint * 325,
    height: scalePoint * 376,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  qrImageBox: {
    width: scalePoint * 123,
    height: scalePoint * 123,
    alignSelf: "center",
    marginTop: scalePoint * 51,
  },
  cardTxtBox: {
    width: "85%",
    alignItems: "center",
    marginTop: scalePoint * 37,
  },
  cardTxt: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#515151",
  },
  qrReaderBox: {
    width: "100%",
    height: height,
    marginTop: "15%",
  },
});
