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

const CartCard = ({ item, index }) => {
  // console.log("bmnvnbcnbc nb nm b,mbnm", index, item);

  // console.log("ertyuio", item?.orderStatus);

  console.log("gchgcvhgv", item?.user?.userName);

  // item.products.forEach((product) => {
  //   console.log("Price:", product.productId.price);
  // });

  const navigation = useNavigation();

  return (
    <>
      <View style={{ paddingHorizontal: 10 }}>
        <Pressable
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
              {item.products.map((product, index) => (
                <Text key={index} style={{ fontSize: 24 }}>
                  {product.productId.createdAt}
                </Text>
              ))}
              <Entypo name="chevron-small-right" size={24} color="black" />
            </View>

            <View
              style={{
                justifyContent: "space-between",
                width: "100%",

                padding: 10,
              }}
            >
              <Text style={{ fontSize: 24, color: "white" }}>
                {item?.user?.userName}
              </Text>
              <Text style={{ fontSize: 21, color: "white" }}>
                65d9978d7644354ab1bc4161
              </Text>

              <Text style={{ fontSize: 21, color: "white" }}>
                {item?.orderStatus}
              </Text>

              <Text style={{ fontSize: 20, color: "gray" }}>
                {item.products[0].productId?.price}
              </Text>
            </View>
            <View>
              {item.products.map((product, index) => (
                <Image
                  key={index}
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: "contain",
                  }}
                  source={{ uri: product.productId.image }}
                />
              ))}
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
    backgroundColor: "white",
    marginHorizontal: 10,
  },
});
