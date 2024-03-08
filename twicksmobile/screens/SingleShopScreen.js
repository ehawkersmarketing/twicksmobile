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
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFetch } from "../hooks/api_hook";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
const SingleShopScreen = ({ item, route, index }) => {
  const navigation = useNavigation();
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        const userData = JSON.parse(userString);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (cart) {
      let totalPrice = 0;
      for (let i = 0; i < cart.products.length; i++) {
        totalPrice +=
          cart.products[i]?.productId?.price * cart.products[i]?.units;
      }
      setTotal(totalPrice);
    }
  }, [cart]);
  let { data: cart } = useFetch(`/api/getCartByUser/${user?._id}`);
  const increaseValueHandler = async (index) => {
    console.log(index);
    try {
      if (
        cart.products[index].units ==
        cart.products[index].productId.units.maxQuantity
      ) {
        Alert.alert("You have reached product max limit");
      } else {
        const { data } = await axios.put(
          `https://backend.twicks.in/api/addToCart`,
          {
            userId: user._id,
            productId: cart.products[index].productId._id,
            units: 1,
          }
        );
        if (data.success) {
          navigation.navigate("Cart");
          // window.location.reload();
        } else {
          console.log(data.message);
        }
      }
    } catch (error) {
      console.log("catch", error.message);
    }
  };
  const decreaseValueHandler = async (index) => {
    try {
      const { data } = await axios.delete(
        `https://backend.twicks.in/api/dropFromCart/${user._id}/${cart.products[index].productId._id}`
      );
      if (data.success) {
        console.log("success");
        // window.location.reload();
      } else {
        Alert.alert(data.message);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const {
    productId,
    productName,
    productDetais,
    productImage,
    productCategory,
    productPrice,
  } = route.params;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("auth_token");
        if (token !== null) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, [navigation]);
  return (
    <>
      {isLoggedIn && (
        <SafeAreaView>
          <ScrollView style={{ backgroundColor: "#1E786F", height: "100%" }}>
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
                source={{ uri: productImage }}
              />
            </View>
            <ImageBackground
              source={require("../assets/categoryBack.png")}
              style={{
                padding: 10,
                height: "90%",
                // width:"90%"
              }}
            >
              <View style={{ alignItems: "flex-start", paddingTop: 40 }}>
                <Text style={{ color: "#28635D", fontSize: 25 }}>
                  {productCategory}
                </Text>
                <Text style={{ fontSize: 40 }}>{productName}</Text>
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
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={styles.line}></View>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 600,
                    paddingBottom: 20,
                    paddingTop: "4%",
                  }}
                >
                  Description
                </Text>
                <Text style={{ fontSize: 20 }}>{productDetais}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: "8%",
                }}
              >
                <View>
                  <Text style={{ fontSize: 25 }}>{productPrice}/-</Text>
                  <Text style={{ color: "gray" }}>Total Price</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    onPress={() => decreaseValueHandler(index)}
                    style={({ pressed }) => [
                      {
                        alignItems: "center",
                        gap: 10,
                        backgroundColor: pressed ? "#D8E8E7" : "#FFFFFF",
                      },
                    ]}
                  >
                    -
                  </Text>
                  <Text style={{ padding: 10 }}>{item?.units}</Text>
                  <Text
                    onPress={() => increaseValueHandler(index)}
                    style={({ pressed }) => [
                      {
                        alignItems: "center",
                        gap: 10,
                        backgroundColor: pressed ? "#D8E8E7" : "#FFFFFF",
                      },
                    ]}
                  >
                    +
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
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
                    // marginHorizontal: 10,
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
                  <Text style={{ color: "white", fontSize: 20 }}>
                    Add to Cart
                  </Text>
                  {/* )} */}
                </Pressable>
              </View>
            </ImageBackground>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
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
