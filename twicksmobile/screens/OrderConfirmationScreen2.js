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
import { useNavigation,useFocusEffect  } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useFetch } from "../hooks/api_hook";
import * as WebBrowser from 'expo-web-browser';
import { openBrowserAsync } from "expo-web-browser";

const OrderConfirmationScreen2 = ({ route }) => {
  const navigation = useNavigation();
  const [latestOrder, setLatestOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState(null);
  const { data: paisa } = useFetch(`/api/getLatestTransaction/${userData?._id}`);
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
  console.log(userData?._id)
  const [transaction, setTransaction] = useState(null);
 
  useEffect(() => {
     const fetchData = async () => {
       const { data: order } = useFetch(`/api/getLatestTransaction/${userData?._id}`);
       setTransaction(data);
       console.log("hello");
       console.log(order?.transaction);
     };
     
 
     fetchData();
  }, [userData?._id]);  
  console.log("hbhbhb",transaction);

  useEffect(() => {
    if (transaction) {
      console.log(transaction);
    }
 }, [transaction]);
   
  const navigate = useNavigation();

  const cancelOrderHandler = async () => {
    console.log("me aagya");
    try {
      const data = await axios.post(
        "https://backend.twicks.in/api/ship/cancelRequest",
        {
          orderId: paisa?.orderId?._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("api called", data?.data.success);
      if (data?.data?.success) {
        Alert.alert("Order Canceled Successfully")
        navigation.navigate("Order");
      } else {
        console.log("error", data.data.error);
      }
    } catch (error) {
      console.log("me hu catch error", error);
      Alert.alert(error.message);
    }
  };

    return (
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
              {paisa?.orderId?.orderStatus === "PROCESSING" || paisa?.orderId?.orderStatus === "Packed" || paisa?.orderId?.orderStatus === null ? (
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
                          {paisa?.orderId?._id}
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
                          ₹ {paisa?.orderId?.amount}/-
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
                          {paisa?.orderId?.createdAt}
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
                        {userData?.userName}
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
                        {paisa?.orderId?.userAddress?.street} , {paisa?.orderId?.userAddress?.city}{" "}
                        , {paisa?.orderId?.userAddress?.state} ,{" "}
                        {paisa?.orderId?.userAddress?.country}
                      </Text>
                    </View>
                    {/* <View style={{ flexDirection: "row" }}>
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
                        {latestOrder?.user?.phone}
                      </Text>
                    </View> */}
                  </View>
                </View>
                <View style={{ padding: 10 }}>
                  <Text style={{ color: "white", fontSize: 25 }}>
                    Billing Address:
                  </Text>
                  <View style={{ paddingVertical: 10 }}>
                    <Text style={{ fontSize: 17, color: "#BAD8D5" }}>
                    {paisa?.orderId?.userAddress?.street} , {paisa?.orderId?.userAddress?.city}{" "}
                        , {paisa?.orderId?.userAddress?.state} ,{" "}
                        {paisa?.orderId?.userAddress?.country}
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
                        {paisa?.orderId?.userAddress?.zipCode}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
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
