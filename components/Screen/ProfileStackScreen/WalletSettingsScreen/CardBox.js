import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Card } from "react-native-shadow-cards";

import { useNavigation } from "@react-navigation/native";

import qrCodeIcon from "../../../Images/qrCodeIcon.png";
import settingIcon from "../../../Images/walletScreenSettingsIcon.png";
import AsyncStorage from "@react-native-community/async-storage";
import { API } from "../../../config";
import QRCode from "react-native-qrcode-svg";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;

export default function CardBox() {
  const navigation = useNavigation();
  const [openedCard, setOpenedCard] = useState(true);

  const [value, setValue] = useState("0000 0000 0000 0000");
  const [numberCard, setNumberCard] = useState("");
  const [data, setData] = useState();
  React.useEffect(() => {
    getFullInfo();
  }, []);
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
  };
  const changePersonalInfo = async () => {
    const token = await AsyncStorage.getItem("token");
    let data = {
      card: numberCard,
    };
    try {
      const response = await fetch(API + "users/profile/", {
        method: "PATCH", // или 'PUT'
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
      });
      const json = await response.json();
      getFullInfo();
      setOpenedCard(true);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Card style={styles.cardBox}>
        <View style={openedCard ? styles.openedCardStyle : styles.cardStyle}>
          <LinearGradient
            style={styles.openedLinerGradient}
            colors={["#245398", "#75AAF8"]}
            end={{ x: 2, y: 2 }}
            locations={[0.01, 0.9]}
          >
            <View
              style={{
                padding: "5%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: scalePoint * 80,
                    height: scalePoint * 80,
                  }}
                  onPress={() => navigation.navigate("QrCodeScreen")}
                >
                  <QRCode
                    color={"#fff"}
                    backgroundColor={"transparent"}
                    value={data ? data.phone : "oops"}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.cardNumberTxt}>
                  {/* {data ? data.card : null} */}
                </Text>
                <Text style={styles.cardNumberTxt}>
                  {data ? data.balance : 0} сом
                </Text>
              </View>
              <View>
                <Text style={styles.cardOwnerTxt}>
                  {data ? data.fullname : null}
                </Text>
                <Text style={styles.cardOwnerID}>
                  {data ? data.phone : null}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cardBox: {
    width: "98%",
    height: scalePoint * 171,
    borderRadius: 10,
  },
  cardStyle: {
    width: "100%",
    height: scalePoint * 171,
    borderRadius: 15,
  },
  openedCardStyle: {
    width: "100%",
    height: scalePoint * 171,
    borderRadius: 15,
  },
  openedLinerGradient: {
    width: "100%",
    height: scalePoint * 185,
    borderRadius: 10,
  },
  linerGradient: {
    width: "100%",
    height: scalePoint * 171,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  cardNumberTxt: {
    fontSize: 20,
    lineHeight: 23,
    color: "#fff",
  },
  cardOwnerTxt: {
    fontSize: 20,
    lineHeight: 23,
    color: "#fff",
  },
  cardOwnerID: {
    fontSize: 14,
    lineHeight: 16,
    color: "#fff",
    paddingBottom: "5%",
  },
  textInputBox: {
    marginTop: "10%",
    width: "90%",
    height: 45,
    borderWidth: 1,
    borderColor: "rgba(34, 81, 150, 0.43)",
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  textInputStyle: {
    marginLeft: "5%",
    fontSize: 14,
    lineHeight: 16,
    color: "#225196",
  },
  btnStyle: {
    marginTop: "10%",
    width: 120,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#01C65C",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    fontSize: 14,
    lineHeight: 16,
    color: "#fff",
  },
});
