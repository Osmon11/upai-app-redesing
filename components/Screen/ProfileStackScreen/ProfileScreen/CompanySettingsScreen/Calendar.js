import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import AnimatedLoader from "react-native-animated-loader";
import moment from "moment";
const width = Dimensions.get("window").width * 0.905;

export default function Calendar({ all, setCustomDatesStyles }) {
  const onDateChange = (date) => {
    if (
      all.some(
        (item) => new Date(item.date).getTime() === new Date(date).getTime()
      )
    ) {
      let newAllDates = all.filter(
        (item) => new Date(item.date).getTime() !== new Date(date).getTime()
      );
      setCustomDatesStyles(newAllDates);
    } else {
      setCustomDatesStyles([
        ...all,
        {
          date: date,
          style: { backgroundColor: "#ff6b00" },
          textStyle: { color: "black" }, // sets the font color
          containerStyle: [], // extra styling for day container
          allowDisabled: true, // allow custom style to apply to disabled dates
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <CalendarPicker
        width={width}
        months={[
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь",
        ]}
        weekdays={["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]}
        startFromMonday={true}
        minDate={new Date()}
        previousTitle='Назад'
        nextTitle='Вперед'
        allowRangeSelection={false}
        customDatesStyles={all}
        selectedDayTextColor='#000'
        onDateChange={onDateChange}
        selectedRangeStyle={{
          backgroundColor: "#ff6b00",
        }}
        selectedDayStyle={{
          color: "black",
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: width,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
  },
});
