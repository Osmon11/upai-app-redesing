import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

import phoneIcon from "../../../Images/PhoneIcon.png";
import passIcon from "../../../Images/PassIcon.png";
import { API } from "../../../config";
import AsyncStorage from "@react-native-community/async-storage";
import DialogAlert from "../../../Common/DialogAlert";
import {
  hasDevices,
  registerForPushNotificationsAsync,
  registerTokenFromBack,
} from "./Registration";

export const regReferal = async (referrer, token) => {
  let data = await fetch(API + "users/referral/" + referrer + "/", {
    method: "POST", // или 'PUT'
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => data)
    .catch((error) => {
      console.error("Ошибка:", error);
    });
  AsyncStorage.removeItem("referrer");
};

const window = Dimensions.get("window");
const scalePoint = window.width / 380;
export default function Login() {
  const navigation = useNavigation();

  const [value, numbersInput] = useState("Введите номер");
  const [value1, passInput] = useState("Parolni kiriting");
  const [phone, setPhone] = useState("996");
  const [prettyPhoneNum, setPrettyPhoneNum] = useState("996");
  const [pass, setPass] = useState("");
  const [answerModal, setAnswerModal] = useState(false);
  const [modalTxt, setModalTxt] = useState(false);

  const login = async () => {
    let data = {
      phone: phone,
      password: pass,
    };
    try {
      const response = await fetch(API + "users/token/", {
        method: "POST", // или 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
      });
      const json = await response.json();
      const referrer = await AsyncStorage.getItem("referrer");

      if (Boolean(referrer) && Boolean(json.access)) {
        regReferal(referrer, json.access);
      }

      if (json.phone) {
        setAnswerModal(true);
        setModalTxt("Телефон: " + json.password);
      } else if (json.password) {
        setAnswerModal(true);
        setModalTxt("Parol: " + json.password);
      } else if (json.access) {
        await AsyncStorage.setItem("token", json.access);
        navigation.navigate("ProfileStackScreen", {
          screen: "ProfileScreen",
        });
        if (hasDevices() === 0) {
          registerForPushNotificationsAsync().then((notificationToken) => {
            registerTokenFromBack(notificationToken);
          });
        }
      } else if (json.error) {
        setAnswerModal(true);
        setModalTxt(json.error);
      } else {
        setAnswerModal(true);
        setModalTxt(json.detail);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };
  const getPhoneNum = (text) => {
    let value = text;
    setPrettyPhoneNum(
      value
        .split("")
        .reverse()
        .join("")
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        .split("")
        .reverse()
        .join("")
        .trim()
    );
    setPhone(value.replace(/\s/g, ""));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <Image style={styles.textInputsIcon} source={phoneIcon} />
        <TextInput
          style={styles.textInputStyle}
          keyboardType='number-pad'
          placeholder={value}
          onFocus={() => {}}
          value={prettyPhoneNum}
          maxLength={15}
          onChangeText={(text) => getPhoneNum(text)}
        />
      </View>
      <View style={styles.inputBox}>
        <Image style={styles.textInputsIcon} source={passIcon} />
        <TextInput
          style={styles.textInputStyle}
          secureTextEntry={true}
          placeholder={value1}
          minLength={8}
          value={pass}
          onChangeText={(text) => setPass(text)}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: "5%",
        }}
      >
        <TouchableOpacity
          style={styles.btnSignIn}
          // onPress={() => navigation.navigate("ProfileScreen")}
          onPress={() => login()}
        >
          <Text style={styles.btnTxt}>Kirish</Text>
        </TouchableOpacity>
      </View>
      <DialogAlert
        answerModal={answerModal}
        setAnswerModal={setAnswerModal}
        message={modalTxt}
        funcOk={() => setAnswerModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
  },
  btnSignIn: {
    width: scalePoint * 163,
    height: scalePoint * 45,
    backgroundColor: "#225196",
    alignItems: "center",
    borderRadius: 30,
  },
  inputBox: {
    width: "100%",
    marginTop: "5%",
    height: 45,
    borderColor: "#225196",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textInputsIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  textInputStyle: {
    width: "80%",
    height: 40,
    marginLeft: "5%",
    fontSize: 16,
    lineHeight: 18,
    fontFamily: "SfPro",
    color: "#225196",
  },
  btnTxt: {
    marginTop: "8%",
    color: "#fff",
    fontSize: 16,
    lineHeight: 19,
  },
});
