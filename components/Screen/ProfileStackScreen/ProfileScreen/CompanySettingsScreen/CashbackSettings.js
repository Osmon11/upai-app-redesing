import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Switch,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

import { ActionSheet, Root } from "native-base";
import * as ImagePicker from "expo-image-picker";
import TimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import addPhotoToGalleryIcon from "../../../../Images/addPhotoToGalleryIcon.png";
import HeaderInStackScreens from "../../../../Common/HeaderInStackScreens";
import Calendar from "./Calendar";
import DialogAlert from "../../../../Common/DialogAlert";
import { API } from "../../../../config";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import AnimatedLoader from "react-native-animated-loader";

import emptyProfileAccountImg from "../../../../Images/emptyProfileAccountImg.png";
import addPhotoIcon from "../../../../Images/addPhotoIcon.png";
import axios from "axios";
import ModalCategories from "../../../HomeStackScreen/CategoriesStackScreen/CategoriesScreen/FilterScreen/ModalCategories";

const width = Dimensions.get("window").width;
const firstCircleSize = width * 0.4;
const secondCircleSize = width * 0.34;
const thirdCircleSize = width * 0.29;
const firstCircleRadius = firstCircleSize * 0.5;
const secondCircleRadius = secondCircleSize * 0.5;
const thirdCircleRadius = thirdCircleSize * 0.5;

const scalePoint = width / 380;

export default function CasbackSettingsScreen({ route }) {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [cashbacksPrecent, SetCashbacksPrecent] = useState("Введите % кэшбэка");
  const [cashbackName, SetCashbackName] = useState("Введите название");
  const [aboutUsInfo, SetAboutUsInfo] = useState("Описание");
  const [isEnabled, setIsEnabled] = useState(false);
  const [image, setImg] = useState();
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const navigation = useNavigation();
  const [time1, setTime1] = useState("07:00");
  const [time2, setTime2] = useState("06:00");
  const [times, setTime] = useState(new Date());
  const [timeFrom, setTimeFrom] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showFrom, setShowFrom] = useState(false);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [contact, setContact] = useState("");
  const [cashId, setCashId] = useState();
  const [cashback, setCashback] = useState("");
  const [categories, setCategories] = useState([]);
  const [info, setInfo] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const [answerModal, setAnswerModal] = useState(false);
  const [modalTxt, setModalTxt] = useState(false);
  const [customDatesStyles, setCustomDatesStyles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nameOfCategory, setNameOfCategory] = useState("Kategoriyani tanlang");
  const [selectedId, setSelectedId] = useState(null);
  const [viewLoader, setViewLoader] = React.useState(false);
  React.useEffect(() => {
    if (route?.params && route?.params.shopId != undefined) {
      setCashId(route.params.shopId);
      getFullInfoHotCash(route.params.shopId);
    }
    getAllCategories();
  }, []);

  const getFullInfoHotCash = async (id) => {
    const token = await AsyncStorage.getItem("token");
    const resp = await fetch(API + "hot-cashback/" + id + "/", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    setInfo(data);
    setCashback(data && data.cashback);
    setName(data && data.title);
    setAbout(data && data.description);
    setContact(data && data.phone);
    getAllCategories(data.categories[0]);
    getAllDate(data && data.ts_range);
  };
  const getAllDate = (dates) => {
    let arr = [];
    dates.map((el) => {
      arr.push({
        date: el.lower,
        style: { backgroundColor: "#01C65C" },
        textStyle: { color: "black" }, // sets the font color
        containerStyle: [], // extra styling for day container
        allowDisabled: false, // allow custom style to apply to disabled dates
      });
    });
    setCustomDatesStyles(arr);
    let to = `${
      new Date(dates[0].lower).getHours() <= 9
        ? "0" + new Date(dates[0].lower).getHours()
        : new Date(dates[0].lower).getHours()
    }:${
      new Date(dates[0].lower).getMinutes() <= 9
        ? "0" + new Date(dates[0].lower).getMinutes()
        : new Date(dates[0].lower).getMinutes()
    }`;
    let frm = `${
      new Date(dates[0].upper).getHours() <= 9
        ? "0" + new Date(dates[0].upper).getHours()
        : new Date(dates[0].upper).getHours()
    }:${
      new Date(dates[0].upper).getMinutes() <= 9
        ? "0" + new Date(dates[0].upper).getMinutes()
        : new Date(dates[0].upper).getMinutes()
    }`;

    setTime2(to);
    setTime1(frm);
  };
  const getAllCategories = async (name) => {
    const resp = await fetch(API + "category/");
    const data = await resp.json();
    let id = null;
    data &&
      data.map((el) => {
        if (name && name == el.name) id = el.name;
      });
    setCategories(data);

    setNameOfCategory(id ? id : "Kategoriyani tanlang");
    setSelectedId(name ? name : null);
  };
  const getAllAboutCategory = (el) => {
    setSelectedId(el ? el.id : null);

    setNameOfCategory(el ? el.name : "Kategoriyani tanlang");
  };

  const showTimePicker = () => {
    setShow(true);
  };
  const showTimePickerFrom = () => {
    setShowFrom(true);
  };
  const hideTimePicker = () => {
    setShow(false);
  };

  const hideTimePickerFrom = () => {
    setShowFrom(false);
  };

  const handleTimeFrom = (time) => {
    setTime2(
      `${time.getHours() <= 9 ? "0" + time.getHours() : time.getHours()}:${
        time.getMinutes() <= 9 ? "0" + time.getMinutes() : time.getMinutes()
      }`
    );
    hideTimePickerFrom();
  };

  const handleTime = (time) => {
    setTime1(
      `${time.getHours() <= 9 ? "0" + time.getHours() : time.getHours()}:${
        time.getMinutes() <= 9 ? "0" + time.getMinutes() : time.getMinutes()
      }`
    );
    hideTimePicker();
  };

  const choosePhotoFromGallery = async () => {
    let permissionResult =
      await ImagePicker.requestCameraRollPermissionsAsync();

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setImg(pickerResult);
  };
  const addPhotoToAccount = () => {
    const btns = ["Galereyadan tanlash", "Bekor qilish"];
    ActionSheet.show(
      {
        options: btns,
        cancelButtonIndex: 1,
        title: "Выберите способ...",
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            choosePhotoFromGallery();
            break;
          default:
            break;
        }
      }
    );
  };
  const saveCashBack = async () => {
    setViewLoader(true);
    const token = await AsyncStorage.getItem("token");
    const data = new FormData();
    let fH = Number(time2.split(":")[0]);
    let sH = Number(time1.split(":")[0]);
    let fM = Number(time2.split(":")[1]);
    let sM = Number(time1.split(":")[1]);

    let ts_range = [];
    customDatesStyles.forEach((el) => {
      let l = new Date(new Date(el.date).setHours(fH));
      l = new Date(new Date(l).setMinutes(fM));
      let u = new Date(new Date(el.date).setHours(sH));
      u = new Date(new Date(u).setMinutes(sM));
      ts_range.push({
        lower: l,
        upper: u,
      });
    });
    let s = new Date(selectedStartDate).setHours(fH, fM);
    let e = new Date(selectedEndDate).setHours(sH, sM);
    if (image == undefined && !info?.img) {
      setViewLoader(false);
      setAnswerModal(true);
      setModalTxt("добавьте фотографию");
    } else if (!selectedId) {
      setViewLoader(false);
      setAnswerModal(true);
      setModalTxt("Kategoriyani tanlang");
    } else {
      !cashId &&
        data.append("img", {
          name: `cash.png`,
          type: image.type + "/jpeg",
          uri:
            Platform.OS === "android"
              ? image.uri
              : image.uri.replace("file://", ""),
        });

      data.append("cashback", cashback);
      data.append("title", name);
      data.append("description", about);
      data.append("phone", contact);
      data.append("categories", JSON.stringify([selectedId]));
      data.append("ts_range", JSON.stringify(ts_range));
      let method = cashId ? "PATCH" : "POST";
      let url = cashId ? "hot-cashback/" + cashId + "/" : "hot-cashback/";

      const response = await fetch(API + url, {
        method: method, // или 'PUT'
        headers: {
          Authorization: "Bearer " + token,
          accept: "application/json",
          "Content-type": "multipart/form-data",
        },
        body: data,
      });

      response && setViewLoader(false);
      if (cashId) {
        setViewLoader(false);
        setAnswerModal(true);
        setModalTxt("Кэшбэк успешно обновлен");
      } else {
        setViewLoader(false);
        setAnswerModal(true);
        setModalTxt("Кэшбэк успешно создан");
      }
    }
  };
  const exit = () => {
    setAnswerModal(false);
    navigation.goBack();
  };
  return (
    <Root>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : null}
        style={styles.container}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollBox}
        >
          <AnimatedLoader
            visible={viewLoader}
            overlayColor='rgba(255,255,255,0.7)'
            source={require("../../../../Common/loader.json")}
            animationStyle={{ width: 100, height: 100 }}
            speed={1}
          >
            <Text>Сохранение...</Text>
          </AnimatedLoader>
          <View style={styles.headerBox}>
            <HeaderInStackScreens />
          </View>

          <View style={styles.infoInputsBox}>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>Фотографии</Text>
              <View style={{ width: "100%" }}>
                <View style={styles.mainImgBox}>
                  <TouchableOpacity
                    style={styles.deletePhotoBtn}
                    onPress={addPhotoToAccount}
                  >
                    <Image
                      style={{
                        width: scalePoint * 15,
                        height: scalePoint * 15,
                        resizeMode: "contain",
                      }}
                      source={addPhotoIcon}
                    />
                  </TouchableOpacity>

                  <Image
                    style={styles.addPhotoBox}
                    source={{
                      uri: (image && image.uri) || (info && info.img),
                    }}
                  />
                </View>
              </View>
              {/* <View style={styles.addPhotoSection}>
                <Image
                  style={styles.addPhotoBox}
                  source={{ uri: (image && image.uri) || (info && info.img) }}
                />
              </View>

              <View style={styles.addPhotoSection}>
                <TouchableOpacity
                  style={styles.addPhotoBox}
                  onPress={addPhotoToAccount}
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
              </View> */}
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>Toifalar</Text>
              <TouchableOpacity
                style={styles.inputBox}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.pick}>{nameOfCategory}</Text>
                {/* {categories && (
                <RNPickerSelect
                  items={categories}
                  placeholder={{
                    label: 'Kategoriyani tanlang',
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
              <Text style={styles.infoBoxText}>Название</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder={cashbackName}
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
              </View>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>О горящем кэшбэке</Text>
              <View style={styles.descriptionInputBox}>
                <TextInput
                  style={styles.descriptionTxt}
                  multiline={true}
                  numberOfLines={5}
                  placeholder={aboutUsInfo}
                  value={about}
                  onChangeText={(text) => setAbout(text)}
                />
              </View>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>Кэшбэк</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder={cashbacksPrecent}
                  value={cashback}
                  onChangeText={(text) => setCashback(text)}
                />
              </View>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>Контакты</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.textInputStyle}
                  keyboardType='number-pad'
                  placeholder='996'
                  value={contact}
                  onChangeText={(text) => setContact(text)}
                  maxLength={12}
                />
              </View>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>Календарь</Text>
              <View style={styles.calendarBox}>
                <Calendar
                  all={customDatesStyles}
                  setCustomDatesStyles={(value) => setCustomDatesStyles(value)}
                />
              </View>
            </View>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxText}>Рабочее время</Text>
            <View style={{ paddingVertical: "3%" }}>
              <View style={styles.timeBox}>
                <TouchableOpacity
                  onPress={showTimePickerFrom}
                  style={styles.timePickerStyle}
                >
                  <Text style={styles.timePickerText}>{time2}</Text>
                  <TimePickerModal
                    onConfirm={handleTimeFrom}
                    onCancel={hideTimePickerFrom}
                    mode='time'
                    isVisible={showFrom}
                    date={timeFrom}
                    display='spinner'
                    is24Hour={true}
                  />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, marginHorizontal: "5%" }}>-</Text>
                <TouchableOpacity
                  onPress={showTimePicker}
                  style={styles.timePickerStyle}
                >
                  <Text style={styles.timePickerText}>{time1}</Text>
                  <TimePickerModal
                    onConfirm={handleTime}
                    onCancel={hideTimePicker}
                    mode='time'
                    isVisible={show}
                    date={times}
                    display='spinner'
                    is24Hour={true}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.btnBox}>
              <TouchableOpacity
                style={styles.declineBtn}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.declineBtnTxt}>Отменить</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={saveCashBack}>
                <Text style={styles.saveBtnTxt}>Saqlab qolish</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ModalCategories
            cat={modalVisible}
            setCat={setModalVisible}
            category={categories}
            funcOk={getAllAboutCategory}
          />
          <DialogAlert
            answerModal={answerModal}
            setAnswerModal={setAnswerModal}
            message={modalTxt}
            visible='none'
            funcOk={() => {
              modalTxt == "добавьте фотографию" ||
              modalTxt == "Kategoriyani tanlang"
                ? setAnswerModal(false)
                : exit();
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Root>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  pick: {
    color: "grey",
    padding: "5%",
    fontSize: 14,
  },
  scrollBox: {
    width: "95%",
    alignSelf: "center",
  },
  headerBox: {
    width: "95%",
    alignSelf: "center",
    height: scalePoint * 23,
    marginTop: Platform.OS === "ios" ? "15%" : "5%",
  },
  accountImgFirstShadowCircle: {
    width: firstCircleSize,
    height: firstCircleSize,
    backgroundColor: "#fff",
    borderRadius: firstCircleRadius,
    justifyContent: "center",
    shadowColor: "#000",
    shadowRadius: 13,
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  accountImgSecondShadowCircle: {
    width: secondCircleSize,
    height: secondCircleSize,
    backgroundColor: "#fff",
    borderRadius: secondCircleRadius,
    justifyContent: "center",
    shadowColor: "#000",
    shadowRadius: 13,
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: "#fff",
    elevation: 8,
  },
  accountImgThirdShadowCircle: {
    shadowColor: "#000",
    shadowRadius: 13,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: -1,
      height: 0,
    },
    elevation: 8,
    backgroundColor: "#fff",
    borderRadius: thirdCircleRadius,
    width: thirdCircleSize,
    height: thirdCircleSize,
    alignItems: "center",
    alignSelf: "center",
  },
  mainImgBox: {
    width: scalePoint * 100,
    height: scalePoint * 80,
    borderRadius: scalePoint * 10,
    borderWidth: 1,
    borderColor: "#256196",
    marginRight: scalePoint * 10,
    marginTop: "2%",
    justifyContent: "center",
  },
  deletePhotoBtn: {
    width: scalePoint * 20,
    height: scalePoint * 20,
    borderRadius: scalePoint * 20 * 0.5,
    backgroundColor: "#01C65C",
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    right: scalePoint * 5,
    top: scalePoint * 5,
    zIndex: 999,
  },
  profileInfoBox: {
    marginTop: "24%",
    alignItems: "center",
  },
  infoInputsBox: {
    marginBottom: "5%",
  },
  infoBox: {
    alignItems: "center",
    marginTop: "5%",
  },
  infoBoxText: {
    alignSelf: "flex-start",
    marginLeft: "10%",
    fontSize: 16,
    lineHeight: 22,
    color: "#515151",
  },
  descriptionInputBox: {
    width: "100%",
    height: scalePoint * 111,
    marginTop: "1%",
    borderColor: "#225196",
    borderWidth: 1,
    borderRadius: 10,
  },
  inputBox: {
    width: "100%",
    marginTop: "1%",
    borderColor: "#225196",
    borderWidth: 1,
    borderRadius: 10,
  },
  calendarBox: {
    width: "100%",
    borderColor: "#225196",
    borderWidth: 1,
    borderRadius: 10,
  },
  inputBox1: {
    width: "91%",
    marginTop: "3%",
    borderColor: "#225196",
    borderWidth: 1,
    flexDirection: "row",
    borderRadius: 10,
  },
  descriptionTxt: {
    width: "90%",
    marginVertical: "5%",
    marginLeft: "5%",
    fontSize: 16,
    lineHeight: 18,
  },
  textInputStyle: {
    width: "90%",
    paddingVertical: "5%",
    marginLeft: "5%",
    fontSize: 16,
    lineHeight: 18,
  },
  workTimeBox: {
    flexDirection: "row",
  },
  workDaysAndTimeBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "4%",
    width: "50%",
  },
  dayTimeText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#8d8d8d",
  },
  timeBox: {
    width: "90%",
    alignItems: "center",
    flexDirection: "row",
  },
  timePickerStyle: {
    borderWidth: 1,
    borderRadius: 4,
    width: "45%",
    alignItems: "center",
    borderColor: "#225196",
    justifyContent: "center",
  },
  timePickerText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#515151",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: "10%",
    paddingHorizontal: "20%",
  },
  addPhotoSection: {
    marginTop: "2%",
    width: "100%",
    marginLeft: "8%",
    justifyContent: "center",
  },
  addPhotoBox: {
    width: "99%",
    height: scalePoint * 77.5,
    borderRadius: scalePoint * 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  btnBox: {
    marginTop: "5%",
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    marginBottom: "10%",
  },
  declineBtn: {
    width: "48%",
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#01C65C",
    justifyContent: "center",
  },
  saveBtn: {
    width: "48%",
    height: 45,
    borderRadius: 10,
    backgroundColor: "#01C65C",
    justifyContent: "center",
  },
  declineBtnTxt: {
    fontSize: 14,
    lineHeight: 16,
    alignSelf: "center",
    color: "#01C65C",
  },
  saveBtnTxt: {
    fontSize: 14,
    lineHeight: 16,
    alignSelf: "center",
    color: "#fff",
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: "black",
    height: scalePoint * 45,
    marginLeft: scalePoint * 30,
  },
  inputAndroid: {
    fontSize: 16,
    color: "black",
    height: scalePoint * 45,
    marginLeft: scalePoint * 30,
  },
});
