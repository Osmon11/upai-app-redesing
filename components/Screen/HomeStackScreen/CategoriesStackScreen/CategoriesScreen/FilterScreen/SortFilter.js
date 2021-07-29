import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Dialog, { DialogContent } from "react-native-popup-dialog";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;

export default function SortFilter({ answerModal, setAnswerModal, getResult }) {
  const [label1, setLabel1] = useState({
    label: "По рейтингу",
    value: "rating",
  });
  const [label2, setLabel2] = useState({
    label: "По количеству отзывов",
    value: "review-count",
  });
  const [label3, setLabel3] = useState({
    label: "Самые новые",
    value: "newest",
  });
  const [choice1, setChoice1] = useState(true);
  const [choice2, setChoice2] = useState(false);
  const [choice3, setChoice3] = useState(false);
  const getChoice1 = () => {
    getResult(label1);
    setChoice1(true);
    setChoice2(false);
    setChoice3(false);
    setAnswerModal(false);
  };
  const getChoice2 = () => {
    getResult(label2);
    setChoice2(true);
    setChoice1(false);
    setChoice3(false);
    setAnswerModal(false);
  };
  const getChoice3 = () => {
    getResult(label3);
    setChoice3(true);
    setChoice2(false);
    setChoice1(false);
    setAnswerModal(false);
  };
  return (
    <Dialog
      visible={answerModal}
      style={styles.modal}
      onTouchOutside={() => setAnswerModal(false)}
      onDismiss={() => setAnswerModal(false)}
      onHardwareBackPress={() => setAnswerModal(false)}
    >
      <DialogContent style={styles.answerModalBox}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => getChoice1()}
            style={styles.chooseLine}
          >
            <View style={styles.txtBox}>
              <Text style={styles.txt}>{label1.label}</Text>
            </View>
            <View>
              {choice1 ? (
                <AntDesign name='checkcircle' size={17} color='#225196' />
              ) : (
                <FontAwesome5 name='circle' size={17} color='#225196' />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => getChoice2()}
            style={styles.chooseLine2}
          >
            <View style={styles.txtBox}>
              <Text style={styles.txt}>{label2.label}</Text>
            </View>
            <View>
              {choice2 ? (
                <AntDesign name='checkcircle' size={17} color='#225196' />
              ) : (
                <FontAwesome5 name='circle' size={17} color='#225196' />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => getChoice3()}
            style={styles.chooseLine2}
          >
            <View style={styles.txtBox}>
              <Text style={styles.txt}>{label3.label}</Text>
            </View>
            <View>
              {choice3 ? (
                <AntDesign name='checkcircle' size={17} color='#225196' />
              ) : (
                <FontAwesome5 name='circle' size={17} color='#225196' />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </DialogContent>
    </Dialog>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: scalePoint * 343,
    height: scalePoint * 125,
  },
  answerModalBox: {
    backgroundColor: "#fff",
    width: scalePoint * 343,
    height: scalePoint * 125,
    justifyContent: "center",
    alignItems: "center",
    padding: "2%",
  },
  chooseLine: {
    marginTop: scalePoint * 25,
    marginLeft: scalePoint * 20,
    marginRight: scalePoint * 23,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chooseLine2: {
    marginTop: scalePoint * 15,
    marginLeft: scalePoint * 20,
    marginRight: scalePoint * 23,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txt: {
    fontSize: 16,
    fontFamily: "RobotoLight",
    color: "#000",
  },
  btnTxt: {
    fontSize: 14,
    color: "#01C65C",
    alignSelf: "center",
  },
  accessBox: {
    marginBottom: scalePoint * 5,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    alignItems: "center",
  },
});
