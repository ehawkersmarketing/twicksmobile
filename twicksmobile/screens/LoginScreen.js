import {
  SafeAreaView,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from "react-native";
import React from "react";
import CheckBox from "@react-native-community/checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/core";

const LoginScreen = () => {
  const navigate = useNavigation();
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
                  <View style={styles.container}>
                    <TextInput
                      style={styles.input}
                      placeholder="User Name"
                      placeholderTextColor="#888"
                    ></TextInput>
                  </View>
                  <View style={styles.container}>
                    <TextInput
                      style={styles.input}
                      placeholder="Mobile No"
                      placeholderTextColor="#888"
                    ></TextInput>
                  </View>
                  <View style={styles.container}>
                    <TextInput
                      style={styles.input}
                      placeholder="OTP"
                      placeholderTextColor="#888"
                    ></TextInput>
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
                  <View style={{ paddingVertical: 30 }}>
                    <Pressable
                      style={{
                        backgroundColor: "pink",
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ padding: 10, fontSize: 27 }}>Login</Text>
                    </Pressable>
                  </View>
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
    paddingVertical: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#EBF6F5",
    borderLeftColor: "#44A98B",
    borderLeftWidth: 8,
  },
});

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   Button,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import { useToast } from "react-native-toast-notifications";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const LoginScreen = () => {
//   const navigation = useNavigation();
//   const [formField, setFormField] = useState({
//     phone: "",
//     otp: "",
//     checkbox: 0,
//   });
//   const toast = useToast();

//   useEffect(() => {
//     checkToken();
//   }, []);

//   const checkToken = async () => {
//     const token = await AsyncStorage.getItem("token");
//     if (token) {
//       navigation.navigate("Home"); // Navigate to home screen if token exists
//     }
//   };

//   const handleChangeFormField = (name, value) => {
//     if (name === "phone" || name === "otp") {
//       value = value.replace(/[^0-9]/g, "");
//     }
//     console.log(name, value);
//     setFormField({ ...formField, [name]: value });
//   };

//   const onSendOtp = async () => {
//     try {
//       console.log("hiii", formField.phone);
//       const response = await axios.post(
//         "https://backend.twicks.in/auth/sendOtp",
//         {
//           phone: formField.phone,
//         }
//       );
//       console.log(response);
//       console.log("hiii");
//       if (response.data.success) {
//         Alert.alert(
//           "Success",
//           "OTP Sent successfully",
//           [
//             {
//               text: "OK",
//               onPress: () => console.log("OK Pressed"),
//               style: "default",
//             },
//           ],
//           { cancelable: false }
//         );
//         // Save the token for later use
//         await AsyncStorage.setItem("token", response.data.token);
//       } else {
//         Alert.alert(
//           "Error",
//           "Failed to send OTP",
//           [
//             {
//               text: "OK",
//               onPress: () => console.log("OK Pressed"),
//               style: "default",
//             },
//           ],
//           { cancelable: false }
//         );
//       }
//     } catch (error) {
//       Alert.alert(
//         "Error",
//         "Error sending OTP",
//         [
//           {
//             text: "OK",
//             onPress: () => console.log("OK Pressed"),
//             style: "default",
//           },
//         ],
//         { cancelable: false }
//       );
//     }
//   };

//   const onLogin = async () => {
//     try {
//       const response = await axios.post(
//         "https://backend.twicks.in/auth/login",
//         {
//           phone: formField.phone,
//           otp: formField.otp,
//         }
//       );
//       console.log(response);
//       if (response.data.success) {
//         Alert.alert(
//           "Success",
//           "Logged in successfully",
//           [
//             {
//               text: "OK",
//               onPress: () => console.log("OK Pressed"),
//               style: "default",
//             },
//           ],
//           { cancelable: false }
//         );
//         await AsyncStorage.setItem("token", response.data.token);
//         navigation.navigate("Home");
//       } else {
//         Alert.alert(
//           "Error",
//           "Login failed",
//           [
//             {
//               text: "OK",
//               onPress: () => console.log("OK Pressed"),
//               style: "default",
//             },
//           ],
//           { cancelable: false }
//         );
//       }
//     } catch (error) {
//       Alert.alert(
//         "Error",
//         "Error logging in",
//         [
//           {
//             text: "OK",
//             onPress: () => console.log("OK Pressed"),
//             style: "default",
//           },
//         ],
//         { cancelable: false }
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         onChangeText={(value) => handleChangeFormField("phone", value)}
//         value={formField.phone}
//         placeholder="Enter your phone number"
//         keyboardType="phone-pad"
//         maxLength={10}
//       />
//       <Pressable onPress={onSendOtp}>
//         <Text>otp</Text>
//       </Pressable>

//       <TextInput
//         style={styles.input}
//         onChangeText={(value) => handleChangeFormField("otp", value)}
//         value={formField.otp}
//         placeholder="Enter OTP"
//         keyboardType="numeric"
//       />
//       <Button title="Login" onPress={onLogin} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingLeft: 10,
//   },
// });

// export default LoginScreen;
