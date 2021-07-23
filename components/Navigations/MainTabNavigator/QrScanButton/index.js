import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import qrIconIOS from "../../../Images/qrIconTabMenu.png";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;
export default function QrScanButton({ hideIcon }) {
  return (
    <View
      style={
        hideIcon
          ? { display: "none" }
          : {
              position: "absolute",
              alignItems: "center",
            }
      }
    >
      <View style={styles.btnStyles}>
        <Image source={qrIconIOS} style={styles.qrIcon} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  btnStyles: {
    backgroundColor: "#FF6B00",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 60,
    height: 60,
    borderRadius: 60 * 0.5,
    position: "absolute",
    top: 0,
    borderWidth: 1,
    borderColor: "rgba(255,255, 255, 0.1)",
  },
  qrIcon: {
    width: scalePoint * 36,
    height: scalePoint * 36,
    resizeMode: "contain",
  },
});
