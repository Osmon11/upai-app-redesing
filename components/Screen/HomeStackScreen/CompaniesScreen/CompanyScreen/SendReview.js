import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import StarRating from "react-native-star-rating";
import { BoxShadow } from "react-native-shadow";
import AsyncStorage from "@react-native-community/async-storage";
import { API } from "../../../../config";
import DialogAlert from "../../../../Common/DialogAlert";

export default function SendReview({ shop, open, getAllreview }) {
  const shadowOpt = {
    width: 290,
    height: 78,
    color: "#000",
    border: 7,
    radius: 10,
    opacity: 0.07,
    x: 0,
    y: 3,
    style: {
      alignSelf: "center",
      marginTop: "15%",
    },
  };
  const [starCount, setStarCount] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [answerModal, setAnswerModal] = useState(false);
  const [modalTxt, setModalTxt] = useState();
  const sendFeedBackOrRedirect = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token !== null) {
      sendFeedBack();
    } else {
      open();
    }
  };
  const sendFeedBack = async () => {
    if (feedback.length != 0) {
      let data = {
        shop: shop,
        rate: starCount,
        opinion: feedback,
      };
      const token = await AsyncStorage.getItem("token");
      try {
        const response = await fetch(API + `shop/${shop}/review/`, {
          method: "POST", // или 'PUT'
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
        });
        const json = await response.json();

        getAllreview();
        setFeedback("");
        setStarCount(1);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    } else {
      setAnswerModal(true);
      setModalTxt("Введите сообщение");
    }
  };
  return (
    <View>
      <View>
        <Text
          style={{
            fontSize: 14,
            lineHeight: 16,
            color: "#515151",
            alignSelf: "center",
          }}
        >
          Поставить рейтинг и оставить отзыв
        </Text>
      </View>
      <View
        style={{
          width: "35%",
          alignSelf: "center",
          marginTop: "5%",
        }}
      >
        <StarRating
          starSize={17}
          disabled={false}
          maxStars={5}
          rating={parseInt(starCount)}
          selectedStar={(rating) => setStarCount(rating)}
          fullStarColor={"red"}
        />
      </View>
      <BoxShadow setting={shadowOpt}>
        <View
          style={{
            alignSelf: "center",
            width: "100%",
            height: 78,
            borderWidth: 0.5,
            borderColor: "#929292",
            borderRadius: 10,
            backgroundColor: "#fff",
          }}
        >
          <TextInput
            style={{
              paddingLeft: "5%",
              paddingTop: "5%",
              fontSize: 14,
              lineHeight: 16,
            }}
            multiline
            numberOfLines={1}
            placeholder='Отзыв'
            value={feedback}
            onChangeText={(text) => setFeedback(text)}
          />
        </View>
      </BoxShadow>
      <TouchableOpacity
        style={{
          alignSelf: "center",
          marginTop: "10%",
          width: 140,
          height: 40,
          backgroundColor: "#ff6b00",
          borderRadius: 10,
          justifyContent: "center",
        }}
        onPress={sendFeedBackOrRedirect}
      >
        <Text
          style={{
            fontSize: 14,
            lineHeight: 16,
            alignSelf: "center",
            color: "#fff",
          }}
        >
          Отправить
        </Text>
      </TouchableOpacity>
      <DialogAlert
        answerModal={answerModal}
        setAnswerModal={setAnswerModal}
        message={modalTxt}
        funcOk={() => setAnswerModal(false)}
      />
    </View>
  );
}
