import {
  Pressable,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  View,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import CartCard from "../component/CartCard";
import { useFetch } from "../hooks/api_hook";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = () => {
  const navigation = useNavigation();
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
    } else {
    }
  }, []);
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

  let { data: cart } = useFetch(`/api/getCartByUser/${user?._id}`);
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
  console.log(cart?.products);

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
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F5FCFF",
          }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={{ flex: 1, padding: 10, alignItems: "flex-start" }}>
              <View style={{ width: "100%" }}>
                {/* {console.log("fetch", cart?.products[0].units)} */}
                {cart?.products != 0 ? (
                  cart?.products.map((item, index) => (
                    <CartCard key={item._id} item={item} index={index} />
                  ))
                ) : (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: "50%",
                      gap: 70,
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>
                      You don't have any products yet!!
                    </Text>
                    <Pressable
                      onPress={() => navigation.navigate("Shop")}
                      style={{
                        backgroundColor: "#28635D",
                        padding: 14,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 10,
                        marginTop: 10,
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 20 }}>
                        Continue Shopping
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
          {cart?.products == 0 ? (
            <View></View>
          ) : (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                padding: 10,
                backgroundColor: "#F5FCFF",
              }}
            >
              <View style={styles.line}></View>

              <View style={{ flexDirection: "row" }}>
                <Pressable
                  onPress={() => navigation.navigate("Checkout")}
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
                  <Text style={{ color: "white", fontSize: 18 }}>Checkout</Text>
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate("Back")}
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
                  <Text style={{ color: "white", fontSize: 18 }}>
                    Continue Shopping
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </SafeAreaView>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  rowmain: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cellmain: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    fontSize: 20,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    fontSize: 15,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
});
