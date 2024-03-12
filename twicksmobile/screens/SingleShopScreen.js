import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Alert,
  View,
  SafeAreaView,
  ImageBackground,
  Pressable,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFetch } from "../hooks/api_hook";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const SingleShopScreen = ({ route }) => {
  const navigation = useNavigation();
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);
  const index = route.params?.index;

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
  let [quantity, setQuantity] = useState(0);
  const [inCart, setInCart] = useState(false);
  useEffect(() => {
    if (cart) {
       const productInCart = cart.products.find((product) => product.productId._id === productId);
       console.log("Product in cart:", productInCart);
       setInCart(!!productInCart);
       setQuantity(productInCart ? productInCart.units : 0);
    }
   }, [cart, productId]);
   

  const {
    productId,
    productName,
    productDetais,
    productImage,
    productCategory,
    productPrice,
    productReview,
    productRating,
    productQuantity,
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
        // console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, [navigation]);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        const user = JSON.parse(userString);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);
  const decreaseValueHandler = async () => {
    try {
      const { data } = await axios.delete(
        `https://backend.twicks.in/api/dropFromCart/${userData._id}/${productId}`
      );
      if (data.success) {
        if (quantity != 1) {
          setQuantity((prevQuantity) => prevQuantity - 1); // Correct
        } else {
          setInCart(false);
        }
      } else {
        console.log("error while decreasing the cart ");
      }
    } catch (error) {
      Alert("Failed to remove the cart", "Try Again Later");
    }
  };
  const increaseValueHandler = async () => {
    try {
      if (cart?.products[index]?.units == productQuantity) {
        alert("you react limit");
      } else {
        const { data } = await axios.put(
          `https://backend.twicks.in/api/addToCart`,
          {
            userId: userData._id,
            productId: productId,
            units: 1,
          }
        );
        if (data.success) {
           setQuantity((prevQuantity) => prevQuantity + 1); // Correct
        } else {
          Alert("Quantity Does not Added");
        }
      }
    } catch (error) {
      console.log(error, "catuch rro while increasing product");
    }
  };

  const onCartClick = async () => {
    try {
      if (userData._id) {
        await axios.put("https://backend.twicks.in/api/addToCart", {
          productId: productId,
          userId: userData._id,
          units: 1,
        });
        setInCart(true);
        setQuantity(quantity+1)
      } else {
        Alert("please login to add product in cart");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {isLoggedIn && (
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "White",
          }}
        >
          <ScrollView style={{ backgroundColor:"white", width: "100%" }}>
            <View style={{}}>
              <Image
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 250,
                  backgroundColor: "#28635D",
                }}
                source={{ uri: productImage }}
              />
            </View>
            <ImageBackground
              style={{ padding: 10,height:"100%" }}
              source={require("../assets/categoryBack.png")}
            >
              <View style={{ alignItems: "flex-start" }}>
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
                  <Text>
                    {productReview} ({productRating})
                  </Text>
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
              </View>
            </ImageBackground>
          </ScrollView>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Pressable
              onPress={() => navigation.navigate("Cart")}
              style={{
                backgroundColor: "white",
                padding: 14,
                borderWidth: 1,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                // marginHorizontal: 10,
                // marginTop: 10,
              }}
            >
              <Ionicons name="bag-outline" size={24} color="black" />
            </Pressable>
            <Pressable
              // onPress={() => addItemToCart(item)}
              style={{
                backgroundColor: "#28635D",
                padding: 1,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                // marginTop: 10,
                marginVertical: 12,
                flex: 1,
              }}
            >
              {/* {addedToCart ? ( */}
              <View>{/* <Text>Added to Cart</Text> */}</View>
              {/* ) : ( */}
              <View style={{ color: "white", marginBottom: 2, fontSize: 20 }}>
                {inCart ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap:20
                    }}
                  >
                    <Pressable
                      style={{ paddingTop: 12 , paddingBottom:12, borderRadius:"50%"}}
                      onPress={() => decreaseValueHandler()}
                    >
                      <AntDesign  style={{ fontSize: 30 , color:"white" }} name="minuscircleo" size={18} color="black" />

                    </Pressable>
                    <View>
                      <Text style={{ fontSize: 25 , color:"white" }}>{quantity}</Text>
                    </View>
                    <Pressable  onPress={() => increaseValueHandler()}>
                      
                <AntDesign style={{ fontSize: 30 , color:"white" }} name="pluscircleo" size={18} color="black" />
                    </Pressable>
                  </View>
                ) : (
                  <View style={{ marginVertical: -5 }}>
                    <Pressable
                      style={{
                        backgroundColor: "#28635D",
                        padding: 12,
                        borderRadius: 10,
                        alignItems: "center",
                        marginHorizontal: 10,
                        marginVertical: 10,
                        paddingBottom: 4,
                        marginTop: 10,
                        flexDirection: "row",
                        gap: 10,
                        bottom: 5,
                        justifyContent: "center",
                      }}
                      onPress={() => onCartClick()}
                    >
                      <Text style={{ color: "white", fontSize: 20 }}>
                        Add To Cart
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </Pressable>
          </View>
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
  AddCartStyle: {},
});
