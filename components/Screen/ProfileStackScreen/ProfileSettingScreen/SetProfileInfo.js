import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { API } from "../../../config";

import emptyProfileAccountImg from "../../../Images/emptyProfileAccountImg.png";
import addPhotoIcon from "../../../Images/addPhotoIcon.png";
import { ActionSheet, Root } from "native-base";
import * as ImagePicker from "expo-image-picker";
import request from "superagent";
import AsyncStorage from "@react-native-community/async-storage";
import DialogAlert from "../../../Common/DialogAlert";
import AnimatedLoader from "react-native-animated-loader";
import { CommonActions, useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const scalePoint = width / 380;

export default function SetProfileInfo() {
  const [value, numberInput] = useState("Введите свое имя и фамилию");
  const [value1, passInput] = useState("Введите телефонный номер");
  const [value2, rePassInput] = useState("Введите свою почту");
  const [data, setData] = useState();
  const [answerModal, setAnswerModal] = useState(false);
  const [modalTxt, setModalTxt] = useState();
  const [viewLoader, setViewLoader] = React.useState(false);
  React.useEffect(() => {
    getFullInfo();
  }, []);
  const navigation = useNavigation();
  const takePhotoFromCamera = async () => {
    let permissionResult = ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      setAnswerModal(true);
      setModalTxt("Требуется разрешение на доступ к фотографиям");
      return;
    }
    let pickerResult = await ImagePicker.launchCameraAsync();
    pickerResult.cancelled ? null : changePhoto(pickerResult);
  };
  const choosePhotoFromGallery = async () => {
    let permissionResult =
      await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      setAnswerModal(true);
      setModalTxt("Требуется разрешение на доступ к фотографиям");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    pickerResult.cancelled ? null : changePhoto(pickerResult);
  };
  const addPhotoToAccount = () => {
    const btns = ["Сделать фото", "Выбрать из галереи", "Отмена"];
    ActionSheet.show(
      {
        options: btns,
        cancelButtonIndex: 2,
        title: "Выберите способ...",
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            takePhotoFromCamera();
            break;
          case 1:
            choosePhotoFromGallery();
            break;
          default:
            break;
        }
      }
    );
  };
  const changePhoto = async (photo) => {
    const token = await AsyncStorage.getItem("token");
    const data = new FormData();
    setViewLoader(true);
    data.append("avatar", {
      name: "avatar.png",
      type: photo.type + "/jpeg",
      uri:
        Platform.OS === "android"
          ? photo.uri
          : photo.uri.replace("file://", ""),
    });

    try {
      const response = await fetch(API + "users/profile/", {
        method: "PATCH", // или 'PUT'
        headers: {
          Authorization: "Bearer " + token,
        },
        body: data, // данные могут быть 'строкой' или {объектом}!
      });
      const json = await response.json();
      setViewLoader(false);
      setAnswerModal(true);
      setModalTxt("Фото успешно изменено");
      getFullInfo();
    } catch (error) {
      setViewLoader(false);
      console.error("Ошибка:", error);
    }
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
    setData(data);
  };
  const setText = (prop) => (text) => {
    setData({ ...data, [prop]: text });
  };
  const changePersonalInfo = async () => {
    const token = await AsyncStorage.getItem("token");
    delete data.avatar;
    delete data.shop;
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
      if (json.avatar && json.fullname == undefined) {
        setAnswerModal(true);
        setModalTxt("Avatar: " + json.avatar);
      } else if (json.fullname && json.avatar == undefined) {
        setAnswerModal(true);
        setModalTxt("Имя " + json.fullname);
      } else if (json.phone && json.fullname == undefined) {
        setAnswerModal(true);
        setModalTxt("Телефон " + json.phone);
      } else if (json.email && json.fullname == undefined) {
        setAnswerModal(true);
        setModalTxt("Почта " + json.email);
      } else {
        setAnswerModal(true);
        setModalTxt("Данные сохранены");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View>
        <View>
          <View
            style={{
              alignSelf: "center",
            }}
          >
            <AnimatedLoader
              visible={viewLoader}
              overlayColor='rgba(255,255,255,0.7)'
              source={require("../../../Common/loader.json")}
              animationStyle={{ width: 100, height: 100, resizeMode: "cover" }}
              speed={1}
            >
              <Text>Загрузка...</Text>
            </AnimatedLoader>
            <View style={styles.accountImgFirstShadowCircle}>
              <View style={styles.accountImgSecondShadowCircle}>
                <View style={styles.accountImgThirdShadowCircle}>
                  <Image
                    style={{
                      width: scalePoint * 107,
                      height: scalePoint * 107,
                      borderRadius: scalePoint * 107 * 0.5,
                    }}
                    source={
                      data?.avatar !== null
                        ? { uri: data?.avatar }
                        : emptyProfileAccountImg
                    }
                  />
                </View>
                <View style={styles.addPhotoBox}>
                  <TouchableOpacity
                    style={styles.addPhotoIconBox}
                    onPress={addPhotoToAccount}
                  >
                    <Image
                      style={{
                        width: scalePoint * 15,
                        height: scalePoint * 15,
                        resizeMode: "contain",
                      }}
                      source={addPhotoIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.textInputStyle}
              placeholder={value}
              value={data ? data.fullname : ""}
              onChangeText={setText("fullname")}
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.textInputStyle}
              keyboardType='number-pad'
              placeholder={value1}
              value={data ? data.phone : ""}
              maxLength={12}
              onChangeText={setText("phone")}
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.textInputStyle}
              placeholder={value2}
              value={data ? data.email : ""}
              onChangeText={setText("email")}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: "5%",
          }}
        >
          <TouchableOpacity style={styles.btnSignIn}>
            <Text style={styles.btnTxt} onPress={() => changePersonalInfo()}>
              Сохранить
            </Text>
          </TouchableOpacity>
        </View>
        <DialogAlert
          answerModal={answerModal}
          setAnswerModal={setAnswerModal}
          message={modalTxt}
          funcOk={() => {
            setAnswerModal(false);
            navigation.dispatch(
              CommonActions.reset({ routes: [{ name: "ProfileScreen" }] })
            );
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  addPhotoBox: {
    position: "absolute",
    zIndex: 999,
    left: "85%",
    top: "6%",
  },
  addPhotoIconBox: {
    width: scalePoint * 34,
    height: scalePoint * 34,
    borderRadius: scalePoint * 34 * 0.5,
    backgroundColor: "#ff6b00",
    justifyContent: "center",
    alignItems: "center",
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
  btnSignIn: {
    height: 45,
    backgroundColor: "#ff6b00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  inputBox: {
    flex: 1,
    width: "95%",
    alignSelf: "center",
    marginTop: "5%",
    height: scalePoint * 45,
    borderColor: "#225196",
    borderWidth: 1,
    flexDirection: "row",
    borderRadius: 10,
  },
  textInputStyle: {
    width: "100%",
    height: 40,
    marginLeft: "5%",
    fontSize: 16,
    lineHeight: 18,
    alignSelf: "center",
  },
  btnTxt: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 19,
    paddingLeft: "5%",
    paddingRight: "5%",
  },
});
