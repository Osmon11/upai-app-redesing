import React, { useState } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import HeaderInStackScreens from '../../Common/HeaderInStackScreens';
import RNPickerSelect from 'react-native-picker-select';
import arrowDownIcon from '../../Images/arrowDownIcon.png';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SortFilter from '../HomeStackScreen/CategoriesStackScreen/CategoriesScreen/FilterScreen/SortFilter';
import { useNavigation } from '@react-navigation/native';
import SortNoti from './SortNoti';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function FilterNotificationsScreen() {
  const navigation = useNavigation();

  const [choice, setChoice] = useState({
    label: 'Отправленные',
    value: 'success',
  });
  const [date, setDate] = useState(new Date());
  const [sortModal, setSortModal] = useState(false);

  const [dateTo, setDateTo] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibleTo, setDatePickerVisibilityTo] = useState(false);

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
    setDateTo(Date);
    hideDatePickerTo();
  };
  const getResult = (value) => {
    setChoice(value);
  };
  React.useEffect(() => {
    return () => {
      setSortModal(false);
    };
    BackHandler.addEventListener('hardwareBackPress', handleBackButton());
  }, [navigation]);
  const handleBackButton = () => {
    setSortModal(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainBox}>
        <View style={styles.headerBox}>
          <HeaderInStackScreens />
        </View>
        <View style={styles.mainContentBox}>
          <Text style={styles.mainText}>Сортировать</Text>
          <View style={styles.dropDownsBox}>
            <View style={styles.categoryFilterBox}>
              <TouchableOpacity
                onPress={() => setSortModal(true)}
                style={styles.pickerBox}
              >
                <Text style={styles.pick}>{choice.label}</Text>
                {/* <RNPickerSelect
                  items={[
                    {
                      label: 'Отклоненные',
                      value: 'decline',
                    },
                    {
                      label: 'В ожидании',
                      value: 'pending',
                    },
                    {
                      label: 'Принятые',
                      value: 'success',
                    },
                  ]}
                  placeholder={{
                    label: 'Выберите...',
                    value: 'empty',
                  }}
                  onValueChange={(value) => {
                    setChoice(value);
                  }}
                  style={pickerSelectStyles}
                /> */}
              </TouchableOpacity>

              <View style={styles.arrowDownBox}>
                <Image source={arrowDownIcon} style={styles.arrowDown} />
              </View>
            </View>
          </View>
          <View style={styles.dateBox}>
            <Text style={styles.dateText}>Дата</Text>
            <View style={styles.datePickersBox}>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
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
                onConfirm={handleConfirmTo}
                onCancel={hideDatePickerTo}
              />
              <TouchableOpacity
                onPress={showDatePickerTo}
                style={styles.datePickerStyle}
              >
                <Text style={styles.datePickerTxt}>
                  {dateTo.getDate() <= 9
                    ? '0' + dateTo.getDate()
                    : dateTo.getDate()}
                  -
                  {dateTo.getMonth() <= 9
                    ? '0' + (dateTo.getMonth() + 1)
                    : dateTo.getMonth() + 1}
                  -{dateTo.getFullYear()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => {
              if (new Date(date) < new Date(dateTo)) {
                navigation.navigate('NotificationMainScreen', {
                  status: choice.value,

                  from: `${
                    date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()
                  }-${
                    date.getMonth() <= 9
                      ? '0' + (date.getMonth() + 1)
                      : date.getMonth() + 1
                  }-${date.getFullYear()}`,
                  to: `${
                    dateTo.getDate() <= 9
                      ? '0' + dateTo.getDate()
                      : dateTo.getDate()
                  }-${
                    dateTo.getMonth() <= 9
                      ? '0' + (dateTo.getMonth() + 1)
                      : dateTo.getMonth() + 1
                  }-${dateTo.getFullYear()}`,
                });
              } else {
                navigation.navigate('NotificationMainScreen', {
                  status: choice.value,

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
      <SortNoti
        answerModal={sortModal}
        setAnswerModal={setSortModal}
        getResult={(value) => getResult(value)}
      />
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
    marginTop: Platform.OS === 'ios' ? '15%' : '10%',
    width: '100%',
    height: scalePoint * 17,
  },
  mainContentBox: {
    marginTop: '5%',
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
    width: '100%',
    borderWidth: 1,
    borderColor: '#225196',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  pickerBox: {
    width: '90%',
  },
  arrowDownBox: {
    width: '10%',
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
    height: scalePoint * 45,
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
  arrowDown: {
    width: scalePoint * 18,
    height: scalePoint * 18,
    resizeMode: 'contain',
    marginRight: '5%',
  },
  pick: {
    fontSize: 16,
    lineHeight: 18,
    color: 'rgba(13,32,59, 0.4)',
    marginLeft: scalePoint * 18,
    fontFamily: 'Roboto',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: '5%',
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    padding: '5%',
    color: 'black',
  },
});
