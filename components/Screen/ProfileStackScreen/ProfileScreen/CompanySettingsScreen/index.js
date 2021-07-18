import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import { ActionSheet, Root } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import TimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import AnimatedLoader from 'react-native-animated-loader';
import emptyProfileAccountImg from '../../../../Images/emptyProfileAccountImg.png';
import addPhotoIcon from '../../../../Images/addPhotoIcon.png';
import addPhotoToGalleryIcon from '../../../../Images/addPhotoToGalleryIcon.png';
import HeaderInStackScreens from '../../../../Common/HeaderInStackScreens';
import { API } from '../../../../config';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import DialogAlert from '../../../../Common/DialogAlert';
import ModalCategories from '../../../HomeStackScreen/CategoriesStackScreen/CategoriesScreen/FilterScreen/ModalCategories';

const width = Dimensions.get('window').width;
const scalePoint = width / 380;

export default function CompanySettingsScreen({ route }) {
  const { shopId } = route.params;
  const [cashbacksPrecent, SetCashbacksPrecent] = useState('Введите % кэшбэка');
  const [aboutUsInfo, SetAboutUsInfo] = useState('Описание вашего магазина');
  const navigation = useNavigation();
  const [contactsValue1, setContactsValue1] = useState('Введите телефон');
  const [contactsValue2, setContactsValue2] = useState('Логин Instagram');
  const [contactsValue3, setContactsValue3] = useState(
    'Ссылка на сайт (www.vashsait.ru)'
  );
  const [viewLoader, setViewLoader] = React.useState(false);
  const [contactsValue4, setContactsValue4] = useState('Ваш адрес');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const date = new Date();
  const [time2, setTime2] = useState(0);
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);
  const [showFrom, setShowFrom] = useState(false);
  const [categories, setCategories] = useState([]);
  const [data, setData] = React.useState();
  const [selectedValue, setSelectedValue] = useState();
  const [workingDays, setWorkingDays] = useState();
  const [activeLabel, setActiveLabel] = useState('');
  const [answerModal, setAnswerModal] = useState(false);
  const [modalTxt, setModalTxt] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [nameOfCategory, setNameOfCategory] = useState('Выберите категорию');
  const [selectedId, setSelectedId] = useState(null);
  const [img, setImg] = useState();
  const [homeImg, sethomeImg] = useState();

  const wrkdays = [
    {
      label: 'Monday',
      out: 'Пн',
    },
    {
      label: 'Tuesday',
      out: 'Вт',
    },
    {
      label: 'Wednesday',
      out: 'Ср',
    },
    {
      label: 'Thursday',
      out: 'Чт',
    },
    {
      label: 'Friday',
      out: 'Пт',
    },
    {
      label: 'Saturday',
      out: 'Сб',
    },
    {
      label: 'Sunday',
      out: 'Вс',
    },
  ];

  React.useEffect(() => {
    getAllInfo();
  }, []);

  React.useEffect(() => {
    workingDays &&
      wrkdays.map((el) => {
        workingDays[el.label].to == null
          ? (workingDays[el.label].to = '00:00')
          : workingDays[el.label].to;
        workingDays[el.label].from_ == null
          ? (workingDays[el.label].from_ = '00:00')
          : workingDays[el.label].from_;
      });
  }, [workingDays]);

  const getAllCategories = async (name) => {
    const resp = await fetch(API + 'category/');
    const data = await resp.json();
    let id = null;
    data &&
      data.map((el) => {
        if (name && name == el.name) id = el.id;
      });
    setCategories(data);

    setNameOfCategory(name ? name : 'Выберите категорию');
    setSelectedId(id ? id : null);
  };
  const getAllAboutCategory = (el) => {
    setSelectedId(el ? el.id : null);

    setNameOfCategory(el ? el.name : 'Выберите категорию');
  };
  const getAllInfo = async (arr) => {
    let resp = await fetch(API + 'shop/' + shopId + '/');
    let data = await resp.json();
    setData(data);

    setWorkingDays(data && data.working_days);
    getAllCategories(data.categories[0]);
    setImg(data.logo);
    sethomeImg(data.main_image);
  };

  const showTimePicker = (label) => {
    setShow(true);
    setActiveLabel(label);
  };
  const showTimePickerFrom = (label) => {
    setShowFrom(true);
    setActiveLabel(label);
  };

  const hideTimePicker = () => {
    setShow(false);
  };
  const hideTimePickerFrom = () => {
    setShowFrom(false);
  };
  const handleTimeFrom = (time) => {
    let one = {
      active: workingDays[activeLabel].active,
      from_: time
        ? `${time.getHours() <= 9 ? '0' + time.getHours() : time.getHours()}:${
            time.getMinutes() <= 9 ? '0' + time.getMinutes() : time.getMinutes()
          }`
        : '00:00',
      to: workingDays[activeLabel].to,
    };

    setWorkingDays({ ...workingDays, [activeLabel]: one });
    // changeMarketInfo({ ...workingDays, [activeLabel]: one });

    hideTimePickerFrom();
    changeMarketInfo('save');
  };

  const handleTimeTo = (time) => {
    let one = {
      active: workingDays[activeLabel].active,
      from_: workingDays[activeLabel].from_,
      to: time
        ? `${time.getHours() <= 9 ? '0' + time.getHours() : time.getHours()}:${
            time.getMinutes() <= 9 ? '0' + time.getMinutes() : time.getMinutes()
          }`
        : '00:00',
    };

    setWorkingDays({ ...workingDays, [activeLabel]: one });
    // changeMarketInfo({ ...workingDays, [activeLabel]: one });
    hideTimePicker();
    changeMarketInfo('save');
  };
  const setWeeks = (label) => {
    let from = workingDays && workingDays[label].active;

    let one = {
      active: !from,
      from_: workingDays[label].from_,
      to: workingDays[label].to,
    };
    setWorkingDays({ ...workingDays, [label]: one });
    changeMarketInfo('save');
    // changeMarketInfo({ ...workingDays, [label]: one });
  };

  const choosePhotoFromGallery = async (name) => {
    let permissionResult =
      await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      setAnswerModal(true);
      setModalTxt('Требуется разрешение на доступ к фотографиям');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    changePhoto(pickerResult, name);
  };

  const addPhotoToAccount = (name) => {
    const btns = ['Выбрать из галереи', 'Отмена'];
    ActionSheet.show(
      {
        options: btns,
        cancelButtonIndex: 1,
        title: 'Выберите способ...',
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            choosePhotoFromGallery(name);
            break;
          default:
            break;
        }
      }
    );
  };
  const changeText = (prop) => (text) => {
    setData({ ...data, [prop]: text });
  };
  const changeMarketInfo = async (s) => {
    setViewLoader(true);
    const token = await AsyncStorage.getItem('token');

    delete data.logo;
    delete data.main_image;
    delete data.gallery;

    workingDays &&
      wrkdays.map((el) => {
        workingDays[el.label].to == null
          ? (workingDays[el.label].to = '00:00')
          : workingDays[el.label].to;
        workingDays[el.label].from_ == null
          ? (workingDays[el.label].from_ = '00:00')
          : workingDays[el.label].from_;
        data.working_days = workingDays;
      });

    if (selectedId == null || selectedId == undefined) {
      setAnswerModal(true);
      setModalTxt('Выберите категорию');
    } else {
      data.categories = [selectedId];

      try {
        const response = await fetch(API + 'shop/change/', {
          method: 'PATCH', // или 'PUT'
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
        });
        const json = await response.json();

        setViewLoader(false);
        if (!s) {
          setAnswerModal(true);
          setModalTxt('Успешно сохранено');
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
  };
  const changePhoto = async (photo, name) => {
    const token = await AsyncStorage.getItem('token');
    const dats = new FormData();

    dats.append(name != 'gallery' ? name : 'img', {
      name: `${name}.png`,
      type: photo.type + '/jpeg',
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });
    let url = name == 'gallery' ? 'shop/image/' : 'shop/change/';
    let met = name == 'gallery' ? 'POST' : 'PATCH';

    try {
      const response = await fetch(API + url, {
        method: met, // или 'PUT'
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: dats, // данные могут быть 'строкой' или {объектом}!
      });
      let res = await response.json();

      getAllInfo();
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  const deleteImg = async (id) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(API + 'shop/image/' + id + '/', {
        method: 'DELETE', // или 'PUT'
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      getAllInfo();
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  return (
    <Root>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : null}
        style={styles.container}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollBox}
        >
          <AnimatedLoader
            visible={viewLoader}
            overlayColor="rgba(255,255,255,0.7)"
            source={require('../../../../Common/loader.json')}
            animationStyle={{ width: 100, height: 100, resizeMode: 'cover' }}
            speed={1}
          >
            <Text>Сохранение...</Text>
          </AnimatedLoader>
          <View style={styles.headerBox}>
            <HeaderInStackScreens />
          </View>
          <View style={styles.profileInfoBox}>
            <View>
              <View style={styles.accountImgFirstShadowCircle}>
                <View style={styles.accountImgSecondShadowCircle}>
                  <View style={styles.addPhotoIconBox}>
                    <TouchableOpacity
                      style={styles.addPhotoBtn}
                      onPress={() => addPhotoToAccount('logo')}
                    >
                      <Image
                        style={{
                          width: scalePoint * 15,
                          height: scalePoint * 15,
                          resizeMode: 'contain',
                        }}
                        source={addPhotoIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.accountImgThirdShadowCircle}>
                    <Image
                      style={styles.accountImg}
                      source={
                        img && img.uri
                          ? { uri: img.uri }
                          : img
                          ? { uri: img }
                          : emptyProfileAccountImg
                      }
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.infoInputsBox}>
            <Text style={styles.infoBoxText}>Главная картинка (450х250)</Text>
            <View style={{ flexDirection: 'row', marginTop: '2%' }}>
              <View style={styles.mainImgBox}>
                <TouchableOpacity
                  style={styles.deletePhotoBtn}
                  onPress={() => addPhotoToAccount('main_image')}
                >
                  <Image
                    style={{
                      width: scalePoint * 15,
                      height: scalePoint * 15,
                      resizeMode: 'contain',
                    }}
                    source={addPhotoIcon}
                  />
                </TouchableOpacity>
                <Image
                  style={styles.addedImgs}
                  source={
                    homeImg && homeImg.uri
                      ? { uri: homeImg.uri }
                      : homeImg
                      ? { uri: homeImg }
                      : emptyProfileAccountImg
                  }
                />
              </View>
            </View>
            {/* <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>
                Категория {selectedValue && selectedValue.label}
              </Text>
              <View style={styles.inputBox}>
                {categories && (
                  <RNPickerSelect
                    items={categories}
                    placeholder={
                      {
                      label: 'Выберите категорию',
                      value: 'empty',
                    }}
                    
                    style={pickerSelectStyles}
                    onValueChange={(item, i) =>
                      setSelectedValue({ val: item, name: i })
                    }
                    useNativeAndroidPickerStyle={false}
                    inputAndroidContainer={{ paddingLeft: '5%' }}
                  />
                )}
              </View>
            </View> */}
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>Категории</Text>
              <TouchableOpacity
                style={styles.inputBox}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.pick}>{nameOfCategory}</Text>
                {/* {categories && (
                <RNPickerSelect
                  items={categories}
                  placeholder={{
                    label: 'Выберите категорию',
                    value: 'empty',
                  }}
                  style={pickerSelectStyles}
                  onValueChange={(item, i) =>
                    setSelectedValue({ val: item, name: i })
                  }
                  useNativeAndroidPickerStyle={false}
                  inputAndroidContainer={{ paddingLeft: '5%' }}
                />
              )} */}
              </TouchableOpacity>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>Кэшбэк</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.pick}
                  placeholder={cashbacksPrecent}
                  value={data ? data.cashback : ''}
                  onChangeText={changeText('cashback')}
                />
              </View>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>О нас</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.descriptionTxt}
                  multiline={true}
                  numberOfLines={5}
                  placeholder={aboutUsInfo}
                  value={data ? data.about : ''}
                  onChangeText={changeText('about')}
                />
              </View>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>Контакты</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder={contactsValue1}
                  value={data ? data.phone : ''}
                  maxLength={12}
                  onChangeText={changeText('phone')}
                />
              </View>
              <View style={styles.inputBox1}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder={contactsValue2}
                  value={data ? data.instagram : ''}
                  onChangeText={changeText('instagram')}
                />
              </View>
              <View style={styles.inputBox1}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder={contactsValue3}
                  value={data ? data.web_site : ''}
                  onChangeText={changeText('web_site')}
                />
              </View>
              <View style={styles.inputBox1}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder={contactsValue4}
                  value={data ? data.address : ''}
                  onChangeText={changeText('address')}
                />
              </View>
            </View>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoBoxText}>Галерея</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.addPhotoSection}
            >
              {data && data.gallery !== undefined
                ? data?.gallery.map((el) => (
                    <View style={styles.mainImgBox} key={el.id}>
                      <TouchableOpacity
                        style={styles.deletePhotoBtn}
                        onPress={() => deleteImg(el.id)}
                      >
                        <AntDesign
                          name="delete"
                          size={scalePoint * 10}
                          color="#fff"
                        />
                      </TouchableOpacity>
                      <Image
                        style={styles.addedImgs}
                        source={{ uri: el.img }}
                      />
                    </View>
                  ))
                : null}

              <TouchableOpacity
                style={styles.addPhotoBox}
                onPress={() => addPhotoToAccount('gallery')}
              >
                <Image
                  style={{
                    width: 18,
                    height: 18,
                    resizeMode: 'contain',
                  }}
                  source={addPhotoToGalleryIcon}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxText}>Рабочее время</Text>
            <View style={styles.inputBox}>
              <View style={{ paddingVertical: '3%', width: '100%' }}>
                {wrkdays &&
                  wrkdays.map((el) => (
                    <View style={styles.workTimeBox} key={el.label}>
                      <View style={styles.workDaysAndTimeBox}>
                        <Switch
                          style={{
                            transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
                          }}
                          trackColor={{ false: '#e7e7e7', true: '#e7e7e7' }}
                          thumbColor={
                            workingDays && workingDays[el.label]?.active
                              ? '#ff6b00'
                              : '#bfbfbf'
                          }
                          ios_backgroundColor="#e7e7e7"
                          onValueChange={() => setWeeks(el.label)}
                          value={workingDays && workingDays[el.label]?.active}
                        />
                        <Text style={styles.dayTimeText}>{el.out}</Text>
                      </View>
                      <View style={styles.timeBox}>
                        <TouchableOpacity
                          onPress={() => {
                            showTimePickerFrom(el.label);
                          }}
                          style={styles.timePickerStyle}
                          disabled={
                            workingDays && !workingDays[el.label]?.active
                          }
                        >
                          <Text style={styles.timePickerText}>
                            {workingDays &&
                              workingDays[el.label]?.from_ !== undefined &&
                              workingDays[el.label]?.from_}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            showTimePicker(el.label);
                          }}
                          style={styles.timePickerStyle}
                          disabled={
                            workingDays && !workingDays[el.label]?.active
                          }
                        >
                          <Text style={styles.timePickerText}>
                            {workingDays &&
                              workingDays[el.label]?.to !== undefined &&
                              workingDays[el.label]?.to}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                {showFrom ? (
                  <TimePickerModal
                    onConfirm={handleTimeFrom}
                    onCancel={hideTimePickerFrom}
                    mode="time"
                    isVisible={showFrom}
                    display="spinner"
                    is24Hour={true}
                    locale="ru-Ru"
                  />
                ) : show ? (
                  <TimePickerModal
                    onConfirm={handleTimeTo}
                    onCancel={hideTimePicker}
                    mode="time"
                    isVisible={show}
                    display="spinner"
                    is24Hour={true}
                    locale="ru-Ru"
                  />
                ) : null}
              </View>
            </View>
          </View>
          <View style={styles.btnBox}>
            <TouchableOpacity
              style={styles.declineBtn}
              onPress={() => navigation.navigate('ProfileScreen')}
            >
              <Text style={styles.declineBtnTxt}>Отменить</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => changeMarketInfo(false)}
              style={styles.saveBtn}
            >
              <Text style={styles.saveBtnTxt}>Сохранить</Text>
            </TouchableOpacity>
          </View>
          <DialogAlert
            answerModal={answerModal}
            setAnswerModal={setAnswerModal}
            message={modalTxt}
            funcOk={() => {
              modalTxt == 'Выберите категорию' ||
              modalTxt == 'Заполните все временые промежутки'
                ? setAnswerModal
                : setAnswerModal(false);
              navigation.navigate('ProfileScreen');
            }}
          />
          <ModalCategories
            cat={modalVisible}
            setCat={setModalVisible}
            category={categories}
            funcOk={getAllAboutCategory}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Root>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollBox: {
    width: '95%',
    alignSelf: 'center',
  },
  headerBox: {
    width: '100%',
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? '15%' : '5%',
  },
  addPhotoIconBox: {
    position: 'absolute',
    zIndex: 9,
    left: '85%',
    top: '8%',
  },
  addPhotoBtn: {
    width: scalePoint * 34,
    height: scalePoint * 34,
    borderRadius: scalePoint * 34 * 0.5,
    backgroundColor: '#ff6b00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deletePhotoBtn: {
    width: scalePoint * 20,
    height: scalePoint * 20,
    borderRadius: scalePoint * 20 * 0.5,
    backgroundColor: '#ff6b00',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    right: scalePoint * 5,
    top: scalePoint * 5,
    zIndex: 999,
  },
  addedImgs: {
    width: scalePoint * 95,
    height: scalePoint * 75,
    borderRadius: scalePoint * 10,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  addPhotoTxt: {
    padding: '2%',
    marginLeft: '5%',
    fontSize: 16,
    lineHeight: 18,
    width: '85%',
  },
  accountImgFirstShadowCircle: {
    width: scalePoint * 142,
    height: scalePoint * 142,
    backgroundColor: '#fff',
    borderRadius: scalePoint * 142 * 0.5,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowRadius: 13,
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  accountImgSecondShadowCircle: {
    flexDirection: 'row',
    width: scalePoint * 124,
    height: scalePoint * 124,
    backgroundColor: '#fff',
    borderRadius: scalePoint * 124 * 0.5,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowRadius: 13,
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: '#fff',
    elevation: 8,
  },
  accountImgThirdShadowCircle: {
    shadowColor: '#000',
    shadowRadius: 13,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: -1,
      height: 0,
    },
    elevation: 8,
    backgroundColor: '#fff',
    borderRadius: scalePoint * 107 * 0.5,
    width: scalePoint * 107,
    height: scalePoint * 107,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  accountImg: {
    width: scalePoint * 107,
    height: scalePoint * 107,
    borderRadius: scalePoint * 107 * 0.5,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  profileInfoBox: {
    alignItems: 'center',
    marginTop: '5%',
  },
  infoInputsBox: {
    marginBottom: '5%',
    marginTop: '10%',
  },
  infoBox: {
    alignItems: 'center',
    marginTop: '5%',
    width: '100%',
  },
  infoBoxText: {
    alignSelf: 'flex-start',
    marginLeft: 19,
    fontSize: 16,
    lineHeight: 19,
    color: '#515151',
  },
  inputBox: {
    width: '100%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#225196',
    borderRadius: 10,
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pick: {
    color: 'grey',
    paddingVertical: 11,
    paddingHorizontal: 19,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Roboto',
    width: '100%',
  },
  inputBox1: {
    width: '100%',
    marginTop: '3%',
    borderColor: '#225196',
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 10,
  },
  textInputStyle: {
    width: '90%',
    paddingVertical: 11,
    paddingHorizontal: 19,
    fontSize: 12,
    fontFamily: 'Roboto',
    lineHeight: 18,
  },
  descriptionTxt: {
    width: '90%',
    marginVertical: '10%',
    marginLeft: '5%',
    fontSize: 16,
    lineHeight: 16,
  },
  workTimeBox: {
    flexDirection: 'row',
    width: '100%',
  },
  workDaysAndTimeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '4%',
    width: '50%',
  },
  dayTimeText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#8d8d8d',
  },
  timeBox: {
    width: '45%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  timePickerStyle: {
    borderWidth: 1,
    borderRadius: 4,
    width: '45%',
    height: 20,
    alignItems: 'center',
    borderColor: '#225196',
    justifyContent: 'center',
  },
  timePickerText: {
    fontSize: 12,
    lineHeight: 14,
    color: '#515151',
    alignSelf: 'center',
    alignItems: 'center',
  },
  addPhotoSection: {
    marginTop: '2%',
    width: '100%',
  },
  mainImgBox: {
    width: scalePoint * 100,
    height: scalePoint * 80,
    borderRadius: scalePoint * 10,
    borderWidth: 1,
    borderColor: '#256196',
    marginRight: scalePoint * 10,
    justifyContent: 'center',
  },
  addPhotoBox: {
    width: 100,
    height: 90,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#225196',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBox: {
    marginTop: '15%',
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: '10%',
  },
  declineBtn: {
    width: '48%',
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ff6b00',
    justifyContent: 'center',
  },
  saveBtn: {
    width: '48%',
    height: 45,
    borderRadius: 10,
    backgroundColor: '#ff6b00',
    justifyContent: 'center',
  },
  declineBtnTxt: {
    fontSize: 14,
    lineHeight: 16,
    alignSelf: 'center',
    color: '#ff6b00',
    fontFamily: 'SfPro',
  },
  saveBtnTxt: {
    fontSize: 14,
    lineHeight: 16,
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'SfPro',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: 'black',
    height: scalePoint * 45,
    marginLeft: scalePoint * 30,
  },
  inputAndroid: {
    fontSize: 16,
    color: 'black',
    height: scalePoint * 45,
    marginLeft: scalePoint * 30,
  },
});
