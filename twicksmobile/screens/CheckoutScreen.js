import {
  Pressable,
  SafeAreaView,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { useFetch } from "../hooks/api_hook";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const [formData, setFormData] = useState({
    userName: "",
    Contact: "",
    Email: "",
    Address: "",
    City: "",
    State: "",
    PinCode: "",
    Country: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
    if (name === "Email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = emailRegex.test(value);
      setErrors({ ...errors, Email: !isValidEmail });
    }
  };
  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === "") {
        errors[key] = true;
      }
    });
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  let { data: cart } = useFetch(`/api/getCartByUser/${user?._id}`);
  useEffect(() => {
    if (cart) {
      let totalPrice = 0;
      for (let i = 0; i < cart.products?.length; i++) {
        totalPrice +=
          cart?.products[i]?.productId?.price * cart?.products[i]?.units;
      }
      setTotal(totalPrice);
    }
  }, [cart]);

  const handleSubmit = async () => {
    if (validateForm()) {
      const shippmentChargeValue = await calculateShippingCharges(
        formData.PinCode
      );

      navigation.navigate("ConfirmDetails", { formData, shippmentChargeValue });
    } else {
      // Handle form validation errors
    }
  };

  const [shipCharge, setShipCharge] = useState(undefined);
  const calculateShippingCharges = async (pincode) => {
    let totalWeight = 0;
    let totalPrice = 0;

    cart?.products?.forEach((product) => {
      const weight = product?.productId?.weight;
      const price = product?.productId?.price;
      const units = product?.units;

      totalWeight += weight * units;
      totalPrice += price * units;
    });

    try {
      const response = await axios.post(
        "https://backend.twicks.in/api/ship/calcShipment",
        {
          shipping_postcode: pincode,
          weight: totalWeight,
          declared_value: totalPrice,
          is_return: 0,
        }
      );
      const shipChargeValue = await response.data.shipPrice;
      setShipCharge(shipChargeValue);
      if (shipChargeValue != undefined) {
        return shipChargeValue;
      } else {
        Alert("INVALID OTP", "Please check your otp!!");
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  const paymentGateway = () => {};

  return (
    <>
      {isLoggedIn && (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#F5FCFF",
            width: "100%",
          }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 14, padding: 5 }}>Name</Text>
              <TextInput
                placeholder={user?.userName}
                placeholderTextColor="gray"
                style={[styles.input, errors.userName ? styles.inputError : {}]}
                onChangeText={(value) => handleInputChange("userName", value)}
              />
              <Text style={{ fontSize: 14, padding: 5 }}>Mobile</Text>
              <TextInput
                placeholder={user?.phone}
                placeholderTextColor="gray"
                style={[styles.input, errors.Contact ? styles.inputError : {}]}
                onChangeText={(value) => handleInputChange("Contact", value)}
              />
              <Text style={{ fontSize: 14, padding: 5 }}>Email Address</Text>
              <TextInput
                placeholder="Email Address"
                placeholderTextColor="gray"
                style={[styles.input, errors.Email ? styles.inputError : {}]}
                onChangeText={(value) => handleInputChange("Email", value)}
              />
              <Text style={{ fontSize: 14, padding: 5 }}>Address Line</Text>
              <TextInput
                placeholder="Address Line"
                placeholderTextColor="gray"
                style={[styles.input, errors.Address ? styles.inputError : {}]}
                onChangeText={(value) => handleInputChange("Address", value)}
              />
              <Text style={{ fontSize: 14, padding: 5 }}>Town / City</Text>
              <TextInput
                placeholder="Town / City"
                placeholderTextColor="gray"
                style={[styles.input, errors.City ? styles.inputError : {}]}
                onChangeText={(value) => handleInputChange("City", value)}
              />
              <Text style={{ fontSize: 14, padding: 5 }}>State</Text>
              <TextInput
                placeholder="State"
                placeholderTextColor="gray"
                style={[styles.input, errors.State ? styles.inputError : {}]}
                onChangeText={(value) => handleInputChange("State", value)}
              />
              <Text style={{ fontSize: 14, padding: 5 }}>Pincode</Text>
              <TextInput
                placeholder="Pincode"
                placeholderTextColor="gray"
                style={[styles.input, errors.PinCode ? styles.inputError : {}]}
                onChangeText={(value) => handleInputChange("PinCode", value)}
                maxLength={6}
                keyboardType="numeric"
              />
              <Text style={{ fontSize: 14, padding: 5 }}>Country / Region</Text>
              <TextInput
                placeholder="Country / Region"
                placeholderTextColor="gray"
                style={[styles.input, errors.Country ? styles.inputError : {}]}
                onChangeText={(value) => handleInputChange("Country", value)}
              />
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
              onPress={handleSubmit}
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
              <Text style={{ color: "white", fontSize: 20 }}>Continue</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  inputError: {
    borderColor: "red",
  },
  input: {
    padding: 10,
    fontSize: 15,
    backgroundColor: "#CAE4DE",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
  },
});
