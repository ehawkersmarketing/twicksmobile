import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Button,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useFetch } from "../hooks/api_hook";
import { openBrowserAsync } from "expo-web-browser";
import * as WebBrowser from 'expo-web-browser';

// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import generateInvoiceHTML from './../component/invoice/InvoiceTemplete';

const OrderConfirmationScreen = ({ item, route, index }) => {
  const navigation = useNavigation();
  const [isBrowserOpen, setIsBrowserOpen] = useState(false);
  const openBrowser = async () => {
    if (!isBrowserOpen) {
      setIsBrowserOpen(true);
      try {
        await WebBrowser.openBrowserAsync(
          `https://twicks.in/invoice/${orderId}`
        );
      } catch (error) {
        console.error("Error opening browser:", error);
      } finally {
        setIsBrowserOpen(false);
      }
    }
  };

  const {
    orderId,
    orderAmount,
    orderCreatedAt,
    orderStatus,
    orderName,
    orderStreet,
    orderCity,
    orderState,
    orderCountry,
    orderZipCode,
    orderEmail,
    orderPhoneNo,
  } = route.params;

  const navigate = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("auth_token");
        if (token !== null) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          navigate.navigate("Login");
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, [navigate]);



  const merchantTransactionId = "TAFI163xf2v1zltqqn4hn"
  const cartId= "65f1a8437eea5bf76aa5a80a"
  let { data: trandata} = useFetch(`http://localhost:8080/api/pay/checkStatus?transactionId=${merchantTransactionId}&cartId=${cartId}`);


  
  const cancelOrderHandler = async () => {
    try {
      const data = await axios.post(
        "https://backend.twicks.in/api/ship/cancelRequest",
        {
          orderId: orderId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data?.data?.success) {
        navigation.navigate("Order");
      } else {
        console.log("error", data.data.error);
      }
    } catch (error) {
      console.log(" catch error", error);
      Alert.alert(error.message);
    }
  };

  return (
    <>
      {isLoggedIn && (
        <SafeAreaView style={styles.homemain}>
          <ScrollView>
            <View style={styles.header}>
              <Pressable
                onPress={() => navigation.navigate("Home")}
                style={styles.headerlogo}
              >
                <Image
                  style={{ width: 130, height: 48 }}
                  source={require("../assets/logo.png")}
                />
              </Pressable>
            </View>
            <View>
              {orderStatus === "PROCESSING" || orderStatus === "Packed" ? (
                <>
                  <Text
                    style={{
                      fontSize: 35,
                      marginBottom: "5%",
                      marginTop: "8%",
                    }}
                  >
                    Thank you, your order has been placed!
                  </Text>

                  <View
                    style={{
                      borderRadius: 4,
                      flexDirection: "row",
                      marginVertical: "10%",
                      alignItems: "flex-start",
                      width: "100%",
                      justifyContent: "space-between",
                      flex: 1,
                      gap: 10,
                    }}
                  >
                    <Pressable
                      onPress={openBrowser}
                      style={{
                        backgroundColor: "white",
                        borderRadius: 6,
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 10,
                        flex: 1,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#38944D",
                          fontSize: 23,
                          fontWeight: 600,
                        }}
                      >
                        Download Invoice
                      </Text>
                    </Pressable>
                    <Pressable
                      style={{
                        flex: 1,
                        backgroundColor: "white",
                        borderRadius: 6,
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 10,
                        height: "100%",
                        justifyContent: "center",
                      }}
                      onPress={cancelOrderHandler}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#38944D",
                          fontSize: 23,
                          fontWeight: 600,
                        }}
                      >
                        Cancel
                      </Text>
                    </Pressable>
                  </View>
                </>
              ) : (
                <>
                  <Text
                    style={{
                      fontSize: 35,
                      marginBottom: "5%",
                      marginTop: "8%",
                    }}
                  >
                    Your order has been canceled!
                  </Text>
                </>
              )}
            </View>
            <View style={{}}>
              <View style={{ backgroundColor: "#437E78", borderRadius: 13 }}>
                <View style={{ padding: 10 }}>
                  <Text style={{ color: "white", fontSize: 25 }}>
                    Order Details:
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flexWrap: "wrap",
                      paddingVertical: 10,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            fontSize: 17,
                            color: "#BAD8D5",
                            fontWeight: "bold",
                          }}
                        >
                          Order ID:
                        </Text>
                        <Text
                          style={{
                            fontSize: 17,
                            color: "#BAD8D5",
                          }}
                        >
                          {orderId}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            fontSize: 17,
                            color: "#BAD8D5",
                          }}
                        >
                          <Text style={{ fontWeight: "bold" }}>
                            Order Total :
                          </Text>
                          ₹ {orderAmount}/-
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            fontSize: 17,
                            color: "#BAD8D5",
                            fontWeight: "bold",
                          }}
                        >
                          Date:
                        </Text>
                        <Text
                          style={{
                            fontSize: 17,
                            color: "#BAD8D5",
                          }}
                        >
                          {orderCreatedAt}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: "#3F8B64",
                    padding: 10,
                    borderRadius: 13,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 25 }}>
                    Shipping Details:
                  </Text>
                  <View style={{ paddingVertical: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 17,
                          color: "#BAD8D5",
                          fontWeight: "bold",
                        }}
                      >
                        Name :
                      </Text>
                      <Text
                        style={{
                          fontSize: 17,
                          color: "#BAD8D5",
                        }}
                      >
                        {orderName}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 17,
                          color: "#BAD8D5",
                          fontWeight: "bold",
                        }}
                      >
                        Address :
                      </Text>
                      <Text
                        style={{
                          fontSize: 17,
                          color: "#BAD8D5",
                        }}
                      >
                        {orderStreet} , {orderCity} , {orderState} ,{" "}
                        {orderCountry}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 17,
                          color: "#BAD8D5",
                          fontWeight: "bold",
                        }}
                      >
                        Contact No. :
                      </Text>
                      <Text
                        style={{
                          fontSize: 17,
                          color: "#BAD8D5",
                        }}
                      >
                        {orderPhoneNo}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ padding: 10 }}>
                  <Text style={{ color: "white", fontSize: 25 }}>
                    Billing Address:
                  </Text>
                  <View style={{ paddingVertical: 10 }}>
                    <Text style={{ fontSize: 17, color: "#BAD8D5" }}>
                      {orderStreet} , {orderCity} , {orderState} ,{" "}
                      {orderCountry}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 17,
                          color: "#BAD8D5",
                          fontWeight: "bold",
                        }}
                      >
                        Pin:
                      </Text>
                      <Text
                        style={{
                          fontSize: 17,
                          color: "#BAD8D5",
                        }}
                      >
                        {orderZipCode}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default OrderConfirmationScreen;

const styles = StyleSheet.create({
  homemain: {
    // backgroundColor: "pink",
    paddingHorizontal: 20,
    height: "100%",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
  },
  headerlogo: {
    flexDirection: "row",
    alignItems: "center",
    width: 10,
    height: 130,
    // marginLeft: 20,
    // flex:1
  },
});
