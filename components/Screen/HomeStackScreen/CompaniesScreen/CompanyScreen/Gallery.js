import React, { useRef, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import PagerView from "react-native-pager-view";
import { AntDesign } from "@expo/vector-icons";

const window = Dimensions.get("window");
const width = window.width * 0.9;

const scalePoint = window.width / 380;

export default function Gallery(props) {
  const [dialog, setDialog] = useState(null);
  const [openImg, setOpenImg] = useState(0);
  const scrollToRef = useRef();

  const openGallery = (item) => {
    setOpenImg(item);
    setDialog(item);
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={styles.textBox}>
        <Text style={styles.mainBoxTxt}>{props.gallery ? "Galereya" : ""}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {props.gallery !== ""
          ? props.gallery.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => openGallery(index)}
                  style={
                    index === 0
                      ? {
                          marginRight: scalePoint * 10,
                          marginLeft: scalePoint * 10,
                        }
                      : { marginRight: scalePoint * 10 }
                  }
                >
                  <Image
                    style={{
                      width: scalePoint * 146,
                      height: scalePoint * 215,
                      borderRadius: 10,
                    }}
                    key={item.id}
                    source={{ uri: item.img }}
                  />
                </TouchableOpacity>
              </View>
            ))
          : null}
        <Modal
          visible={dialog !== null}
          animated
          onRequestClose={() => setDialog(null)}
        >
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setDialog(null)}
            activeOpacity={1}
          >
            <AntDesign name='closecircleo' size={24} color='white' />
          </TouchableOpacity>
          <PagerView
            style={{ flex: 1, backgroundColor: "#000", marginTop: "-0.5%" }}
            initialPage={openImg}
            showPageIndicator={true}
          >
            {props.gallery &&
              props.gallery.map((el, index) => (
                <View style={styles.page} key={index}>
                  <Image
                    style={{
                      width: width,
                      height: scalePoint * 500,
                      resizeMode: "contain",
                    }}
                    source={{ uri: el.img }}
                  />
                </View>
              ))}
          </PagerView>
        </Modal>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  textBox: {
    marginBottom: "5%",
    width: "90%",
    alignSelf: "center",
  },
  mainBoxTxt: {
    fontSize: 20,
    lineHeight: 24,
  },
  closeBtn: {
    paddingTop: "15%",
    paddingRight: "5%",
    paddingBottom: "2%",
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#000",
  },
  modalBox: {
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
    backgroundColor: "#000",
    paddingTop: "-5%",
  },
});
