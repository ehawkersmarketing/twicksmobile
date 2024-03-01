import { StyleSheet, Pressable, Text, View, Image } from "react-native";
import React from "react";

const CategoryComponent = ({ item}) => {
  return (
    <Pressable
      key={item?._id}
      style={{
        // margin: 18,
        marginHorizontal:12,
        justifyContent: "center",
        alignItems: "center",
        width:"5%",
        // backgroundColor:"pink"
        // flex: 1,
      }}
    >
      <View
        style={{
          // backgroundColor: "white",
          // borderRadius: 10,
          // padding: 10,
          height: 85,
          width: 85,
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          textAlign: "center",
          // padding:"auto"
        }}
      >
        <Image
          style={{
            resizeMode: "contain",
            height: "100%",
            width: 85,

            alignContent: "center",
            justifyContent: "center",
            // padding:10
          }}
          source={{uri: item?.mobIcon}}
        />
      </View>

      <Text
        style={{
          textAlign: "center",
          justifyContent:"center",
          fontSize: 12,
          fontWeight: "500",
          marginTop: 5,
        }}
      >
        {item.category}
      </Text>
    </Pressable>
  );
};

export default CategoryComponent;

const styles = StyleSheet.create({});
