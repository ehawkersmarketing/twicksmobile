import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ShopScreen from "../screens/ShopScreen";
import ServiceScreen from "../screens/ServiceScreen";
import SingleShopScreen from "../screens/SingleShopScreen";
import OrderConfirmationScreen from "../screens/OrderConfirmationScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import ReturnAndRefundScreen from "../screens/ReturnAndRefundScreen";
import SingleServiceScreen from "../screens/SingleServiceScreen";
import TermAndConditionScreen from "../screens/TermAndConditionScreen";
import LegalScreen from "../screens/LegalScreen";
import EditScreen from "../screens/EditScreen";
import OrderScreen from "../screens/OrderScreen";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const Top = createMaterialTopTabNavigator();

  function TopTabs() {
    return (
      <Top.Navigator>
        <Top.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome5 name="user-alt" size={24} color="#237169" />
              ) : (
                <FontAwesome5 name="user" size={24} color="black" />
              ),
          }}
        />

        <Top.Screen
          name="Order"
          component={OrderScreen}
          options={{
            tabBarLabel: "Order",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome name="shopping-cart" size={24} color="#237169" />
              ) : (
                <AntDesign name="shoppingcart" size={24} color="black" />
              ),
          }}
        />
        <Top.Screen
          name="Legal"
          component={LegalScreen}
          options={{
            tabBarLabel: "Legal",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome6 name="legal" size={24} color="#237169" />
              ) : (
                <FontAwesome6 name="legal" size={24} color="black" />
              ),
          }}
        />
      </Top.Navigator>
    );
  }
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#008E97" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Shop"
          component={ShopScreen}
          options={{
            tabBarLabel: "Shop",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="shop" size={24} color="#008E97" />
              ) : (
                <Entypo name="shop" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Service"
          component={ServiceScreen}
          options={{
            tabBarLabel: "Service",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#008E97" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Back"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pro"
          component={TopTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ReturnAndRefund"
          component={ReturnAndRefundScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Product"
          component={SingleShopScreen}
          options={{ headerShown: true }}
          s
        />
        <Stack.Screen
          name="OrderConfirmation"
          component={OrderConfirmationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="SingleService"
          component={SingleServiceScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="TermAndCondition"
          component={TermAndConditionScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Legal"
          component={LegalScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Edit"
          component={EditScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
