import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { API } from "../../../config";
import AsyncStorage from "@react-native-community/async-storage";
import DialogAlert from "../../../Common/DialogAlert";
export default function SetPass() {
  const [value, numberInput] = useState("Старый пароль");
  const [value1, passInput] = useState("Новый пароль");
  const [value2, rePassInput] = useState("Повторите новый пароль");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [reNewPass, setReNewPass] = useState("");
  const [answerModal, setAnswerModal] = useState(false);
  const [modalTxt, setModalTxt] = useState();

  const changePass = async () => {
    if (newPass == reNewPass) {
      let data = {
        old_password: oldPass,
        new_password: newPass,
      };
      const token = await AsyncStorage.getItem("token");
      try {
        const response = await fetch(API + "users/change-password/", {
          method: "PUT", // или 'PUT'
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
        });
        const json = await response.json();
        if (json.message) {
          setAnswerModal(true);
          setModalTxt(json.message);
        } else if (json.new_password) {
          setAnswerModal(true);
          setModalTxt(json.new_password[0]);
        } else if (json.old_password) {
          setAnswerModal(true);
          setModalTxt(json.old_password[0]);
        }
      } catch (error) {
        console.error("Ошибка:", error);
      }
    } else {
      setAnswerModal(true);
      setModalTxt("Пароли не совпадают");
    }
  };
  return (
    <View>
      <View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => numberInput(text)}
            secureTextEntry={true}
            placeholder={value}
            value={oldPass}
            onChangeText={(text) => setOldPass(text)}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => passInput(text)}
            secureTextEntry={true}
            placeholder={value1}
            value={newPass}
            onChangeText={(text) => setNewPass(text)}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => rePassInput(text)}
            secureTextEntry={true}
            placeholder={value2}
            value={reNewPass}
            onChangeText={(text) => setReNewPass(text)}
          />
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: "5%",
        }}
      >
        <TouchableOpacity style={styles.btnSignIn} onPress={changePass}>
          <Text style={styles.btnTxt}>Изменить пароль</Text>
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
  btnSignIn: {
    height: 45,
    backgroundColor: "#01C65C",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  inputBox: {
    width: "95%",
    marginTop: 10,
    alignSelf: "center",
    height: 45,
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
    fontSize: 14,
    lineHeight: 16,
    paddingLeft: "5%",
    paddingRight: "5%",
  },
});
