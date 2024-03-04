import { StyleSheet, Pressable, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ServiceCard = (props) => {
  const navigation = useNavigation();
  // console.log(props);
  const item = props.item; 

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("SingleService", {
          serviceId: item._id,
          serviceName: item.title,
          serviceImage: item.image,
          serviceDetais: item.description,
        })
      }
      style={{
        marginHorizontal: 10,
        marginVertical: 15,
        backgroundColor: "white",
        borderRadius: 20,
        height: 190,
        width: 175,
        overflow: "hidden",
      }}
    >
      <View style={{flex:1.5}}>
        <Image
          style={{
            resizeMode: "contain",
            width: 175,
            height: "100%",
          }}
          source={{uri: item?.image}}
        />
      </View>

      <View
        style={{
          flex:1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: "#1E786F", fontSize: 23, marginVertical: 3 }}>
            {item?.title}
            {/* Assuming you want to display the item's title here */}
          </Text>
          <Text>
            {item?.description}{" "}
            {/* Assuming you want to display the item's description here */}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({});
