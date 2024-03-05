import {
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Entypo } from "@expo/vector-icons";
const CartCard = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={{ paddingHorizontal: 10 }}>
        <Pressable
          // onPress={navigation.navigate("SingleShop")}
          style={{
            flexDirection: "row",
            // paddingVertical: 10,
            borderColor: "#DDDEDF",
            borderWidth: 1,
            marginVertical: 10,
            borderRadius: 2,
            alignItems: "center",
            width: "100%",
          }}
        >
          <View>
            <View
              style={{
                backgroundColor: "#D8EBE8",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "100%",
                padding: 10,
              }}
            >
              <Text style={{ fontSize: 24 }}>Janurary 23,2024</Text>
              <Entypo name="chevron-small-right" size={24} color="black" />
            </View>
            <View
              style={{
                justifyContent: "space-between",
                width: "100%",
                padding: 10,
              }}
            >
              <Text style={{ fontSize: 24 }}>Rishika Kothari</Text>
              <Text style={{ fontSize: 21 }}>65d9978d7644354ab1bc4161</Text>

              <Text style={{ fontSize: 21 }}>Delivered</Text>

              <Text style={{ fontSize: 20, color: "gray" }}>100/-</Text>
            </View>
            <View style={styles.line}></View>

            <Pressable
              style={{
                backgroundColor: "#28635D",
                padding: 14,
                borderRadius: 2,
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
                flex: 1,
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>View Order</Text>
            </Pressable>
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    fontSize: 20,
  },
  line: {
    width: "95%",
    height: 1,
    backgroundColor: "gray",
    // marginVertical: 10,
    marginHorizontal: 10,
  },
});
