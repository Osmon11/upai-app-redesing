import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import HeaderInStackScreens from "../../../../Common/HeaderInStackScreens";
import EmptyComponent from "../../../../Common/EmptyComponent";
import EmptyAvatar from "../../../../Images/emptyProfileAccountImg.png";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;

export default function MyReferalsScreen({ route }) {
  const { all } = route.params;
  const navigation = useNavigation();
  console.log("data", route?.params);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "position" : null}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollBox}>
        <View style={styles.headerBox}>
          <HeaderInStackScreens />
        </View>
        <View style={styles.mainContentBox}>
          <Text style={styles.mainText}>Мои рефералы</Text>
        </View>

        <View>
          {all && all.length > 0 ? (
            all.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.referalsListItem}
                onPress={() =>
                  navigation.navigate("SingleReferalScreen", { data: item })
                }
              >
                <View style={styles.imgBox}>
                  <Image
                    style={styles.imgStyle}
                    source={
                      item.avatar !== null ? { uri: item.avatar } : EmptyAvatar
                    }
                  />
                </View>
                <View
                  style={{
                    width: "60%",
                  }}
                >
                  <Text style={styles.nameTxt}>
                    {Boolean(item.fullname) ? item.fullname : "Нет имени"}
                  </Text>
                  <View
                    style={{
                      marginTop: "3%",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={styles.smallTxt}>{item.phone}</Text>
                    <Text style={styles.smallTxt}>
                      {item.created.split("T")[0]}
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
                  <Text style={styles.sumNumber}>{item.total_revenue}</Text>
                  <Text style={styles.sumTxt}>сом</Text>
                </View>
              </TouchableOpacity>
              /// if list empty use
            ))
          ) : (
            <View
              style={{
                marginTop: "30%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EmptyComponent />
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollBox: {
    width: "95%",
    alignSelf: "center",
  },
  headerBox: {
    marginTop: Platform.OS === "ios" ? "15%" : "10%",
    width: "100%",
    height: scalePoint * 23,
  },
  mainContentBox: {
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "5%",
    marginRight: "5%",
  },
  mainText: {
    fontSize: 24,
    lineHeight: 28,
  },
  referalsListItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
    borderBottomWidth: 1,
    borderColor: "#ebebeb",
    paddingBottom: "5%",
    marginLeft: "2%",
  },
  imgBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: "3%",
  },
  imgStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "contain",
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
});
