import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import moment from "moment";

import myBuysLikeIcon from "../../../Images/myBuysLikeIcon.png";
import myBuysCashsSumIcon from "../../../Images/myBuysCashsSumIcon.png";
import myBuysSumIcon from "../../../Images/myBuysSumIcon.png";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;

export default function MyBuys(props) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.nameOfCategoryGroup}>Мои покупки</Text>
          </View>
          <TouchableOpacity
            style={styles.allPageBtn}
            onPress={() => {
              navigation.navigate("BuyHistoryScreen");
            }}
          >
            <Text style={styles.allPageBtnTxt}>Все</Text>
          </TouchableOpacity>
        </View>
        <View>
          {props.purchase && props.purchase?.length != 0 ? (
            props.purchase.map((item, index) => (
              <View style={styles.shadowCard} key={index}>
                <View style={styles.buyCard}>
                  <View style={styles.leftSide}>
                    <View style={styles.imageBox}>
                      <Image
                        style={styles.image}
                        source={{ uri: item.shop_logo }}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("CompanyScreen", {
                          itemId: item.seller,
                        })
                      }
                      style={styles.reviewBtnBox}
                    >
                      <Image
                        style={styles.reviewIcon}
                        source={myBuysLikeIcon}
                      />
                      <Text style={styles.reviewBtnTxt}>Оставить отзыв</Text>
                    </TouchableOpacity>
                    <Text style={styles.date}>
                      {moment(item.created).format("DD.MM.YYYY")}
                    </Text>
                  </View>
                  <View style={styles.rightSide}>
                    <Text style={styles.shopName}>
                      {String(item.shop_name).length > 16
                        ? String(item.shop_name).substr(0, 16) + "..."
                        : item.shop_name}
                    </Text>
                    <View style={styles.cashbackSumBox}>
                      <View style={styles.buySumBox}>
                        <Image style={styles.buyIcon} source={myBuysSumIcon} />
                        <Text style={styles.buySumTxt}>{item.amount} сом</Text>
                      </View>
                      <View style={styles.cashbackBox}>
                        <Image
                          style={styles.buyIcon}
                          source={myBuysCashsSumIcon}
                        />
                        <Text style={styles.buySumTxt}>
                          {item.cashback} сом
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text>Покупок пока нет</Text>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  nameOfCategoryGroup: {
    fontSize: 16,
    lineHeight: 18,
  },
  allPageBtn: {
    justifyContent: "center",
  },
  allPageBtnTxt: {
    fontSize: 12,
    lineHeight: 14,
    alignSelf: "center",
    color: "#8d8d8d",
  },
  shadowCard: {
    width: "100%",
    borderRadius: 10,
    marginTop: scalePoint * 13,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1,

    elevation: 3,
  },
  buyCard: {
    alignSelf: "center",
    width: "100%",
    height: scalePoint * 86,
    borderWidth: 0.5,
    borderColor: " rgba(146, 146, 146, 0.37)",
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  leftSide: {
    width: "50%",
    marginTop: scalePoint * 9,
    marginBottom: scalePoint * 13,
    borderRightWidth: 1,
    borderRightColor: "#ebebeb",
    alignItems: "center",
  },
  rightSide: {
    width: "50%",
    marginTop: scalePoint * 14,
    marginBottom: scalePoint * 13,
    borderRightWidth: 1,
    borderRightColor: "#ebebeb",
    alignItems: "center",
  },
  imageBox: {
    width: scalePoint * 37,
    height: scalePoint * 37,
    borderRadius: scalePoint * 37 * 0.5,
    justifyContent: "center",
    alignSelf: "center",
  },
  image: {
    width: scalePoint * 37,
    height: scalePoint * 37,
    borderRadius: scalePoint * 37 * 0.5,
    resizeMode: "cover",
  },
  reviewBtnBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: scalePoint * 7,
  },
  reviewIcon: {
    width: scalePoint * 13,
    height: scalePoint * 13,
    resizeMode: "contain",
    marginTop: "-5%",
  },
  reviewBtnTxt: {
    fontSize: 10,
    lineHeight: 12,
    marginLeft: scalePoint * 4,
    marginTop: "-2%",
    fontFamily: "RobotoLight",
  },
  date: {
    fontSize: 10,
    lineHeight: 12,
    color: "#8d8d8d",
    fontFamily: "RobotoLight",
    marginTop: "2%",
  },
  shopName: {
    fontSize: 14,
    lineHeight: 16,
    color: "#313131",
  },
  cashbackSumBox: {
    marginTop: scalePoint * 13,
  },
  buySumBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buyIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
  buySumTxt: {
    fontSize: 10,
    lineHeight: 12,
    color: "#515151",

    marginLeft: scalePoint * 3,
    fontFamily: "RobotoLight",
  },
  cashbackBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: scalePoint * 5,
  },
});
