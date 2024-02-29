import { StyleSheet, Pressable, Text, View, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CategoryComponent = () => {
  return (
    <Pressable
      style={{
        margin: 18,
        justifyContent: "center",
        alignItems: "center",
        // flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          // padding: 10,
          height: 65,
          width: 65,
          padding:5,
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          textAlign:"center",
          // padding:"auto"
        }}
      >
        <Image
          style={{
            resizeMode: "contain",
            height: 55,
            width: 55,
            
            alignContent: "center",
            justifyContent: "center",
            // padding:10
          }}
          source={require("../assets/Category1.png")}
        />
      </View>

      <Text
        style={{
          textAlign: "center",
          fontSize: 12,
          fontWeight: "500",
          marginTop: 5,
        }}
      >
        {/* {item?.name} */}
        Hydroponics
      </Text>
    </Pressable>
  );
};

export default CategoryComponent;

const styles = StyleSheet.create({});
