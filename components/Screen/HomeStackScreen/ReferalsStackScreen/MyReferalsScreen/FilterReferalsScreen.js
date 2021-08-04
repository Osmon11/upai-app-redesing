import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from "react-native-gesture-handler";

import HeaderInStackScreens from "../../../../Common/HeaderInStackScreens";

export default function FilterReferalsScreen() {
  const [date, setDate] = useState("29-09-2020");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ position: "absolute", width: "100%" }}>
        <HeaderInStackScreens />
      </View>
      <View style={styles.mainContentBox}>
        <Text style={styles.mainText}>Navlarga ajratish</Text>
      </View>
      <View style={styles.dateBox}>
        <Text style={styles.dateText}>Sana</Text>
        <DateTimePickerModal
          isVisible={true}
          mode='date'
          // onConfirm={handleConfirm}
          // onCancel={hideDatePicker}
        />
        <View style={styles.datePickersBox}>
          <TouchableOpacity
            // onPress={showDatePicker}
            style={styles.datePickerStyle}
          >
            <Text style={styles.datePickerTxt}>
              {new Date()
                .toISOString()
                .replace("-", "/")
                .split("T")[0]
                .replace("-", "/")}
            </Text>
          </TouchableOpacity>
          <Text>-</Text>
          <TouchableOpacity
            // onPress={showDatePicker}
            style={styles.datePickerStyle}
          >
            <Text style={styles.datePickerTxt}>
              {new Date()
                .toISOString()
                .replace("-", "/")
                .split("T")[0]
                .replace("-", "/")}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnStyle}>
          <Text style={styles.btnTxt}>Navlarga ajratish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContentBox: {
    marginTop: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "5%",
    marginRight: "5%",
  },
  mainText: {
    fontSize: 24,
    lineHeight: 28,
  },
  dateBox: {
    marginTop: "10%",
    marginLeft: "5%",
  },
  dateText: {
    fontSize: 20,
    lineHeight: 23,
    color: "#313131",
  },
  datePickersBox: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  datePickerStyle: {
    borderWidth: 1,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
    borderColor: "#225196",
  },
  btnStyle: {
    alignSelf: "center",
    marginTop: "10%",
    borderRadius: 10,
    backgroundColor: "#01C65C",
  },
  btnTxt: {
    fontSize: 16,
    lineHeight: 18,
    color: "#fff",
    paddingVertical: "5%",
    padding: "10%",
  },
});
