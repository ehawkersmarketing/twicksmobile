import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <Button
        title="Order"
        onPress={() => navigation.navigate("OrderConfirmation")}
      ></Button>
      <Button
        title="Login"
        onPress={() => navigation.navigate("Login")}
      ></Button>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      ></Button>
      <Button
        title="Return And Refund"
        onPress={() => navigation.navigate("ReturnAndRefund")}
      ></Button>
      <Button
        title="Term And Condition"
        onPress={() => navigation.navigate("TermAndCondition")}
      ></Button>
      <Button
        title="Privacy Policy"
        onPress={() => navigation.navigate("PrivacyPolicy")}
      ></Button>
      
    </>
  );
};

export default ProfileScreen;



















const styles = StyleSheet.create({});
