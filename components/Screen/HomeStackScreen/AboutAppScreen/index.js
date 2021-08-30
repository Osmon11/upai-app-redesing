import Constants from "expo-constants";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import HeaderInStackScreens from "../../../Common/HeaderInStackScreens";
import oracleLogo from "../../../Images/OracleLogo.png";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;

export default function AboutAppScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContent}>
          <View style={styles.headerBox}>
            <HeaderInStackScreens />
          </View>
          <View>
            <Text style={styles.contentName}>Dastur haqida</Text>
            <Text style={styles.contentTxt}>
              <Text style={styles.boldTxt}>Upai </Text> - bu keshbek xizmati
              bo'lib, unda foydalanuvchi real pulga sarflangan summaning bir
              qismini olish orqali xaridlarni tejashi mumkin, va tadbirkorlik
              sub'ekti sotishni ko'paytiradi va sodiq mijozlarni oladi.
            </Text>
            <Text style={styles.contentName}>Upai (hamkorlar uchun)</Text>
            <Text style={styles.contentTxt}>
              <Text style={styles.boldTxt}>Upai </Text> - bu sizning biznes
              Sherigingiz. Bizning vazifamiz sizga ko'proq mijozlarni jalb
              qilishdir, ularga Upai xizmati orqali keshbek o'tkazasiz. Siz o'z
              tovarlaringiz va xizmatlaringizni sotishdan daromad olasiz, sodiq
              mijozlar topasiz, reklamaga tejaysiz.
            </Text>
            <Text style={styles.contentTxt}>
              Barchasi sizga biznes profilini ochish orqali Upai tizimiga
              qo'shilish, bizning xizmatimizdagi shaxsiy hisobingizni
              to'ldirish, pul mablag'lari mijozlarga naqd pul ko'rinishida
              o'tkaziladi, xizmat esa naqd pul miqdorining ma'lum foizini oladi.
              xizmatlar uchun komissiya sifatida. Keshbekka foiz stavkasini
              O'zingiz belgilashingiz mumkin.
            </Text>
          </View>
          <View>
            <Text style={styles.companyTxt}>
              Kompaniya tomonidan ishlab chiqilgan va qo'llab –quvvatlanyapti
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://odigital.app/")}
              style={styles.oracleLogoImgBox}
            >
              <Image source={oracleLogo} style={styles.oracleLogoImg} />
            </TouchableOpacity>
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
    paddingTop: Constants.statusBarHeight,
  },
  mainContent: {
    width: "95%",
    alignSelf: "center",
    marginBottom: "15%",
  },
  headerBox: {
    marginTop: scalePoint * 20,
    width: "100%",
    height: scalePoint * 25,
  },
  contentName: {
    fontSize: 20,
    marginLeft: "5%",
    marginTop: "5%",
    fontFamily: "Roboto",
  },
  contentTxt: {
    width: "90%",
    alignSelf: "center",
    marginTop: "5%",
    fontSize: 14,
    lineHeight: 16,
    fontFamily: "Roboto",
    textAlign: "justify",
  },
  boldTxt: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto",
    fontWeight: "700",
  },
  companyTxt: {
    marginTop: scalePoint * 50,
    fontSize: 18,
    lineHeight: 23,
    alignSelf: "center",
    textAlign: "center",
    color: "#4F4F4F",
    fontFamily: "Roboto",
  },
  oracleLogoImgBox: {
    marginTop: scalePoint * 13,
    width: scalePoint * 109,
    height: scalePoint * 36,
    alignSelf: "center",
  },
  oracleLogoImg: {
    width: scalePoint * 109,
    height: scalePoint * 36,
  },
});
