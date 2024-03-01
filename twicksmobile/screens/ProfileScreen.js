import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <Button
        title="order"
        onPress={() => navigation.navigate("OrderConfirmation")}
      ></Button>
      <Button
        title="login"
        onPress={() => navigation.navigate("Login")}
      ></Button>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
