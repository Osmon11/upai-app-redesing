import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { CheckBox, Separator } from "react-native-btr";

import phoneIcon from "../../../Images/PhoneIcon.png";
import passIcon from "../../../Images/PassIcon.png";
import { AGREEMENT, API } from "../../../config";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-community/async-storage";
import DialogAlert from "../../../Common/DialogAlert";
import { regReferal } from "./Login";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;

export default function RegistrationScreen({ open }) {
  const [value, numberInput] = useState("Введите номер");
  const [value1, passInput] = useState("Введите код с сообщения");
  const [value2, rePassInput] = useState("Придумайте пароль");
  const [num, setNum] = useState("996");
  const [numPhone, setNumPhone] = useState("996");
  const [pin, setPin] = useState("");
  const [pass2, setPass2] = useState("");
  const [getpin, setPinInput] = useState(false);
  const [answerModal, setAnswerModal] = useState(false);
  const [modalTxt, setModalTxt] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const navigation = useNavigation();

  const getToken = async () => {
    let data = {
      phone: numPhone,
      password: pass2,
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
      if (json.access) {
        await AsyncStorage.setItem("token", json.access);
        navigation.navigate("ProfileStackScreen", {
          screen: "ProfileScreen",
        });
      } else {
        setAnswerModal(true);
        setModalTxt(json.detail);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const getNum = (e) => {
    let value = e.replace(/\s+/g, "");
    let isBackspace = e === "Backspace";

    if (
      (e.length === 1 && /^[^\d\s]+$/.test(e)) ||
      (!isBackspace && value.length === 13)
    ) {
      return false;
    }

    setNum(
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
    setNumPhone(value.replace(/\s/g, ""));
  };

  const getPinCode = async () => {
    if (!getpin) {
      const data = {
        phone: numPhone,
        password: pass2,
      };
      try {
        const response = await fetch(API + "users/pre-register/", {
          method: "POST", // или 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
        });
        const json = await response.json();
        if (json.message) {
          setAnswerModal(true);
          setModalTxt(json.message);
          setPinInput(true);
        } else if (json.phone) {
          setAnswerModal(true);
          setModalTxt(json.phone[0]);
        } else if (json.password) {
          setAnswerModal(true);
          setModalTxt(json.password[0]);
        } else if (json.error) {
          setAnswerModal(true);
          setModalTxt(json.error);
        }
      } catch (error) {
        console.error("Ошибка:", error);
      }
    } else {
      const data = {
        phone: numPhone,
        code: pin,
        password: pass2,
      };
      try {
        const response = await fetch(API + "users/register/", {
          method: "POST", // или 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
        });
        const json = await response.json();
        if (json.message) {
          getToken();
          registerForPushNotificationsAsync().then((token) => {
            registerTokenFromBack(token);
          });
        } else if (json.code) {
          setAnswerModal(true);
          setModalTxt(json.code[0]);
        } else if (json.phone) {
          setAnswerModal(true);
          setModalTxt(json.phone[0]);
        } else if (json.password) {
          setAnswerModal(true);
          setModalTxt(json.password[0]);
        } else if (json.error) {
          setAnswerModal(true);
          setModalTxt(json.error);
        }

        setPinInput(false);
        setPin("");
      } catch (error) {
        console.error("Ошибка:", error);
      }
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <Image style={styles.textInputsIcon} source={phoneIcon} />
          <TextInput
            style={styles.textInputStyle}
            keyboardType='number-pad'
            maxLength={19}
            value={num}
            placeholder={value}
            onChangeText={(e) => getNum(e)}
          />
        </View>

        {getpin && (
          <View style={styles.inputBox}>
            <Image style={styles.textInputsIcon} source={passIcon} />
            <TextInput
              style={styles.textInputStyle}
              placeholder={value1}
              keyboardType='number-pad'
              value={pin}
              maxLength={4}
              onChangeText={(text) => setPin(text)}
            />
          </View>
        )}
        <View style={styles.inputBox}>
          <Image style={styles.textInputsIcon} source={passIcon} />
          <TextInput
            style={styles.textInputStyle}
            secureTextEntry={true}
            placeholder={value2}
            value={pass2}
            onChangeText={(e) => setPass2(e)}
          />
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          marginTop: "5%",
        }}
      >
        {open && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "2%",
            }}
          >
            <CheckBox
              checked={toggleCheckBox}
              color={"#225196"}
              onPress={(newValue) => setToggleCheckBox(!toggleCheckBox)}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => Linking.openURL(AGREEMENT)}
            >
              <Text
                style={{
                  borderBottomColor: "#225196",
                  borderBottomWidth: 1,
                  color: "#225196",
                  marginLeft: 5,
                }}
              >
                Пользовательское соглашение
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          // onPress={() => navigation.navigate("PrivacyPolicyScreen")}
          style={!toggleCheckBox ? styles.btnSignInOff : styles.btnSignIn}
          onPress={getPinCode}
          disabled={!toggleCheckBox}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              lineHeight: 19,
            }}
          >
            {getpin ? "Ro’yxatdan o’tish" : "Получить пин"}
          </Text>
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

export const hasDevices = async () => {
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(API + "devices/", {
    method: "GET", // или 'PUT'
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();

  return json.length;
};

export const registerTokenFromBack = async (id) => {
  const token = await AsyncStorage.getItem("token");
  let data = {
    registration_id: id,
    type: Platform.OS === "android" ? "android" : "ios",
  };
  const response = await fetch(API + "devices/", {
    method: "POST", // или 'PUT'
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
  });
};

export async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("notification token", token);
  } else {
    console.log("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
  },
  btnSignIn: {
    width: scalePoint * 233,
    height: scalePoint * 45,
    backgroundColor: "#225196",
    alignItems: "center",
    borderRadius: 30,
    justifyContent: "center",
  },
  btnSignInOff: {
    width: scalePoint * 233,
    height: scalePoint * 45,
    backgroundColor: "grey",
    alignItems: "center",
    borderRadius: 30,
    justifyContent: "center",
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
});
