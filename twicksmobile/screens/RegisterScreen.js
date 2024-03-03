import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Button,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [formField, setFormField] = useState({
    phone: "",
    otp: "",
    name: "",
    checkbox: 0,
  });
  const toast = useToast();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      navigation.navigate("Home"); // Navigate to home screen if token exists
    }
  };

  const handleChangeFormField = (name, value) => {
    if (name === "phone" || name === "otp" || name === "userName") {
      value = value.replace(/[^0-9]/g, "");
    }
    console.log(name, value);
    setFormField({ ...formField, [name]: value });
  };
  const onSendOtp = async () => {
    try {
      console.log("hiii", formField.phone);
      const response = await axios.post(
        "https://backend.twicks.in/auth/sendOtp",
        {
          phone: formField.phone,
        }
      );
      console.log(response);
      console.log("hiii");
      if (response.data.success) {
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
        await AsyncStorage.setItem("token", response.data.token);
      } else if (response.data.message === "User already registered") {
        Alert.alert(
          "Error",
          "User already registered",
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
        Alert.alert(
          "Error",
          "Failed to send OTP",
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
      Alert.alert(
        "Error",
        "Error sending OTP",
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
  };

  const onSignUp = async () => {
    try {
      const response = await axios.post(
        "https://backend.twicks.in/auth/signup",
        {
          phone: formField.phone,
          name: formField.userName,
          otp: formField.otp,
        }
      );
      if (response.data.success) {
        Alert.alert(
          "Success",
          "User registered successfully",
          [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
              style: "default",
            },
          ],
          { cancelable: false }
        );
        navigation.navigate("Home");
      } else {
        Alert.alert(
          "Error",
          response.data.message,
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
      // Handle errors
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
                // gap: 10,
                height: 60,
                // backgroundColor: "yellow",
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
            <View
              style={{
                margin: 10,
                flex: 2,
                backgroundColor: "#20756C",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Image
                style={{ width: 80, height: 80 }}
                source={require("../assets/login.png")}
              />
              <View style={{ marginVertical: 20, alignItems: "center" }}>
                <Text colors={["#cc2b5e", "#753a88"]} style={styles.text}>
                  Register
                </Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: 15, flex: 2 }}>
              <View style={styles.container}>
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
                      value={formField.name}
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
                    onPress={onSignUp}
                  >
                    <Text style={{ fontSize: 30, color: "white" }}>
                      Register
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
    padding: 10,
    backgroundColor: "#EBF6F5",
    borderLeftColor: "#44A98B",
    borderLeftWidth: 8,
  },
  text: {
    fontSize: 55,
    fontFamily: "Gill Sans",
    fontWeight: "bold",
    color: "white",
  },
});

export default RegisterScreen;
