import React, { useState } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import HeaderInStackScreens from '../../Common/HeaderInStackScreens';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function FilterBuyHistoryScreen() {
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibleTo, setDatePickerVisibilityTo] = useState(false);
  const [choice, setChoice] = useState('decline');
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (Date) => {
    setDate(Date);
    hideDatePicker();
  };

  const showDatePickerTo = () => {
    setDatePickerVisibilityTo(true);
  };

  const hideDatePickerTo = () => {
    setDatePickerVisibilityTo(false);
  };

  const handleConfirmTo = (Date) => {
    setDate2(Date);
    hideDatePickerTo();
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainBox}>
        <View style={styles.headerBox}>
          <HeaderInStackScreens />
        </View>
        <View style={styles.mainContentBox}>
          <Text style={styles.mainText}>Сортировать</Text>
          <View style={styles.dateBox}>
            <Text style={styles.dateText}>Дата</Text>
            <View style={styles.datePickersBox}>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date) => handleConfirm(date)}
                onCancel={hideDatePicker}
              />
              <TouchableOpacity
                onPress={showDatePicker}
                style={styles.datePickerStyle}
              >
                <Text style={styles.datePickerTxt}>
                  {date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()}-
                  {date.getMonth() <= 9
                    ? '0' + (date.getMonth() + 1)
                    : date.getMonth() + 1}
                  -{date.getFullYear()}
                </Text>
              </TouchableOpacity>

              <Text>-</Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisibleTo}
                mode="date"
                minimumDate={date}
                onConfirm={(date) => handleConfirmTo(date)}
                onCancel={hideDatePickerTo}
              />

              <TouchableOpacity
                onPress={showDatePickerTo}
                style={styles.datePickerStyle}
              >
                <Text style={styles.datePickerTxt}>
                  {date2.getDate() <= 9
                    ? '0' + date2.getDate()
                    : date2.getDate()}
                  -
                  {date2.getMonth() <= 9
                    ? '0' + (date2.getMonth() + 1)
                    : date2.getMonth() + 1}
                  -{date2.getFullYear()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => {
              if (new Date(date) < new Date(date2)) {
                navigation.navigate('HistoryOfBuys', {
                  from: `${
                    date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()
                  }-${
                    date.getMonth() <= 9
                      ? '0' + (date.getMonth() + 1)
                      : date.getMonth() + 1
                  }-${date.getFullYear()}`,
                  to: `${
                    date2.getDate() <= 9
                      ? '0' + date2.getDate()
                      : date2.getDate()
                  }-${
                    date2.getMonth() <= 9
                      ? '0' + (date2.getMonth() + 1)
                      : date2.getMonth() + 1
                  }-${date2.getFullYear()}`,
                  filtered: true,
                });
              } else {
                navigation.navigate('HistoryOfBuys', {
                  from: undefined,
                  to: undefined,
                });
              }
            }}
          >
            <Text style={styles.btnText}>Сортировать</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainBox: {
    width: '95%',
    alignSelf: 'center',
  },
  headerBox: {
    marginTop: Platform.OS === 'ios' ? scalePoint * 46 : scalePoint * 25,
    width: '100%',
    height: scalePoint * 17,
  },
  mainContentBox: {
    marginTop: '10%',
    width: '100%',
  },
  mainText: {
    marginLeft: '5%',
    fontSize: 24,
    lineHeight: 28,
  },
  categoriesBox: {
    marginTop: '15%',
  },
  dropDownsStyle: {
    backgroundColor: '#fff',
    marginTop: '5%',
    width: '100%',
    borderWidth: 1,
    borderColor: '#225196',
    borderRadius: 6,
  },
  dropDownsText: {
    fontSize: 20,
    lineHeight: 24,
  },
  categoryFilterBox: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#225196',
    borderRadius: 6,
  },
  categoryFilterText: {
    fontSize: 16,
    lineHeight: 18,
    padding: '5%',
    color: 'rgba(13,32,59, 0.4)',
  },
  dateBox: {
    marginTop: '10%',
  },
  dateText: {
    marginLeft: '3%',
    fontSize: 20,
    lineHeight: 23,
    color: '#313131',
  },
  datePickersBox: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  datePickerStyle: {
    borderWidth: 1,
    borderRadius: 10,
    width: '48%',
    height: scalePoint * 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#225196',
  },
  datePickerTxt: {
    fontSize: 16,
    lineHeight: 19,
    padding: '5%',
    color: '#225196',
  },
  dropDownsBox: {
    marginTop: '5%',
  },
  filterBtn: {
    width: '50%',
    height: 45,
    borderRadius: 10,
    marginTop: '15%',
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnText: {
    fontSize: 16,
    lineHeight: 18,
    color: '#fff',
    alignSelf: 'center',
  },
});
