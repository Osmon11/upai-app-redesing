import React, { useState, useEffect, useRef } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions, Platform, TouchableOpacity } from "react-native";

import HomeStakScreen from "../../Screen/HomeStackScreen";
import BuyHistoryStackScreen from "../../Screen/BuyHistoryStackScreen";
import ProfileStackScreen from "../../Screen/ProfileStackScreen";
import NotificationsStackScreen from "../../Screen/NotificationsStackScreen";
import QrStackScreen from "../../Screen/QrStackScreen";
import QrScanButton from "./QrScanButton";

import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import NotificationIconSVG from "../../Common/TabIcons/NotificationsIosSVG";
import HomeIconIOS from "../../Common/TabIcons/HomeIconIOS";
import ProfileIconIOS from "../../Common/TabIcons/ProfileIconIOS";
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";
import LoginMainScreen from "../../Screen/ProfileStackScreen/LoginMainScreen";
const Tab = createBottomTabNavigator();
import * as Linking from "expo-linking";
import * as Notifications from "expo-notifications";
import { View, Text } from "native-base";
import { API } from "../../config";
import RegistrationScreen from "../../Screen/ProfileStackScreen/LoginMainScreen/Registration";
import Svg, { Path } from "react-native-svg";
const prefix = Linking.makeUrl("/");
const window = Dimensions.get("window");
const scalePoint = window.width / 380;

export default function MainTabNavigator() {
  const [auth, setAuth] = React.useState(false);
  const [phone, setPhone] = React.useState("");

  const [l, setData] = React.useState(null);

  React.useEffect(() => {
    getAllInfo();
    getInfo();
  });
  function handleDeepLink(event) {
    let data = Linking.parse(event.url);
    setData(data);
    if (data.path == "CompanyScreen/") {
      navigation.navigate("CompanyScreen", {
        itemId: data?.queryParams.itemId,
      });
    }
    if (data.path == "referal/") {
      getAllInfo();
      navigation.navigate("HomeStackScreen", { screen: "ReferalsStackScreen" });
      regReferal(data?.queryParams.phone);
    }
  }
  const navigation = useNavigation();
  const getAllInfo = async () => {
    const token = await AsyncStorage.getItem("token");
    const resp = await fetch(API + "users/profile/", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    setPhone(data.phone);
  };
  const regReferal = async (referred) => {
    const token = await AsyncStorage.getItem("token");
    alert(referred);
    const datas = {
      referrer: phone,
      referred: referred,
    };
    try {
      const response = await fetch(API + "users/referral/" + referred + "/", {
        method: "POST", // или 'PUT'
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datas), // данные могут быть 'строкой' или {объектом}!
      });
      const json = await response.json();
      if (json.messages) {
        alert(json.messages[0].message);
      } else if (json.non_field_errors) {
        alert(json.non_field_errors[0]);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };
  React.useEffect(() => {
    async function getInitialURL() {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) setData(Linking.parse(initialURL));
    }
    Linking.addEventListener("url", handleDeepLink);
    if (!l) {
      getInitialURL();
    }

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;

        if (data.kind != "new_shop") {
          navigation.navigate("NotificationsScreen", {
            screen: "NotificationMainScreen",
            params: { status: data.kind },
          });
        } else if (data.kind == "new_shop") {
          navigation.navigate("ProfileStackScreen", {
            screen: "CompanySettingsScreen",
            params: { shopId: data.new_shop_id },
          });
        }
        // if(url == 'notification'){
        //   navigation.navigate('Notifications')
        // }else if (url == 'newcompany'){
        //   navigation.navigate('Notifications')
        // }
      }
    );
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
    return () => {
      Linking.removeEventListener("url");
      subscription.remove();
      setData(null);
    };
  }, []);

  const getInfo = async () => {
    const result = await AsyncStorage.getItem("token");
    if (result != null) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  };

  const tabVisible = (val, index) => {
    const routeName = getFocusedRouteNameFromRoute(val);
    const hideOnScreens = ["ProfileSettingScreen"];
    if (hideOnScreens.indexOf(routeName) > -1) return false;
    return true;
  };

  const TabBarCustomButton = ({ onPress, children, isSelected }) => {
    if (isSelected) {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={{ flex: 1, alignItems: "center" }}
          activeOpacity={1}
        >
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              top: 0,
            }}
          >
            <View style={{ flex: 1, backgroundColor: "#fff" }}></View>
            <Svg width='73' height='83' viewBox='0 0 73 83' fill='none'>
              <Path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M3.74594 1.36587C3.47967 0.562792 2.74122 0 1.89514 0C0.848485 0 0 0.848484 0 1.89514V79C0 81.2091 1.79086 83 4 83H69C71.2091 83 73 81.2091 73 79V1.89514C73 0.848485 72.1515 0 71.1049 0C70.2588 0 69.5203 0.562793 69.2541 1.36587C64.7016 15.0958 51.7574 25 36.5 25C21.2426 25 8.29838 15.0958 3.74594 1.36587Z'
                fill='white'
              />
            </Svg>
            <View style={{ flex: 1, backgroundColor: "#fff" }}></View>
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              position: "absolute",
              top: -14,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
            }}
            onPress={onPress}
          >
            {children}
          </TouchableOpacity>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            height: 60,
            backgroundColor: "#fff",
          }}
          activeOpacity={1}
          onPress={onPress}
        >
          {children}
        </TouchableOpacity>
      );
    }
  };

  return (
    <Tab.Navigator
      initialRouteName='Tabs'
      tabBarOptions={{
        activeTintColor: "#ff6b00",
        inactiveTintColor: "#225196",
        showLabel: false,
        style: {
          shadowColor: "#000",
          shadowOpacity: 0.5,
          shadowRadius: 3,
          shadowOffset: {
            height: 2,
            width: 0,
          },
          elevation: 5,
          height: 60,
          backgroundColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name='HomeStackScreen'
        component={HomeStakScreen}
        options={{
          tabBarColor: "#fff",
          tabBarIcon: ({ color }) =>
            Platform.OS === "ios" ? (
              <HomeIconIOS
                width={scalePoint * 24}
                height={scalePoint * 24}
                color={color}
              />
            ) : (
              <Entypo name='home' size={24} color={color} />
            ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name='NotificationsScreen'
        component={auth ? NotificationsStackScreen : LoginMainScreen}
        options={{
          tabBarColor: "#fff",
          tabBarIcon: ({ color }) =>
            Platform.OS === "ios" ? (
              <NotificationIconSVG
                width={scalePoint * 17}
                height={scalePoint * 20}
                color={color}
              />
            ) : (
              <MaterialIcons name='notifications' size={24} color={color} />
            ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name='QrScanButton'
        component={auth ? QrStackScreen : LoginMainScreen}
        options={{
          tabBarColor: "#fff",
          tabBarIcon: () => <QrScanButton />,
          tabBarButton: (props) => <TabBarCustomButton {...props} isSelected />,
        }}
      />

      <Tab.Screen
        name='BuyHistoryScreen'
        component={auth ? BuyHistoryStackScreen : LoginMainScreen}
        options={{
          tabBarColor: "#fff",
          tabBarIcon: ({ color }) =>
            Platform.OS === "ios" ? (
              <SimpleLineIcons name='clock' size={20} color={color} />
            ) : (
              <AntDesign name='clockcircle' size={23} color={color} />
            ),
          tabBarButton: (props) => (
            <TabBarCustomButton {...props} isSelected={false} />
          ),
        }}
      />
      <Tab.Screen
        name='ProfileStackScreen'
        component={auth ? ProfileStackScreen : LoginMainScreen}
        initialParams={auth}
        options={({ route }) => ({
          tabBarVisible: tabVisible(route, 6),
          tabBarColor: "#fff",
          tabBarIcon: ({ color }) =>
            Platform.OS === "ios" ? (
              <ProfileIconIOS
                width={scalePoint * 22}
                height={scalePoint * 24}
                color={color}
              />
            ) : (
              <FontAwesome name='user' size={24} color={color} />
            ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        })}
      />
    </Tab.Navigator>
  );
}
