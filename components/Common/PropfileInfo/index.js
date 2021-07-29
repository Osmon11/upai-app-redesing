import React, { useState } from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";

import emptyProfileAccountImg from "../../Images/emptyProfileAccountImg.png";
import AsyncStorage from "@react-native-community/async-storage";
import { API } from "../../config";

const width = Dimensions.get("window").width;
const scalePoint = width / 380;

export default function ProfileInfo({ nav }) {
  const [data, setData] = useState([]);
  const [businessStatus, setBusinessStatus] = useState(true);

  React.useEffect(() => {
    setData([]);
    getFullInfo();
  }, [nav]);
  const getFullInfo = async () => {
    const token = await AsyncStorage.getItem("token");
    const resp = await fetch(API + "users/profile/", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    setData(data);
  };
  return (
    <View style={styles.profileInfo}>
      <View style={styles.halfSideBox}>
        <View style={styles.profileImage}>
          <View
            style={
              data.avatar !== null ? styles.photoShadow : styles.emptyPhoto
            }
          >
            <Image
              style={styles.accountImg}
              source={
                data.avatar !== null
                  ? { uri: data.avatar }
                  : emptyProfileAccountImg
              }
            />
          </View>
        </View>
        <View style={styles.accountInfo}>
          <Text style={styles.accountName}>
            {data && data?.fullname && String(data?.fullname).length > 15
              ? String(data?.fullname).substring(0, 15) + "..."
              : data?.fullname
              ? data?.fullname
              : ""}
          </Text>
          <Text style={styles.accountID}>{data ? data.phone : null}</Text>
        </View>
        <View style={businessStatus ? styles.cashSumBox : { display: "none" }}>
          <Text style={styles.cashSumTxt}>{data && data.balance} сом</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileInfo: {
    width: "93%",
    alignSelf: "center",
    zIndex: 0,
  },
  halfSideBox: {
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
  },
  profileImage: {
    marginRight: scalePoint * 13,
  },
  accountImg: {
    width: scalePoint * 60,
    height: scalePoint * 60,
    resizeMode: "cover",
    borderRadius: scalePoint * 10,
  },
  photoShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: scalePoint * 10,
    borderColor: "rgba(146,146,146,0.3)",
  },
  emptyPhoto: {
    backgroundColor: "#fff",
  },
  accountInfo: {
    marginLeft: "2%",
    width: "53%",
    justifyContent: "center",
    alignSelf: "center",
  },
  accountName: {
    fontSize: 16,
    lineHeight: 19,
  },
  accountID: {
    marginTop: "1%",
    fontSize: 14,
    lineHeight: 16,
    color: "#8d8d8d",
  },
  cashSumBox: {
    width: "30%",
    height: scalePoint * 38,
    width: scalePoint * 78,
    borderRadius: scalePoint * 5,
    backgroundColor: "#01C65C",
    justifyContent: "center",
    alignItems: "center",
  },
  cashSumTxt: {
    fontSize: 12,
    color: "#fff",
  },
});
