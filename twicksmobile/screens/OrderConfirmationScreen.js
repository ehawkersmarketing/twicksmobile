import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import generateInvoiceHTML from './../component/invoice/InvoiceTemplete';

const OrderConfirmationScreen = ({ item, route, index }) => {
  const navigation = useNavigation();
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


  // const orderId = "65d992287644354ab1bc4137" ;
  // const { orderData } = route.params;
  // const { orderId, orderAmount } = route.params;

  //  const fetchInvoiceDetails = async (orderId) => {
  //     try {
  //       // Replace this URL with your actual API endpoint, including the ID as a query parameter
  //       const response = await fetch(`https://backend.twicks.in/api/getOrderById/${orderId}`);
  //       const data = await response.json();
  //       return data;
  //     } catch (error) {
  //       console.error('Error fetching invoice details:', error);
  //       return null;
  //     }
  //  };
  //  const product = [
  //   { name: 'Product 1', price: 10.99, quantity: 2 },
  //   { name: 'Product 2', price: 5.99, quantity: 1 },
  //  ];
  //  const generatePDF = async () => {
  //   const html = '<h1>Hello World</h1>';
  //   const response = await fetch('https://localhost:8080/generate-pdf', {
  //      method: 'POST',
  //      headers: {
  //        'Content-Type': 'application/json',
  //      },
  //      body: JSON.stringify({ html }),
  //   });

  //   if (!response.ok) {
  //     console.error('Error generating PDF:', response.status, await response.text());
  //  } else {
  //     const blob = await response.blob();
  //     // Handle the PDF blob
  //  }
  //  };
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

  const cancelOrderHandler = async () => {
    try {
      const data = await axios.post(
        "https://backend.twicks.in/api/ship/cancelRequest",
        {
          orderId: orderId,
        }
      );
      if (data.data.success) {
        // alert.success("order Cancelled successfully", {
        //   position: "bottom-right",
        //   autoClose: 8000,
        //   pauseOnHover: true,
        //   draggable: true,
        //   theme: "dark",
        // });
        console.log(data)
      } else {
        // alert.success("order Cancelled successfully", {
        //   position: "bottom-right",
        //   autoClose: 8000,
        //   pauseOnHover: true,
        //   draggable: true,
        //   theme: "dark",
        // });
        console.log("nahi hua")
      }
    } catch (error) {
      console.log(error);
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
              {orderStatus === "Packed" ? (
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
                      }} onPress={cancelOrderHandler}
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
                            color: "white",
                            fontSize: 17,
                            color: "#BAD8D5",
                            fontWeight: "bold",
                          }}
                        >
                          Order ID:
                        </Text>
                        <Text
                          style={{
                            color: "white",
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
                            color: "white",
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
                            color: "white",
                            fontSize: 17,
                            color: "#BAD8D5",
                            fontWeight: "bold",
                          }}
                        >
                          Date:
                        </Text>
                        <Text
                          style={{
                            color: "white",
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
                          color: "white",
                          fontSize: 17,
                          color: "#BAD8D5",
                          fontWeight: "bold",
                        }}
                      >
                        Name :
                      </Text>
                      <Text
                        style={{
                          color: "white",
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
                          color: "white",
                          fontSize: 17,
                          color: "#BAD8D5",
                          fontWeight: "bold",
                        }}
                      >
                        Address :
                      </Text>
                      <Text
                        style={{
                          color: "white",
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
                          color: "white",
                          fontSize: 17,
                          color: "#BAD8D5",
                          fontWeight: "bold",
                        }}
                      >
                        Contact No. :
                      </Text>
                      <Text
                        style={{
                          color: "white",
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
                    <Text
                      style={{ color: "white", fontSize: 17, color: "#BAD8D5" }}
                    >
                      {orderStreet} , {orderCity} , {orderState} ,{" "}
                      {orderCountry}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 17,
                          color: "#BAD8D5",
                          fontWeight: "bold",
                        }}
                      >
                        Pin:
                      </Text>
                      <Text
                        style={{
                          color: "white",
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
