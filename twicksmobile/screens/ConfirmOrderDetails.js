import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect,useCallback } from "react";
import { useFetch } from "../hooks/api_hook";
import {
  Pressable,
  SafeAreaView,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  Alert,
  Linking,
} from "react-native";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from 'react-native-webview';

const ConfirmOrderDetails = ({ route }) => {
  const { formData, shippmentChargeValue } = route.params;
  const navigation = useNavigation();
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);


  const handleShouldStartLoadWithRequest = (request) => {
    // Check if the URL matches your app's deep link pattern
    if (request.url.startsWith('https://twicks.in/orderConfirmationPage/')) {
      // Prevent the WebView from navigating to the web
      return false;
    }
    // Allow other navigations
    return true;
 };

 const handleNavigationStateChange = (navState) => {
  if (navState.url.startsWith('https://twicks.in/orderConfirmationPage/')) {
    // Extract any necessary data from the URL
    const orderConfirmationData = navState.url.split('twicks.in//OrderConfirmation')[1];

    // Navigate to the order confirmation page within your app
    navigation.navigate('OrderConfirmation', { data: orderConfirmationData });
  }
};




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
  console.log(cart)
  useEffect(() => {
    if (cart) {
      let totalPrice = 0;
      for (let i = 0; i < cart.products.length; i++) {
        totalPrice +=cart.products[i]?.productId?.price * cart.products[i]?.units;
      }
      setTotal(totalPrice);
    }
  }, [cart]);
  let url

  const handleOrderFunction = async (event) => {
    event.preventDefault();
    try {
      if (shippmentChargeValue === undefined) {
        alert(
          "Submit adress details and calculate shipment before placing order"
        );
      } else {
        const { data } = await axios.post(
          "https://backend.twicks.in/api/putUserAddress",
          {
            userId: user._id,
            userName: formData.userName,
            street: formData.Address,
            landmark: formData.Address2,
            email: formData.Email,
            city: formData.City,
            country: formData.Country,
            state: formData.State,
            zipCode: formData.PinCode,
          }
        );
        if (data.success) {
          const totalPayAmount = total + shippmentChargeValue;
          const { data } = await axios.post(
            "https://backend.twicks.in/api/pay/phonePePayment",
            {
              amount: totalPayAmount,
              cartId: cart._id,
            }
          );
          if (data.success) {
           url = data?.data
          handlePress(data.data)
            // navigation.navigate(data.data)
          }
        } else {
          toast.error(`${data.message}`, {
            position: "bottom-right",
            autoClose: 8000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      }
    } catch (error) {
      console.error("Failed to submit form", error);
    }
  };


    const handlePress = useCallback(async (data) => {
      const supported = await Linking.canOpenURL(data);
      if (supported) {
        await Linking.openURL(data);
      } else {
        Alert.alert(`Don't know how to open this URL: ${data }`);
      }
    }, []);
   
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#F5FCFF",
          width: "100%",
        }}
      >
        <ScrollView>
          <View>
            <View style={{ paddingHorizontal: 30, paddingTop: 30 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Your Order Details
              </Text>
            </View>
            <View
              style={{
                margin: 20,
                padding: 10,
                backgroundColor: "white",
                borderRadius: 10,
                shadowOffset: {
                  width: 2,
                  height: 2,
                },
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={styles.cellname}>Product Name</Text>
                  <Text style={styles.cell}>Quantity</Text>
                  <Text style={styles.cell}>Price</Text>
                  <Text style={styles.cell}>Total</Text>
                </View>
                {cart?.products?.map((product, index) => (
                  <View key={index} style={styles.row}>
                    <Text style={styles.cellname}>
                      {product?.productId?.title}
                    </Text>
                    <Text style={styles.cell}>{product?.units}</Text>
                    <Text style={styles.cell}>
                      ₹{product?.productId?.price}
                    </Text>
                    <Text style={styles.cell}>
                      ₹{product?.productId?.price * product?.units}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ padding: 15 }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 10,
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    Product Subtotal:
                  </Text>
                  <Text style={{ fontWeight: "bold", fontSize: 13 }}>
                    ₹{total}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 10,
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    Shipping Charges:
                  </Text>
                  <Text style={{ fontWeight: "bold", fontSize: 13 }}>
                    ₹{shippmentChargeValue}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 10,
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    Order Total:
                  </Text>
                  <Text style={{ fontWeight: "bold", fontSize: 13 }}>
                    ₹{total + shippmentChargeValue}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ padding: 30 }}>
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Confirm Address:
                </Text>
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", paddingTop: 10 }}
                >
                  Name :{" "}
                  <Text style={{ fontWeight: 400 }}>{formData?.userName}</Text>
                </Text>
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", paddingTop: 5 }}
                >
                  Address :{" "}
                  <Text style={{ fontWeight: 400 }}>
                    {formData?.Address} , {formData?.City} {formData?.State}
                    {formData?.Country}
                  </Text>
                </Text>
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", paddingTop: 5 }}
                >
                  Number :{" "}
                  <Text style={{ fontWeight: 400 }}>{formData?.Contact} </Text>
                </Text>
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", paddingTop: 5 }}
                >
                  Email :{" "}
                  <Text style={{ fontWeight: 400 }}>{formData?.Email}</Text>
                </Text>
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", paddingTop: 5 }}
                >
                  Pin :{" "}
                  <Text style={{ fontWeight: 400 }}>{formData?.PinCode} </Text>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
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
          <Pressable
            onPress={handleOrderFunction}
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
            <Text style={{ color: "white", fontSize: 20 }}>Place Order</Text>
            {/* <OpenURLButton url={"https://google.com"}>Open Unsupported URL</OpenURLButton> */}

          </Pressable>
        </View>

      </SafeAreaView>
    </>
  );
};
export default ConfirmOrderDetails;

const styles = StyleSheet.create({
  table: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 10,
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  cellname: {
    flex: 2,
    textAlign: "left",
  },
});
