import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import filterIcon from "../../../../Images/filterIcon.png";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;
export default function CategoriesHeader({ name }) {
  const navigation = useNavigation();

  return (
    <View style={styles.mainContentBox}>
      <Text style={styles.mainText}>Toifalar</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("FilterScreen", {
            name: name,
          })
        }
      >
        <Image
          style={{
            width: scalePoint * 20,
            height: scalePoint * 20,
            resizeMode: "contain",
          }}
          source={filterIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContentBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: scalePoint * 30,
  },
  mainText: {
    marginLeft: "2%",
    fontSize: 24,
    lineHeight: 28,
  },
});
