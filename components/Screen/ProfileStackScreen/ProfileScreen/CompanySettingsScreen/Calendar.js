import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import AnimatedLoader from 'react-native-animated-loader';
import moment from 'moment';
const width = Dimensions.get('window').width * 0.905;
export default function Calendar({ all }) {
  const minDate = new Date(); // Today
  const maxDate = new Date();
  const [viewLoader, setViewLoader] = React.useState(false);
  const onDateChange = (date, type) => {
    setViewLoader(true)
    let status = true;
    
    all.map((el, index) => {
      
      if (status) {
        if (
          new Date(el.date).getMonth() == new Date(date).getMonth() &&
          new Date(el.date).getDate() == new Date(date).getDate()
        ) {
          status = false;
          all[index].style.backgroundColor = 'white';
          if (index == 0) {
            all[0].style.backgroundColor = 'white';
          }
          all.splice(index, index == 0 ? index+1 : index);
          setTimeout(() => {
            setViewLoader(false)
          }, 1000);
          
        } else {
          status = true;
        }
      }
    });
    if (status) {
      all.push({
        date: date,
        style: { backgroundColor: '#ff6b00' },
        textStyle: { color: 'black' }, // sets the font color
        containerStyle: [], // extra styling for day container
        allowDisabled: true, // allow custom style to apply to disabled dates
      });
      setTimeout(() => {
        setViewLoader(false)
      }, 1000);
    }
    
    

    
  };

  return (
    <View style={styles.container}>
    <AnimatedLoader
        visible={viewLoader}
        overlayColor="rgba(255,255,255,0.5)"
        source={require('../../../../Common/loader.json')}
        animationStyle={{ width: 100, height: 100, resizeMode: 'cover' }}
        speed={1}
      ></AnimatedLoader>
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
        minDate={new Date()}
        previousTitle="Назад"
        nextTitle="Вперед"
        allowRangeSelection={false}
        customDatesStyles={all}
        selectedDayTextColor="#000"
        onDateChange={onDateChange}
        selectedRangeStyle={{
          backgroundColor: '#ff6b00',
        }}
        selectedDayStyle={{
          color: 'black',
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: width,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
  },
});
