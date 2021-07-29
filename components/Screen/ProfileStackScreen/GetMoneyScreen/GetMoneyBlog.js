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
import CheckBox from "react-native-check-box";
import { Card } from "react-native-shadow-cards";

import arrowDownIcon from "../../../Images/arrowDownIcon.png";
import oWalletLogo from "../../../Images/OwalletLogo.png";
import MegaWalletLogo from "../../../Images/MegaWalletLogo.png";
import BeelineWalletLogo from "../../../Images/BeelineWalletLogo.png";
import Success from "./Success";
import AsyncStorage from "@react-native-community/async-storage";
import { API } from "../../../config";
import QRCode from "react-native-qrcode-svg";
import DialogAlert from "../../../Common/DialogAlert";
const window = Dimensions.get("window");
const scalePoint = window.width / 380;

export default function GetMoneyBlog() {
  const [success, setSuccess] = useState(true);
  const [choiceIsO, setChoiceIsO] = useState(false);
  const [choiceIsBeeline, setChoiceIsBeeline] = useState(false);
  const [choiceIsMega, setChoiceIsMega] = useState(false);

  const [value1, setValue1] = useState("Введите сумму");
  const [value2, setValue2] = useState("Электронный кошелек");
  const [isPressed, setIsPressed] = useState(false);
  const [data, setData] = useState();
  const [sum, setSum] = useState("");
  const [phone, setPhone] = useState();
  const [otvet, setOtvet] = useState();
  const [answerModal, setAnswerModal] = useState(false);
  const [modalTxt, setModalTxt] = useState();
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

  const withdrawal = async () => {
    const token = await AsyncStorage.getItem("token");
    const data = {
      amount: sum,
      method: choiceIsO
        ? "o_money"
        : choiceIsBeeline
        ? "balance"
        : choiceIsMega
        ? "mega_pay"
        : null,
      requisite: "996" + phone,
    };
    try {
      const response = await fetch(API + "users/withdrawal/", {
        method: "POST", // или 'PUT'
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
      });
      const json = await response.json();
      // if(json.requisite == data.requisite){
      //   setOtvet(json)
      //   setSuccess(!success)
      // }
      if (json.requisite && typeof json?.requisite != "string") {
        setAnswerModal(true);
        setModalTxt(json?.requisite[0]);
      } else if (json.amount && typeof json.amount != "string") {
        setAnswerModal(true);
        setModalTxt(json.amount[0]);
      } else if (json.method && typeof json.method != "string") {
        setAnswerModal(true);
        setModalTxt("Выберите кошелек");
      } else if (json.error) {
        setAnswerModal(true);
        setModalTxt(json.error);
      } else {
        setOtvet(json);
        setSuccess(!success);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={
          success ? { display: "none" } : { marginLeft: "5%", marginTop: "5%" }
        }
      >
        <Success data={otvet} />
      </View>
      <View style={success ? styles.notSuccessBox : { display: "none" }}>
        <Card style={styles.openedCardStyle}>
          <LinearGradient
            style={styles.openedLinerGradient}
            colors={["#245398", "#75AAF8"]}
            end={{ x: 2, y: 2 }}
            locations={[0.01, 0.9]}
          >
            <View style={styles.cardContentBox}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity style={styles.qrCodeIconBox}>
                  <QRCode
                    color={"#fff"}
                    backgroundColor={"transparent"}
                    value={data ? data.phone : "oops"}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.numTxtBox}>
                <Text style={styles.cardNumberTxt}>
                  {/* {data ? data.card : null} */}
                </Text>
                <Text style={styles.cardNumberTxt}>
                  {data ? data.balance : 0} сом
                </Text>
              </View>
              <Text style={styles.cardOwnerTxt}>
                {data ? data.fullname : null}
              </Text>
              <Text style={styles.cardOwnerID}>{data ? data.phone : null}</Text>
            </View>
          </LinearGradient>
        </Card>

        <View style={{ display: "flex" }}>
          <Card style={styles.getMoneyCard}>
            <Text style={styles.getMoneyTxt}>Вывести деньги</Text>
            <Text style={styles.getMoneyTxtBottom}>
              * комисия 10% от вывода
            </Text>
            <View
              style={
                isPressed ? styles.pressedChooseBtnBox : styles.chooseBtnBox
              }
            >
              <TouchableOpacity
                onPress={() => setIsPressed(!isPressed)}
                style={{ flexDirection: "row" }}
              >
                <Text style={styles.chooseTxt}>Электронный кошелек</Text>
                <Image source={arrowDownIcon} style={styles.arrowDown} />
              </TouchableOpacity>

              <View
                style={
                  isPressed ? styles.electronWalletsBox : { display: "none" }
                }
              >
                <View style={styles.checkboxesBox}>
                  <View style={styles.oneCheckboxBox}>
                    <Image
                      source={oWalletLogo}
                      style={{
                        width: scalePoint * 19,
                        height: scalePoint * 19,
                        resizeMode: "contain",
                      }}
                    />
                    <CheckBox
                      style={{ marginTop: "5%" }}
                      onClick={() => {
                        setChoiceIsO(!choiceIsO);
                        setChoiceIsBeeline(false);
                        setChoiceIsMega(false);
                      }}
                      checkBoxColor={"#225196"}
                      isChecked={choiceIsO}
                      leftText={"CheckBox"}
                    />
                  </View>
                  <View style={styles.oneCheckboxBox}>
                    <Image
                      source={BeelineWalletLogo}
                      style={{
                        width: scalePoint * 44,
                        height: scalePoint * 18,
                        resizeMode: "contain",
                      }}
                    />
                    <CheckBox
                      style={{ marginTop: "5%" }}
                      onClick={() => {
                        setChoiceIsBeeline(!choiceIsBeeline);
                        setChoiceIsO(false);
                        setChoiceIsMega(false);
                      }}
                      checkBoxColor={"#225196"}
                      isChecked={choiceIsBeeline}
                      leftText={"CheckBox"}
                    />
                  </View>
                  <View style={styles.oneCheckboxBox}>
                    <Image
                      source={MegaWalletLogo}
                      style={{
                        width: scalePoint * 65,
                        height: scalePoint * 17,
                        resizeMode: "contain",
                      }}
                    />
                    <CheckBox
                      style={{ marginTop: "5%" }}
                      onClick={() => {
                        setChoiceIsBeeline(false);
                        setChoiceIsO(false);
                        setChoiceIsMega(!choiceIsMega);
                      }}
                      checkBoxColor={"#225196"}
                      isChecked={choiceIsMega}
                      leftText={"CheckBox"}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.textInputBox}>
              <TextInput
                style={styles.textInputStyle}
                keyboardType='number-pad'
                placeholder='Введите реквизит без "996" и без "0"'
                maxLength={9}
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />
            </View>
            <View style={styles.textInputBox}>
              <TextInput
                style={styles.textInputStyle}
                keyboardType='number-pad'
                placeholder={value1}
                value={sum}
                onChangeText={(text) => setSum(text)}
              />
            </View>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => withdrawal()}
            >
              <Text style={styles.btnTxt}>Вывести деньги</Text>
            </TouchableOpacity>
          </Card>
        </View>
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
    flex: 1,
    backgroundColor: "#fff",
  },
  notSuccessBox: {
    marginTop: "5%",
    width: "95%",
    alignSelf: "center",
  },
  openedCardStyle: {
    width: "100%",
    height: scalePoint * 185,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  openedLinerGradient: {
    width: "100%",
    height: scalePoint * 185,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  cardContentBox: {
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
    paddingBottom: "5%",
  },
  qrCodeIconBox: {
    width: scalePoint * 80,
    height: scalePoint * 80,
    resizeMode: "contain",
  },
  qrIcon: {
    width: scalePoint * 80,
    height: scalePoint * 80,
  },
  numTxtBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardNumberTxt: {
    marginTop: "3%",
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
  },
  getMoneyCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  getMoneyTxt: {
    fontSize: 20,
    marginTop: "5%",
    marginLeft: "5%",
  },
  getMoneyTxtBottom: {
    fontSize: 12,
    marginTop: "0.5%",
    marginLeft: "5%",
    color: "#a7b9a6",
  },
  textInputBox: {
    marginTop: "5%",
    width: "90%",
    height: scalePoint * 45,
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
  chooseBtnBox: {
    marginTop: "10%",
    width: "90%",
    height: scalePoint * 45,
    borderWidth: 1,
    borderColor: "rgba(34, 81, 150, 0.43)",
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  pressedChooseBtnBox: {
    marginTop: "10%",
    width: "90%",
    height: scalePoint * 113,
    borderWidth: 1,
    borderColor: "rgba(34, 81, 150, 0.43)",
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  chooseTxt: {
    width: "87%",
    marginLeft: "5%",
    fontSize: 14,
    lineHeight: 16,
    color: "#a7b9d5",
  },
  arrowDown: {
    width: scalePoint * 18,
    height: scalePoint * 18,
    resizeMode: "contain",
    marginRight: "5%",
  },
  electronWalletsBox: {
    width: "100%",
  },
  checkboxesBox: {
    width: "99%",
    alignSelf: "center",
    flexDirection: "row",
  },
  oneCheckboxBox: {
    marginTop: "5%",
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnStyle: {
    marginTop: "10%",
    height: scalePoint * 45,
    borderRadius: 10,
    backgroundColor: "#01C65C",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "15%",
  },
  btnStyleDis: {
    marginTop: "10%",
    height: scalePoint * 45,
    borderRadius: 10,
    backgroundColor: "grey",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "15%",
  },
  btnTxt: {
    fontSize: 14,
    lineHeight: 14,
    color: "#fff",
    padding: "5%",
  },
});
