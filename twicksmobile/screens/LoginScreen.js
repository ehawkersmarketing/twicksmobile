import {
  SafeAreaView,
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFetch } from "../hooks/api_hook";
import axios from "axios";
import { Linking } from "react-native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [formField, setFormField] = useState({
    phone: "",
    otp: "",
    userName: "",
  });
  const { data: users } = useFetch("/auth/users");
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("auth_token");
        if (token !== null) {
          setIsLoggedIn(true);
          navigation.navigate("Back");
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, [navigation]);


  const handleChangeFormField = (name, value) => {
    if (name === "phone" || name === "otp" || name === "userName") {
      value = value.replace(/[^0-9]/g, "");
    }
    setFormField({ ...formField, [name]: value });
  };

  const onSendOtp = async () => {
    try {
      if (formField.phone.length == 10) {
        const userExists = users?.some(
          (item) => item?.phone === formField.phone
        );
        if (!userExists) {
          Alert.alert(
            "Error",
            "User not Registered",
            [
              {
                text: "OK",
                onPress: () => console.log("OK Pressed"),
                style: "default",
              },
            ],
            { cancelable: false }
          );
        } else {
          const { data } = await axios.post(
            "https://backend.twicks.in/auth/sendOtp",
            {
              phone: formField.phone,
            }
          );
          setToken(data.token);
          if (data.success) {
            Alert.alert(
              "Success",
              "OTP Sent successfully",
              [
                {
                  text: "OK",
                  onPress: () => console.log("OK Pressed"),
                  style: "default",
                },
              ],
              { cancelable: false }
            );
          }
        }
      } else {
        Alert.alert(
          "Error",
          "Please enter a valid phone number",
          [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
              style: "default",
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log("catch", error);
      Alert.alert(
        "Error",
        error.response.data.message,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  const onLogin = async () => {
    try {
      if (token) {
        const { data } = await axios.post(
          "https://backend.twicks.in/auth/login",
          {
            phone: formField.phone,
            otp: formField.otp,
            token: token,
          }
        );
        if (data.success) {
          AsyncStorage.setItem("auth_token", token);
          AsyncStorage.setItem("user", JSON.stringify(data.data));
          AsyncStorage.setItem("user_id", data.data._id);

          Alert.alert(
            "Success",
            "Login Successfully",
            [
              {
                text: "OK",
                onPress: () => {
                  navigation.navigate("Back");
                },
              },
            ],
            { cancelable: false }
          );
          setFormField({
            phone: "",
            otp: "",
          });
          setIsLoggedIn(true);

        } else {
          Alert.alert(
            "Error",
            "Please enter a valid OTP",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        }
      } else {
        Alert.alert(
          "Error",
          "Please enter a valid phone number",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error.response.data.message,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      console.log("navigated");      
      navigation.navigate("Back");
    }
  }, [isLoggedIn, navigation]);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.homemain}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#20746C",
              justifyContent: "center",
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <View
                style={{ backgroundColor: "#20756C", alignItems: "center" }}
              >
                <Image
                  style={{ width: 90, height: 90 }}
                  source={require("../assets/login.png")}
                />
              </View>
              <View style={{ alignItems: "center", marginVertical: 10 }}>
                <Text style={{ fontSize: 40, color: "white", fontWeight: 600 }}>
                  Login Account
                </Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: "4%", paddingVertical: "2%" }}>
              <View>
                <View
                  style={{
                    justifyContent: "center",
                    paddingVertical: 10,
                    flexDirection: "row",
                  }}
                >
                  <TextInput
                    style={{
                      flex: 2,
                      height: 45,
                      padding: 10,
                      backgroundColor: "#EBF6F5",
                      borderLeftColor: "#44A98B",
                      borderLeftWidth: 8,
                    }}
                    onChangeText={(value) =>
                      handleChangeFormField("phone", value)
                    }
                    value={formField.phone}
                    placeholder="Enter your phone number"
                    placeholderTextColor="gray"

                    keyboardType="phone-pad"
                    maxLength={10}
                  />
                  <Pressable
                    style={{
                      flex: 1,
                      height: 45,
                      backgroundColor: "#4EB666",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={onSendOtp}
                  >
                    <Text style={{ fontSize: 16, color: "white" }}>
                      Generate OTP
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View style={styles.container}>
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => handleChangeFormField("otp", value)}
                  value={formField.otp}
                  placeholder="Enter OTP"

                  placeholderTextColor="gray"

                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={{ paddingHorizontal: 15 }}>
              <Pressable onPress={onLogin}>
                <LinearGradient
                  start={{ x: 0.0, y: 0.25 }}
                  end={{ x: 1.3, y: 1.0 }}
                  locations={[0, 0.5, 1]}
                  colors={["#4EB666", "#42A559", "#ffffff"]}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginVertical: 30,
                    padding: 10,
                    backgroundColor: "green",
                    borderRadius: 25,
                  }}
                >
                  <Text style={{ fontSize: 20, color: "white" }}>Login</Text>
                </LinearGradient>
              </Pressable>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Text style={{ color: "white" }}>Haven't registered yet? </Text>
              <Pressable onPress={() => navigation.navigate("Register")}>
                <Text style={{ color: "#D4D7F3" }}> Create an account.</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  homemain: {
    backgroundColor: "#FAFAFA",
    flex: 1,
  },
  headerlogo: {
    flexDirection: "row",
    alignItems: "center",
    height: 130,
    position: "relative",
  },
  container: {
    justifyContent: "center",
    paddingVertical: 10,
  },
  input: {
    height: 45,
    padding: 10,
    backgroundColor: "#EBF6F5",
    borderLeftColor: "#44A98B",
    borderLeftWidth: 8,
  },
  text: {
    fontSize: 35,
    fontFamily: "Gill Sans",
    fontWeight: "bold",
  },
});
