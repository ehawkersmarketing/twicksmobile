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

const OrderConfirmationScreen2 = ({ route }) => {
  const navigation = useNavigation();

  // const { cartId } = route.params; // Assuming you pass the cartId from the previous screen
  const [latestOrder, setLatestOrder] = useState(null);

  const [orders, setOrders] = useState([]);
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

  useEffect(() => {
    if (userData?._id) {
      const fetchOrders = async () => {
        try {
          const { data: orders } = await axios.get(
            `https://backend.twicks.in/api/getAllOrderByUser/${userData?._id}`
          );
          console.log(orders?.data[orders]);
          const data = orders?.data[orders?.data.length - 1];
          //  console.log("ghjdfbfjhcdb",orders?.data)
          console.log("dkcbjsdbc", data);
          if (orders && orders.length > 0) {
            const latestOrder = console.log(
              "First Order ID:",
              sortedOrders[sortedOrders.length - 1]._id
            );
            setOrders([latestOrder]);
            console.log("efcjdfdn", latestOrder);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };

      fetchOrders();
    }
  }, [userData._id]);

  // console.log(setOrders,"kjbcjwdbc")
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
    console.log("me aagya");
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
      console.log("api called", data?.data.success);
      if (data?.data?.success) {
        navigation.navigate("Order");
      } else {
        console.log("error", data.data.error);
      }
    } catch (error) {
      console.log("me hu catch error", error);
      Alert.alert(error.message);
    }
  };

  // useEffect(() => {
  //    const intervalId = setInterval(async () => {
  //      try {
  //        const response = await axios.get('https://backend.twicks.in/api/getLatestOrder');
  //        const latestOrder = response.data;
  //        if (latestOrder && latestOrder.cartId === cartId) {
  //          setLatestOrder(latestOrder);
  //          clearInterval(intervalId); // Stop polling once the correct order is found
  //        }
  //      } catch (error) {
  //        console.error('Failed to fetch latest order', error);
  //      }
  //    }, 5000); // Poll every 5 seconds

  //    return () => clearInterval(intervalId); // Clean up on component unmount
  // }, [cartId]);

  if (!latestOrder) {
    return (
      <Pressable onPress={() => navigation.navigate("Back")}>
        <Text style={{fontSize:20}}>Hii</Text>
      </Pressable>
    );
  }

  return (
    <>
      <Pressable onPress={() => navigation.navigate("Back")}>
        <Text>Hii</Text>
      </Pressable>
      {isLoggedIn && (
        <SafeAreaView style={styles.homemain}>
          {/* <ScrollView>
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
                          {data?._id}
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
                          ₹ {data?.amount}/-
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
                          {data?.createdAt}
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
                        {data?.userName}
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
          </ScrollView> */}
        </SafeAreaView>
      )}
    </>
  );
};

export default OrderConfirmationScreen2;

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
