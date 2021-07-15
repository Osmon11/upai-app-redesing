import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Share,
  Clipboard,
} from "react-native";
import DialogAlert from "../../../../Common/DialogAlert";
import shareIcon from "../../../../Images/shareIcon.png";

const width = Dimensions.get("window").width * 0.9;
const widthOfBtn = width * 0.7;
const heightOfBtn = width * 0.14;

export default function AboutUs(props) {
  const [answerModal, setAnswerModal] = useState(false);
  const [modalTxt, setModalTxt] = useState();
  const onShare = async (value) => {
    Share.share({
      message: value,
      url: value,
    });
    // Clipboard.setString(`${initialUrl}/CompanyScreen/?itemId=${props.itemId}`);
    // const text = await Clipboard.getString();
    // setAnswerModal(true);
    // setModalTxt('Ссылка скопирована \n ' + text);
  };
  return (
    <View style={styles.AboutUsBox}>
      <View style={styles.textBox}>
        <Text style={styles.mainBoxTxt}>О нас</Text>
      </View>
      <View style={styles.AboutUsContentBox}>
        <Text style={styles.AboutUsContentText}>{props.about.about}</Text>
        <TouchableOpacity
          style={styles.shareBtn}
          onPress={() => onShare(props.data.share_link.shortLink)}
        >
          <Image style={styles.shareIcon} source={shareIcon} />
          <Text style={styles.shareBtnText}>Поделиться заведением</Text>
        </TouchableOpacity>
      </View>
      <DialogAlert
        visible={"none"}
        answerModal={answerModal}
        setAnswerModal={setAnswerModal}
        message={modalTxt}
        funcOk={() => {
          setAnswerModal(false);
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  AboutUsBox: {
    width: "100%",
    alignSelf: "center",
  },
  textBox: {},
  mainBoxTxt: {
    marginLeft: "5%",
    fontSize: 20,
    lineHeight: 24,
  },
  AboutUsContentBox: {
    marginTop: "5%",
    width: "90%",
    alignSelf: "center",
  },
  AboutUsContentText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "RobotoLight",
    color: "#515151",
    textAlign: "justify",
  },
  shareBtn: {
    marginTop: "10%",
    width: widthOfBtn,
    height: heightOfBtn,
    backgroundColor: "#ff6b00",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  shareIcon: {
    width: 20,
    height: 15,
    marginRight: "5%",
  },
  shareBtnText: {
    fontSize: 14,
    lineHeight: 16,
    color: "#fff",
  },
});
