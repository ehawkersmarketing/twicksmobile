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
import dayjs from "dayjs";

const CartCard = ({ item, index }) => {
  const formattedDate = dayjs(item?.timestamps).format("MMMM D, YYYY");
  const navigation = useNavigation();

  return (
    <>
      <View style={{ paddingHorizontal: 10 }}>
        <Pressable
          onPress={() =>
            navigation.navigate("OrderConfirmation", {
              orderId: item?._id,
              orderAmount: item?.amount,
              orderCreatedAt: item?.createdAt,
              orderStatus: item?.orderstatus,
              orderName:item?.user?.userName,
              orderStreet:item.userAddress.street,
              orderCity:item.userAddress.city,
              orderState:item.userAddress.state,
              orderCountry:item.userAddress.country,
              orderZipCode:item.userAddress.zipCode,
              orderEmail:item?.user?.email,
              orderPhoneNo:item?.user?.phone
            })
          }
          key={item?._id}
          style={{
            flexDirection: "row",
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
              <Text key={index} style={{ fontSize: 24 }}>
                {formattedDate}
              </Text>

              <Entypo name="chevron-small-right" size={24} color="black" />
            </View>

            <View
              style={{
                justifyContent: "space-between",
                width: "100%",

                padding: 10,
              }}
            >
              <Text style={{ fontSize: 21, color: "white" }}>{item?._id}</Text>

              <Text style={{ fontSize: 21, color: "white" }}>
                {item?.orderStatus}
              </Text>

              <Text style={{ fontSize: 20, color: "white" }}>
                Rs. {item?.amount} /-
              </Text>
            </View>
            <View style={styles.line}></View>

            <Pressable
              // onPress={() =>
              //   navigation.navigate("OrderConfirmation", { orderData: item })
              // }
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
    backgroundColor: "white",
    marginHorizontal: 10,
  },
});
