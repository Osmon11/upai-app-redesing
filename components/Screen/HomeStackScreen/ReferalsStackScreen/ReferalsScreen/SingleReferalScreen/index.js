import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";

import { Card } from "react-native-shadow-cards";

import HeaderInStackScreens from "../../../../../Common/HeaderInStackScreens";
import AsyncStorage from "@react-native-community/async-storage";
import EmptyAvatar from "../../../../../Images/emptyProfileAccountImg.png";
import { API } from "../../../../../config";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;

export default function SingleReferalScreen({ route }) {
  const [one, setOnest] = React.useState();
  const { data } = route.params;

  React.useEffect(() => {
    if (data) {
      getRefByID();
    }
  }, [data]);

  const getRefByID = async () => {
    const token = await AsyncStorage.getItem("token");
    const resp = await fetch(API + "users/referral/" + data?.id + "/revenue/", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const datas = await resp.json();
    setOnest(datas.results);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.headerBox}>
          <HeaderInStackScreens />
        </View>
        <View style={styles.showbleView}>
          <View style={styles.namePageView}>
            <Text style={styles.namePage}>Мои рефералы</Text>
          </View>
        </View>
        <View>
          <View
            style={styles.referalsListItem}
            onPress={() => navigation.navigate("SingleReferalScreen")}
          >
            <View style={styles.imgBox}>
              <Image
                style={styles.imgStyle}
                source={
                  data.avatar !== null ? { uri: data.avatar } : EmptyAvatar
                }
              />
            </View>
            <View
              style={{
                width: "60%",
              }}
            >
              <Text style={styles.nameTxt}>
                {Boolean(data.fullname) ? data.fullname : "Нет имени"}
              </Text>
              <View
                style={{
                  marginTop: "3%",
                  flexDirection: "row",
                }}
              >
                <Text style={styles.smallTxt}>{data.phone}</Text>
                <Text style={styles.smallTxt}>
                  {data.created.split("T")[0]}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "20%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.sumNumber}>{data.total_revenue}</Text>
              <Text style={styles.sumTxt}>сом</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: "6%",
            }}
          >
            <Card
              style={{
                width: "100%",
              }}
            >
              <View style={styles.tableStyles}>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <View style={styles.leftBlockStyles}>
                    <Text style={styles.tableMainTxt}>Sana</Text>
                  </View>
                  <View style={styles.rightBlockStyles}>
                    <Text style={styles.tableMainTxt}>Кэшбэк</Text>
                  </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {one?.map((item, index) => (
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "center",
                      }}
                      key={index}
                    >
                      <View style={styles.leftBlockStyles}>
                        <Text style={styles.tableSmallTxt}>{item.created}</Text>
                      </View>
                      <View style={styles.rightBlockStyles}>
                        <Text style={styles.tableSmallTxt}>
                          {item.amount} сом
                        </Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </Card>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContent: {
    width: "90%",
    alignSelf: "center",
  },
  headerBox: {
    marginTop: Platform.OS === "ios" ? "15%" : "5%",
    width: "100%",
    height: scalePoint * 23,
  },
  showbleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "10%",
  },
  namePage: {
    color: "#313131",
    fontSize: 24,
    lineHeight: 26,
  },
  referalsListItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    paddingBottom: "5%",
  },
  imgBox: {
    width: scalePoint * 50,
    height: scalePoint * 50,
    borderRadius: scalePoint * 50 * 0.5,
    marginRight: "3%",
  },
  imgStyle: {
    width: scalePoint * 50,
    height: scalePoint * 50,
    resizeMode: "contain",
    borderRadius: scalePoint * 50 * 0.5,
  },
  nameTxt: {
    fontSize: 16,
    lineHeight: 18,
    color: "#515151",
  },
  smallTxt: {
    fontSize: 12,
    lineHeight: 13,
    color: "#8e8e8e",
    marginRight: "5%",
  },
  sumNumber: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "bold",
  },
  sumTxt: {
    fontSize: 10,
    lineHeight: 12,
    color: "#515151",
  },
  tableStyles: {
    width: "100%",
    backgroundColor: "#fff",
    height: scalePoint * 312,
    borderRadius: 10,
  },
  leftBlockStyles: {
    width: "50%",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ebebeb",
    alignItems: "center",
  },
  tableMainTxt: {
    fontSize: 16,
    lineHeight: 19,
    color: "#515151",
    paddingVertical: "8%",
  },
  tableSmallTxt: {
    fontSize: 16,
    lineHeight: 19,
    color: "#7d7d7d",
    paddingVertical: "8%",
  },
  rightBlockStyles: {
    width: "50%",
    borderBottomWidth: 1,
    borderColor: "#ebebeb",
    alignItems: "center",
  },
});
