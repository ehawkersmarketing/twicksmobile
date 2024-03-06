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
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [formField, setFormField] = useState({
    phone: "",
    otp: "",
    userName: "",
    checkbox: 0,
  });

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
        const { data } = await axios.post(
          "https://backend.twicks.in/auth/sendOtp",
          {
            phone: formField.phone,
          }
        );
        token = data.token;
        if (data.success) {
          console.log("otp send successfully");
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
      } else {
        console.log("please enter a valid number");
        Alert.alert(
          "Error",
          "Please enter a valid phone number",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log("error", error);
      Alert.alert(
        "Error",
        error.response.data.message,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
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
              email: formField.email,
            }
          );
          if (data.success) {
            AsyncStorage.setItem("auth_token", token);
            // localStorage.setItem("user_id", data.data._id);
            // if (formField.checkbox == 0) {
            //   forgotOnClose();
            // }
            Alert.alert(
              "Success",
              "Successfully registered",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
            navigation.navigate("Home");
          } else {
            Alert.alert(
              "Error",
              error.response.data.message,
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
          }
        } else {
          Alert.alert(
            "Error",
            data.message,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        }
      } else {
        Alert.alert(
          "Error",
          "Please enter a valid OTP",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error.response.data.error,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  return (
    <>
      <SafeAreaView>
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
                onPress={() => navigation.navigate("Home")}
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
                style={{ width: "45%", height: 240 }}
                source={require("../assets/login.png")}
              />
            </View>
            <View style={{ paddingHorizontal: 15, flex: 2 }}>
              <View style={styles.container}>
                <View style={{ marginVertical: 20 }}>
                  <Text colors={["#cc2b5e", "#753a88"]} style={styles.text}>
                    Register
                  </Text>
                </View>
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
                  <View style={styles.container}>
                    <TextInput
                      style={styles.input}
                      onChangeText={(value) =>
                        handleChangeFormField("name", value)
                      }
                      value={formField.userName}
                      placeholder="Enter your name"
                    />
                  </View>
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
                  </View>
                </View>
                <Pressable onPress={onSignUp}>
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
                      Register here
                    </Text>
                  </LinearGradient>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

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

export default RegisterScreen;
