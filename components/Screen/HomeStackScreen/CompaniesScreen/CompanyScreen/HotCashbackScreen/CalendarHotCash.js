import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const width = Dimensions.get('window').width * 0.95;
export default function CalendarHotCash({all}) {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  let allDate=[]
  const minDate = new Date(); // Today
  const maxDate = new Date();
  React.useEffect(()=>{
    onDateChange()
  })
  // const onDateChange = (date) => {
  //   setSelectedStartDate(date);
  // // };
  // const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const onDateChange = () => {
    
    all.forEach(el=>{
      allDate.push({
        date: new Date(el),
        style: {backgroundColor:'#ff6b00'},
        textStyle: {color: 'black'}, // sets the font color
        containerStyle: [], // extra styling for day container
        allowDisabled: true, // allow custom style to apply to disabled dates
      });
    })
    
  
  
};
  return (
    <View style={styles.container}>
      <CalendarPicker
        width={width}
        months={[
          'Январь',
          'Февраль',
          'Март',
          'Апрель',
          'Май',
          'Июнь',
          'Июль',
          'Август',
          'Сентябрь',
          'Октябрь',
          'Ноябрь',
          'Декабрь',
        ]}
        weekdays={['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']}
        startFromMonday={true}
        previousTitle="Назад"
        nextTitle="Вперед"
        customDatesStyles={allDate}
        selectedDayTextColor="#000"
        selectedRangeStyle={{
          backgroundColor: '#ff6b00',
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
  },
});
