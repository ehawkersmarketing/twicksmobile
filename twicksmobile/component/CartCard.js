import { StyleSheet, Pressable, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const CartCard = () => {
  return (
    <>
      <View
        style={{
          width: "100%",
          paddingVertical: 10,
          flex: 1,
          flexDirection: "row",
        }}
      >
        <Pressable
          style={{
            borderColor: "#EBF6F5",
            borderWidth: 1,
            width: "100%",
            padding: 20,
            borderRadius: 4,
            backgroundColor: "#FFFFFF",
          }}
        >
          <Text style={{ fontWeight: "500", fontSize: 21 }}>Emmorter</Text>
          <Text style={{ color: "gray", fontSize: 19 }}>
            Potassic Fertilizer, Potassium Nitrate
          </Text>
          <Text style={{ fontWeight: "500", fontSize: 19 }}>100/-</Text>

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingTop: 10,
            }}
          >
            <Feather
              name="minus-square"
              size={24}
              color="#237169"
              backgroundColor="#D8E8E7"
            />
            <Text style={{ fontSize: 21 }}>1</Text>
            <Feather
              name="plus-square"
              size={24}
              color="#237169"
              backgroundColor="#D8E8E7"
            />
          </Pressable>
        </Pressable>
      </View>
    </>
  );
};

export default CartCard;

const styles = StyleSheet.create({});
