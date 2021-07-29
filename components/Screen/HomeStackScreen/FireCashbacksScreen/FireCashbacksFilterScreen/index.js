import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import HeaderInStackScreens from "../../../../Common/HeaderInStackScreens";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import { API } from "../../../../config";
import DialogAlert from "../../../../Common/DialogAlert";
import arrowDown from "../../../../Images/arrowDownIcon.png";
import SortFilter from "../../CategoriesStackScreen/CategoriesScreen/FilterScreen/SortFilter";
import ModalCategories from "../../CategoriesStackScreen/CategoriesScreen/FilterScreen/ModalCategories";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;

export default function FireCashbacksFilterScreen({ route }) {
  const navigation = useNavigation();

  const [choice, setChoice] = useState({
    label: "По рейтингу",
    value: "rating",
  });
  const [selectedValue, setSelectedValue] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState();
  const [categories, setCategories] = useState([]);
  const [answerModal, setAnswerModal] = useState(false);
  const [sortModal, setSortModal] = useState(false);
  const [modalTxt, setModalTxt] = useState();
  const [nameOfCategory, setNameOfCategory] = useState("Выберите категорию");
  const [selectedName, setSelectedName] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const { name } = route?.params;

  React.useEffect(() => {
    getAllCategories();

    return () => {
      setSortModal(false);
    };
    BackHandler.addEventListener("hardwareBackPress", handleBackButton());
  }, [navigation]);
  const handleBackButton = () => {
    setSortModal(false);
  };

  const getAllCategories = async () => {
    const resp = await fetch(API + "category/");
    const data = await resp.json();
    let id = null;
    data &&
      data.map((el) => {
        if (name && name == el.name) id = el.id;
      });
    setCategories(data);

    setSelectedName(name != "hot-cashback" ? name : null);
    setNameOfCategory(name != "hot-cashback" ? name : "Выберите категорию");
    setSelectedId(id ? id : null);
  };
  const getAllAboutCategory = (el) => {
    setSelectedId(el ? el.id : null);
    setSelectedName(el ? el.name : null);
    setNameOfCategory(el ? el.name : "Выберите категорию");
  };
  const callDialog = () => {
    setAnswerModal(true);
    setModalTxt("Выберите категорию");
  };
  const getResult = (value) => {
    setChoice(value);
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainBox}>
        <View style={styles.headerBox}>
          <HeaderInStackScreens />
        </View>
        <View style={styles.mainContentBox}>
          <Text style={styles.mainText}>Фильтры</Text>
          <View style={styles.categoriesBox}>
            <Text style={styles.dropDownsText}>Категории</Text>
            <TouchableOpacity
              style={styles.categoryFilterBox}
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
          <View style={styles.dropDownsBox}>
            <Text style={styles.dropDownsText}>Сортировать</Text>
            <TouchableOpacity
              onPress={() => setSortModal(true)}
              style={styles.categoryFilterBox}
            >
              <Text style={styles.categoryFilterText}>{choice.label}</Text>
              <Image source={arrowDown} style={styles.arrowDown} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() =>
              selectedName == null && selectedId == null
                ? callDialog()
                : navigation.navigate("SingleCategoryScreen", {
                    name: selectedName,
                    category: selectedId,
                    filter: choice.value,
                  })
            }
          >
            <Text style={styles.btnText}>Фильтровать</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DialogAlert
        answerModal={answerModal}
        setAnswerModal={setAnswerModal}
        message={modalTxt}
        funcOk={() => setAnswerModal(false)}
      />
      <ModalCategories
        cat={modalVisible}
        setCat={setModalVisible}
        category={categories}
        funcOk={getAllAboutCategory}
      />
      <SortFilter
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
    backgroundColor: "#fff",
    zIndex: 1,
  },
  mainBox: {
    width: "95%",
    alignSelf: "center",
  },
  headerBox: {
    marginTop: Platform.OS === "ios" ? "15%" : "10%",
    width: "100%",
    height: scalePoint * 45,
  },
  mainContentBox: {
    width: "100%",
  },
  mainText: {
    marginLeft: "5%",
    fontSize: 24,
    lineHeight: 28,
  },
  categoriesBox: {
    marginTop: "10%",
  },
  dropDownsStyle: {
    padding: "5%",
  },
  dropDownsText: {
    fontSize: 20,
    lineHeight: 24,
  },
  categoryFilterBox: {
    width: "100%",
    height: scalePoint * 46,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#225196",
    borderRadius: 6,
    marginTop: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryFilterText: {
    fontSize: 16,
    lineHeight: 18,
    color: "rgba(13,32,59, 0.4)",
    marginLeft: scalePoint * 18,
    fontFamily: "Roboto",
  },
  arrowDown: {
    width: scalePoint * 20,
    height: scalePoint * 20,
    marginRight: scalePoint * 20,
  },
  dropDownsBox: {
    marginTop: "5%",
    marginBottom: "10%",
  },
  filterBtn: {
    alignSelf: "center",
    width: scalePoint * 150,
    height: scalePoint * 45,
    borderRadius: scalePoint * 10,
    backgroundColor: "#01C65C",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 16,
    lineHeight: 18,
    color: "#fff",
    alignSelf: "center",
  },
  pick: {
    fontSize: 16,
    lineHeight: 18,
    color: "rgba(13,32,59, 0.4)",
    marginLeft: scalePoint * 18,
    fontFamily: "Roboto",
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: "5%",
    color: "black",
  },
  inputAndroid: {
    fontSize: 16,
    padding: "5%",
    color: "black",
  },
});
