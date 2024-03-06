import {
  SafeAreaView,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import CheckBox from "@react-native-community/checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFetch } from "../hooks/api_hook";
import axios from "axios";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [formField, setFormField] = useState({
    phone: "",
    otp: "",
    userName: "",
    checkbox: 0,
  });
  const { data: users } = useFetch("/auth/users");

  const handleChangeFormField = (name, value) => {
    if (name === "phone" || name === "otp" || name === "userName") {
      value = value.replace(/[^0-9]/g, "");
    }
    console.log(name, value);
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
          console.log(data);
          token = data.token;
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
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
          navigation.navigate("Back");
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
  return (
    <>
      <SafeAreaView style={styles.homemain}>
        <ScrollView>
          <View style={{ flex: 1, backgroundColor: "#20746C" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#FAFAFA",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 15,
                height: 60,
              }}
            >
              <Pressable
                onPress={() => navigation.navigate("Back")}
                style={styles.headerlogo}
              >
                <Image
                  style={{ width: 130, height: 48 }}
                  source={require("../assets/logo.png")}
                />
              </Pressable>
            </View>
            <View style={{ flex: 2, backgroundColor: "#20756C" }}>
              <Image
                style={{ width: "60%", height: 320 }}
                source={require("../assets/login.png")}
              />
            </View>

            <View style={{ paddingHorizontal: 15, flex: 2 }}>
              <View>
                <View style={{ alignItems: "center", marginVertical: 20 }}>
                  <Text style={{ fontSize: 30 }}>Login Account</Text>
                </View>
                <View>
                  <View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        paddingVertical: 10,
                        flexDirection: "row",
                      }}
                    >
                      <TextInput
                        style={{
                          flex: 4,
                          height: 40,
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
                        keyboardType="phone-pad"
                        maxLength={10}
                      />
                      <Pressable
                        style={{
                          flex: 1,
                          height: 40,
                          // padding: 10,
                          backgroundColor: "#4EB666",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onPress={onSendOtp}
                      >
                        <Text style={{ fontSize: 16, color: "gray" }}>otp</Text>
                      </Pressable>
                    </View>
                  </View>
                  <View style={styles.container}>
                    <TextInput
                      style={styles.input}
                      onChangeText={(value) =>
                        handleChangeFormField("otp", value)
                      }
                      value={formField.otp}
                      placeholder="Enter OTP"
                      keyboardType="numeric"
                    />
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>Keep me signed in</Text>
                      <Pressable>
                        <Text>Forgot Password?</Text>
                      </Pressable>
                    </View>
                  </View>
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
                      <Text style={{ fontSize: 30, color: "white" }}>
                        Login
                      </Text>
                    </LinearGradient>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  homemain: {
    backgroundColor: "#FAFAFA",
    padding: 10,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
    justifyContent: "space-between",
    alignItems: "center",
    // gap: 10,
    height: 40,
    // backgroundColor: "yellow",
  },
  headerlogo: {
    flexDirection: "row",
    alignItems: "center",
    width: 10,
    height: 130,
    // marginLeft: 20,
    // flex:1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 10,
  },
  input: {
    height: 40,
    // borderColor: "gray",
    // borderWidth: 1,
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
