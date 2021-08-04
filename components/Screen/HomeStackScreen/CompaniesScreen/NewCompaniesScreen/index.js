import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";

import Header from "../../../../Common/Header";
import { useNavigation } from "@react-navigation/native";

import RatingComponent from "../../CategoriesStackScreen/RatingComponent";
import { API } from "../../../../config";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;
import AnimatedLoader from "react-native-animated-loader";

import percentIcon from "../../../../Images/percentIcon.png";
export default function NewCompaniesScreen({ route }) {
  const [newCash, setNewCash] = useState([]);
  const [viewLoader, setViewLoader] = React.useState(true);

  useEffect(() => {
    getAllNewCashBack();
  }, []);

  const getAllNewCashBack = async () => {
    const resp = await fetch(API + "shop/?ordering=newest&limit=100");
    const data = await resp.json();
    setNewCash(data.results);
    data && setViewLoader(false);
  };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AnimatedLoader
        visible={viewLoader}
        overlayColor='rgba(255,255,255,1)'
        source={require("../../../../Common/loader.json")}
        animationStyle={{ width: 100, height: 100 }}
        speed={1}
      ></AnimatedLoader>
      <ScrollView
        style={styles.scrollStyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerStyle}>
          <Header />
        </View>
        <View>
          <Text style={styles.mainText}>Yangiliklar</Text>
        </View>
        <View style={styles.mainContentBox}>
          <View style={styles.scrollItem}>
            {newCash
              ? newCash.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={
                        (index + 1) % 2 === 0
                          ? styles.imageBox2
                          : styles.imageBox
                      }
                      onPress={() =>
                        navigation.navigate("CompanyScreen", {
                          itemId: item.id,
                        })
                      }
                    >
                      <View style={styles.cashbacksCircle}>
                        <View style={styles.percentCircle}>
                          <Image
                            style={{
                              width: scalePoint * 10,
                              height: scalePoint * 10,
                              borderRadius: scalePoint * 10 * 0.5,
                              resizeMode: "contain",
                              marginTop: "10%",
                              marginLeft: "15%",
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
                      <Image style={styles.image} source={{ uri: item.logo }} />
                      <View style={{ marginLeft: "1%" }}>
                        <Text style={styles.nameOfItem}>{item.name}</Text>
                        <View style={styles.nameOfItem}>
                          <RatingComponent
                            reviewStatus={true}
                            rate={item.rate}
                            review={item.total_review}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })
              : ""}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollStyle: {
    width: "95%",
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? "5%" : 0,
  },
  headerStyle: {
    marginTop: Platform.OS === "ios" ? "15%" : "5%",
    marginBottom: "10%",
  },
  mainText: {
    fontSize: 24,
    lineHeight: 28,
  },
  mainContentBox: {
    width: "100%",
  },
  cashbacksCircle: {
    width: scalePoint * 45,
    height: scalePoint * 45,
    borderRadius: scalePoint * 45 * 0.5,
    backgroundColor: "#ff0707",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 9,
    top: scalePoint * 5,
    right: scalePoint * 5,
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
  },
  nameOfCategoryGroup: {
    fontSize: 16,
    lineHeight: 18,
    marginLeft: "5%",
  },
  scrollItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "95%",
    justifyContent: "space-between",
    marginTop: "5%",
  },
  imageBox: {
    width: scalePoint * 160,
    marginRight: "5%",
    marginBottom: scalePoint * 39,
  },
  imageBox2: {
    width: scalePoint * 160,
    marginTop: "-8%",
  },
  image: {
    borderWidth: 0.5,
    borderColor: "rgba(146, 146, 146, 0.37)",
    borderRadius: 10,
    width: scalePoint * 160,
    height: scalePoint * 160,
    resizeMode: "cover",
  },
  nameOfItem: {
    paddingLeft: "5%",
    paddingTop: "2%",
    fontSize: 16,
    lineHeight: 18,
  },
});
