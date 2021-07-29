import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import successCheckIcon from "../../../Images/successCheckIcon.png";

export default function Success() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginTop: "10%",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 103,
            height: 103,
            resizeMode: "contain",
          }}
          source={successCheckIcon}
        />
        <Text
          style={{
            fontSize: 16,
            lineHeight: 19,
            color: "#515151",
            textAlign: "center",
          }}
        >
          {" "}
          Заявка перехода на бизнес профиль успешно отправлена. Ожидайте звонка,
          в течении 24 часов мы свяжемся с вами
        </Text>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnTxt}>Закрыть</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  btnStyle: {
    marginTop: "15%",
    marginBottom: "5%",
    width: 225,
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#01C65C",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    fontSize: 14,
    lineHeight: 16,
    color: "#01C65C",
  },
});
