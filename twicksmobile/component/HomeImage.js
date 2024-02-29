import {
    StyleSheet,
    Image,
    Text,
    View,
    ImageBackground,
    Pressable,
  } from "react-native";
  import React from "react";
  import { FontAwesome } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  
  const HomeImage = () => {
    return (
  
      <Pressable
        style={{
          marginHorizontal: 40,
          marginVertical: 25,
          backgroundColor: "white",
          borderRadius: 20,
          alignContent:"center",
        }}
      >
    <Image
        style={{resizeMode: "contain" }}
        source={require("../assets/HomeImage.png")}
      />
      </Pressable>
    );
  };
  
  export default HomeImage;
  
  const styles = StyleSheet.create({
    productImage: {},
  });
  