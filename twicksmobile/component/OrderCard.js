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
              orderStatus: item?.orderStatus,
              orderName: item?.user?.userName,
              orderStreet: item.userAddress.street,
              orderCity: item.userAddress.city,
              orderState: item.userAddress.state,
              orderCountry: item.userAddress.country,
              orderZipCode: item.userAddress.zipCode,
              orderEmail: item?.user?.email,
              orderPhoneNo: item?.user?.phone,
            })
          }
          key={item?._id}
          style={{
            flexDirection: "row",
            borderColor: "#237169",
            marginVertical: 10,
            borderRadius: 15,
            alignItems: "center",
            width: "100%",
            backgroundColor: "white",
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 0.84,
            elevation: 4,
            overflow:"hidden"
          }}
        >
          <View>
            <View
              style={{
                backgroundColor: "#D8EBE855",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "100%",
                padding: 10,
              }}
            >
              <Text key={index} style={{ fontSize: 20 }}>
                {formattedDate}
              </Text>

              <Entypo name="chevron-small-right" size={20} color="black" />
            </View>

            <View
              style={{
                justifyContent: "space-between",
                width: "100%",
                paddingHorizontal: 10,
                paddingVertical:5
              }}
            >
              <Text style={{ fontSize: 18, color: "black" }}>
                <Text style={{fontWeight:"bold"}}>Order Id : </Text>{item?._id}</Text>

              <Text style={{ fontSize: 18, color: "black" }}>
                <Text style={{fontWeight:"bold"}}>Status :</Text> {item?.orderStatus}
              </Text>

              <Text style={{ fontSize: 18, color: "black" }}>
                <Text style={{fontWeight:"bold"}}>Amount : </Text>₹ {item?.amount}/-
              </Text>
            </View>
            <View style={styles.line}></View>

            <Pressable
              onPress={() =>
                navigation.navigate("OrderConfirmation", {
                  orderId: item?._id,
                  orderAmount: item?.amount,
                  orderCreatedAt: item?.createdAt,
                  orderStatus: item?.orderStatus,
                  orderName: item?.user?.userName,
                  orderStreet: item.userAddress.street,
                  orderCity: item.userAddress.city,
                  orderState: item.userAddress.state,
                  orderCountry: item.userAddress.country,
                  orderZipCode: item.userAddress.zipCode,
                  orderEmail: item?.user?.email,
                  orderPhoneNo: item?.user?.phone,
                })
              }
              style={{
                backgroundColor: "#28635D",
                padding: 10,
                borderRadius: 2,
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
                flex: 1,
                borderRadius: 10,

              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>View Order</Text>
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
