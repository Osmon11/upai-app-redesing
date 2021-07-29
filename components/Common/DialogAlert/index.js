import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Dialog, { DialogContent } from "react-native-popup-dialog";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;

export default function DialogAlert({
  answerModal,
  setAnswerModal,
  funcOk,
  message,
  visible,
}) {
  return (
    <Dialog visible={answerModal} onTouchOutside={() => setAnswerModal(false)}>
      <DialogContent style={styles.answerModalBox}>
        <View style={styles.container}>
          <Text style={styles.txt}>{message}</Text>
          <View style={styles.accessBox}>
            {visible != "none" ? (
              <TouchableOpacity onPress={() => setAnswerModal(false)}>
                <Text style={styles.btnTxt}>Отмена</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Text style={styles.btnTxt}></Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={funcOk}>
              <Text style={styles.btnTxt}>Ок</Text>
            </TouchableOpacity>
          </View>
        </View>
      </DialogContent>
    </Dialog>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignSelf: "center",
    width: scalePoint * 300,
    height: scalePoint * 121,
    alignItems: "center",
  },
  answerModalBox: {
    backgroundColor: "#fff",
    width: scalePoint * 300,
    height: scalePoint * 121,
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    marginTop: scalePoint * 25,
    width: "80%",
    fontSize: 18,
    fontFamily: "RobotoLight",
    color: "#000",
    height: scalePoint * 70,
    textAlign: "center",
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
