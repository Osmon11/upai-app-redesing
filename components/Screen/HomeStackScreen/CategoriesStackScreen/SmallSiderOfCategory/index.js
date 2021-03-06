import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import smallSliderOfCategoryImg from "../../../../Images/smallSliderOfCategoryImg.png";

import percentIcon from "../../../../Images/percentIcon.png";
import RatingComponent from "../RatingComponent";
import { API } from "../../../../config";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;

export default function SmallSliderOfCategory({ categoryName, category }) {
  const navigation = useNavigation();
  const [data, setData] = React.useState();
  React.useEffect(() => {
    getAllCatById();
  }, []);
  const getAllCatById = async () => {
    let resp = await fetch(
      API + "shop/?offset=0&category=" + category + "&limit=5"
    );
    let req = await resp.json();
    setData(req.results);
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.categoryGroupBox}>
          <Text style={styles.nameOfCategoryGroup}>{categoryName}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SingleCategoryScreen", {
                category: category,
                name: categoryName,
              })
            }
          >
            <Text style={styles.allBtnTxt}>Barchasi</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: "2%" }}
        >
          {data && data.length != 0
            ? data.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={index === 0 ? styles.firstImageBox : styles.imageBox}
                  onPress={() =>
                    navigation.navigate("CompanyScreen", { itemId: item.id })
                  }
                >
                  <View style={styles.cashbacksCircle}>
                    <View style={styles.percentCircle}>
                      <Image
                        style={{
                          width: scalePoint * 10,
                          height: scalePoint * 10,
                          resizeMode: "contain",
                        }}
                        source={percentIcon}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        lineHeight: 14,
                        color: "#fff",
                      }}
                    >
                      {item.cashback}%
                    </Text>
                  </View>
                  <Image
                    style={styles.image}
                    source={{ uri: item.main_image }}
                  />
                  <View style={{ marginTop: scalePoint * 6 }}>
                    <Text style={styles.nameOfItem}>
                      {item.name.length > 16
                        ? item.name.substring(0, 16) + "..."
                        : item.name}
                    </Text>
                    <View style={styles.nameOfItem}>
                      <RatingComponent
                        reviewStatus={true}
                        rate={item.rate}
                        review={item.total_review}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            : null}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    zIndex: -1,
    marginTop: scalePoint * 25,
  },
  categoryGroupBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    alignSelf: "center",
  },
  nameOfCategoryGroup: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: "Roboto",
  },
  allBtnTxt: {
    fontSize: 14,
    lineHeight: 18,
  },
  cashbacksCircle: {
    width: scalePoint * 45,
    height: scalePoint * 45,
    borderRadius: scalePoint * 45 * 0.5,
    backgroundColor: "#ff0707",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    alignSelf: "flex-end",
    right: "5%",
    top: "5%",
    zIndex: 9,
  },
  percentCircle: {
    position: "absolute",
    top: "60%",
    left: "-10%",
    zIndex: 10,
    width: scalePoint * 16,
    height: scalePoint * 16,
    borderRadius: scalePoint * 16 * 0.5,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#27ae60",
    justifyContent: "center",
    alignItems: "center",
  },
  firstImageBox: {
    marginRight: scalePoint * 10,
    marginLeft: scalePoint * 10,
    width: scalePoint * 150,
    height: scalePoint * 150,
  },
  imageBox: {
    marginRight: scalePoint * 10,
    width: scalePoint * 150,
    height: scalePoint * 75,
  },
  image: {
    borderWidth: 0.5,
    borderColor: "rgba(146, 146, 146, 0.37)",
    borderRadius: scalePoint * 10,
    width: scalePoint * 150,
    height: scalePoint * 75,
  },
  nameOfItem: {
    fontSize: 16,
    lineHeight: 18,
    marginTop: scalePoint * 2,
  },
});
