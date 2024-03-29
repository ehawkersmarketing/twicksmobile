import { StyleSheet, Pressable, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ServiceCard = (props) => {
  const navigation = useNavigation();
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
        marginHorizontal: "2%",
        marginVertical: 15,
        backgroundColor: "white",
        borderRadius: 20,
        height: 170,
        width: "46%",
        overflow: "hidden",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View style={{ flex: 1.5 }}>
        <Image
          style={{
            resizeMode: "contain",
            width: "100%",
            height: "100%",
          }}
          source={{ uri: item?.image }}
        />
      </View>

      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: "#1E786F", fontSize: 21, marginVertical: 3 }}>
            {item?.title}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({});
