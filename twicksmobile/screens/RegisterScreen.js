import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useFetch } from "../hooks/api_hook";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [formField, setFormField] = useState({
    phone: "",
    otp: "",
    userName: "",
  });
  const { data: users } = useFetch("/auth/users");
  const [token, setToken] = useState(null);

  const handleChangeFormField = (name, value) => {
    if (name === "phone" || name === "otp") {
      value = value.replace(/[^0-9]/g, "");
    }
    setFormField((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSendOtp = async () => {
    try {
      if (formField.phone.length == 10) {
        const userExists = users?.some(
          (item) => item?.phone === formField.phone
        );
        if (userExists) {
          Alert.alert(
            "Error",
            "User already Registered",
            [
              {
                text: "OK",
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
                  style: "default",
                },
              ],
              { cancelable: false }
            );
          }
        }
      } else {
        Alert.alert("Error", "Please enter a valid phone number", {
          cancelable: false,
        });
      }
    } catch (error) {
      Alert.alert("Error", error.response.data.message, { cancelable: false });
    }
  };

  const onSignUp = async () => {
    try {
      if (token) {
        const { data } = await axios.post(
          "https://backend.twicks.in/auth/verifyOtp",
          {
            otp: formField.otp,
            token: token,
          }
        );
        if (data.success) {

          const { data } = await axios.post(
            "https://backend.twicks.in/auth/signup",
            {
              phone: formField.phone,
              userName: formField.userName,
            }
          );
          if (data.success) {

            AsyncStorage.setItem("auth_token", token);
            AsyncStorage.setItem("user_id", data?.data._id);

            Alert.alert(
              "Success",
              "Successfully registered",
            { cancelable: false }
            );
            navigation.navigate("Back");
          } else {
            Alert.alert("Error", data.message, { cancelable: false });
          }
        } else {
          Alert.alert("Error", data.message, { cancelable: false });
        }
      } else {
        Alert.alert("Error", "Please enter a valid OTP", { cancelable: false });
      }
    } catch (error) {
      Alert.alert("Error", error.response.data.error, { cancelable: false });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
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
                  Register
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
                    <Text style={{ fontSize: 14, color: "white" }}>
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
              <View>
                <View style={styles.container}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(value) =>
                      handleChangeFormField("userName", value)
                    }
                    value={formField.userName}
                    placeholder="Enter your name"
                    placeholderTextColor="gray"
                  />
                </View>
              </View>
            </View>
            <View style={{ paddingHorizontal: 15 }}>
              <Pressable onPress={onSignUp}>
                <LinearGradient
                  start={{ x: 0.0, y: 0.25 }}
                  end={{ x: 1.3, y: 1.0 }}
                  locations={[0, 0.5, 1]}
                  colors={["#4EB666", "#42A559", "#ffffff"]}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginVertical: 20,
                    padding: 10,
                    backgroundColor: "green",
                    borderRadius: 25,
                  }}
                >
                  <Text style={{ fontSize: 20, color: "white" }}>Register</Text>
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
              <Text style={{ color: "white" }}>Already registered ? </Text>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: "#D4D7F3" }}>Login.</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  homemain: {
    backgroundColor: "#FAFAFA",
    flex: 1,
  },
  headerlogo: {
    flexDirection: "row",
    alignItems: "center",
    height: 130,
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

export default RegisterScreen;
