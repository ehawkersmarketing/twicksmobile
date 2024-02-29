import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useState } from "react";

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartReducer";

const SingleShopScreen = () => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "#1E786F", height: "100%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "3%",
            flex: 1,
          }}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            style={{ marginLeft: 20 }}
          />
          <Text style={{ fontSize: 28, color: "white" }}>Title</Text>
          <Feather
            name="search"
            size={24}
            color="white"
            style={{ marginRight: 20 }}
          />
        </View>
        <View style={{}}>
          <Image
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 250,
              width: "100%",
              backgroundColor: "transparent",
             }}
            source={require("../assets/product.png")}
          />
        </View>
        <ImageBackground
          source={require("../assets/categoryBack.png")}
          style={{
            padding:10,
            height:"90%",
            // width:"90%"
          }}
        >
          <View style={{ alignItems: "flex-start",paddingTop:40 }}>
            <Text style={{ color: "#28635D", fontSize: 25 }}>Seeds</Text>
            <Text style={{ fontSize: 40 }}>Emmoter</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 10,
              }}
            >
              <Fontisto
                name="star"
                size={15}
                color="#FFBB56"
                style={{ paddingRight: 10 }}
              />
              <Text>5.0 (1 review)</Text>
            </View>
          </View>
          <View
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <View style={styles.line}></View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 600,
                // paddingBottom: 20,
                paddingTop: "6%",
              }}
            >
              Description
            </Text>
            <Text style={{paddingVertical:20}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit.
            </Text>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:60
}}>
            <View>
              <Text style={{ fontSize: 25 }}>Rs. 1000/-</Text>
              <Text style={{ color: "gray" }}>Total Price</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" ,paddingRight:10}}>
              <Text style={{ backgroundColor: "#C8A33D", padding: 10,borderRadius:10 }}>-</Text>
              <Text style={{ padding: 10 }}>1</Text>
              <Text style={{ backgroundColor: "#C8A33D", padding: 10 }}>+</Text>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              paddingVertical:10
            }}
          >
            <Pressable
              style={{
                backgroundColor: "white",
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Ionicons name="bag-outline" size={24} color="black" />
            </Pressable>
            <Pressable
              // onPress={() => addItemToCart(item)}
              style={{
                backgroundColor: "#28635D",
                padding: 14,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                marginTop: 10,
                flex: 1,
              }}
            >
              {/* {addedToCart ? ( */}
              <View>{/* <Text>Added to Cart</Text> */}</View>
              {/* ) : ( */}
              <Text style={{ color: "white", fontSize: 20 }}>Add to Cart</Text>
              {/* )} */}
            </Pressable>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleShopScreen;

const styles = StyleSheet.create({
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
});
