// import {
//   SafeAreaView,
//   Pressable,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
// } from "react-native";
// import React from "react";
// import CheckBox from "@react-native-community/checkbox";
// import { LinearGradient } from "expo-linear-gradient";
// import { useNavigation } from "@react-navigation/core";

// const LoginScreen = () => {
//   const navigate = useNavigation();

//   const { id } = useParams();
//   const [path, setPath] = useState(id);
//   const { data: users } = useFetch("/auth/users");

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       navigate("/");
//     }
//   }, []);

//   useEffect(() => {
//     if (id) {
//       setPath(id);
//     }
//   }, [id]);

//   const [formField, setFormField] = useState({
//     phone: "",
//     otp: "",
//     userName: "",
//     checkbox: 0,
//   });
//   const onSendOtp = async (event) => {
//     try {
//       event.preventDefault();
//       if (formField.phone.length == 10) {
//         const userExists = users?.some(
//           (item) => item?.phone === formField.phone
//         );
//         console.log(userExists);
//         if (!userExists) {
//           toast.error(`User is not Registered`, {
//             position: "bottom-right",
//             autoClose: 8000,
//             pauseOnHover: true,
//             draggable: true,
//             theme: "dark",
//           });
//         } else {
//           const { data } = await axios.post(
//             "http://localhost:8080/auth/sendOtp",
//             {
//               phone: formField.phone,
//             }
//           );
//           token = data.token;
//           if (data.success) {
//             toast.success("OTP Sent successfully", {
//               position: "bottom-right",
//               autoClose: 8000,
//               pauseOnHover: true,
//               draggable: true,
//               theme: "dark",
//             });
//           }
//         }
//       } else {
//         toast.error("Please enter a valid phone number", {
//           position: "bottom-right",
//           autoClose: 8000,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "dark",
//         });
//       }
//     } catch (error) {
//       toast.error(`${error.response.data.message}`, {
//         position: "bottom-right",
//         autoClose: 8000,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//       });
//     }
//   };

//   const RegisterSendOtp = async (event) => {
//     try {
//       event.preventDefault();
//       if (formField.phone.length == 10) {
//         const { data } = await axios.post(
//           "http://localhost:8080/auth/sendOtp",
//           {
//             phone: formField.phone,
//           }
//         );
//         token = data.token;
//         if (data.success) {
//           toast.success("OTP Sent successfully", {
//             position: "bottom-right",
//             autoClose: 8000,
//             pauseOnHover: true,
//             draggable: true,
//             theme: "dark",
//           });
//         }
//       } else {
//         toast.error("Please enter a valid phone number", {
//           position: "bottom-right",
//           autoClose: 8000,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "dark",
//         });
//       }
//     } catch (error) {
//       toast.error(`${error.response.data.message}`, {
//         position: "bottom-right",
//         autoClose: 8000,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//       });
//     }
//   };

//   const onSignUp = async (event) => {
//     try {
//       event.preventDefault();
//       if (token) {
//         const { data } = await axios.post(
//           "http://localhost:8080/auth/verifyOtp",
//           {
//             otp: formField.otp,
//             token: token,
//           }
//         );
//         if (data.success) {
//           const { data } = await axios.post(
//             "http://localhost:8080/auth/signup",
//             {
//               phone: formField.phone,
//               userName: formField.userName,
//               email: formField.email,
//             }
//           );
//           if (data.success) {
//             localStorage.setItem("auth_token", token);
//             localStorage.setItem("user_id", data.data._id);
//             if (formField.checkbox == 0) {
//               forgotOnClose();
//             }
//             navigate("/auth/login");
//           } else {
//             toast.error(data.message, {
//               position: "bottom-right",
//               autoClose: 8000,
//               pauseOnHover: true,
//               draggable: true,
//               theme: "dark",
//             });
//           }
//         } else {
//           toast.error(data.message, {
//             position: "bottom-right",
//             autoClose: 8000,
//             pauseOnHover: true,
//             draggable: true,
//             theme: "dark",
//           });
//         }
//       } else {
//         toast.error("Please enter a valid OTP", {
//           position: "bottom-right",
//           autoClose: 8000,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "dark",
//         });
//       }
//     } catch (error) {
//       toast.error(`${error.response.data.message}`, {
//         position: "bottom-right",
//         autoClose: 8000,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//       });
//     }
//   };

//   const onLogin = async (event) => {
//     try {
//       event.preventDefault();
//       if (token) {
//         const { data } = await axios.post("http://localhost:8080/auth/login", {
//           phone: formField.phone,
//           otp: formField.otp,
//           token: token,
//         });
//         if (data.success) {
//           localStorage.setItem("auth_token", token);
//           localStorage.setItem("user", JSON.stringify(data.data));
//           localStorage.setItem("user_id", data.data._id);
//           if (formField.checkbox == 0) {
//             forgotOnClose();
//           }
//           navigate("/");
//         } else {
//           toast.error(data.message, {
//             position: "bottom-right",
//             autoClose: 8000,
//             pauseOnHover: true,
//             draggable: true,
//             theme: "dark",
//           });
//         }
//       } else {
//         toast.error("Please enter a valid phone number", {
//           position: "bottom-right",
//           autoClose: 8000,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "dark",
//         });
//       }
//     } catch (error) {
//       toast.error(`${error.response.data.message}`, {
//         position: "bottom-right",
//         autoClose: 8000,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//       });
//     }
//   };
//   const onTogglePage = (path) => {
//     setPath(path);
//   };
//   return (
//     <>
//       <SafeAreaView style={styles.homemain}>
//         <ScrollView>
//           <View style={{ flex: 1, backgroundColor: "#20746C" }}>
//             <View
//               style={{
//                 flex: 1,
//                 flexDirection: "row",
//                 backgroundColor: "#FAFAFA",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 paddingHorizontal: 15,
//                 // gap: 10,
//                 height: 60,
//                 // backgroundColor: "yellow",
//               }}
//             >
//               <Pressable
//                 onPress={() => navigation.navigate("Home")}
//                 style={styles.headerlogo}
//               >
//                 <Image
//                   style={{ width: 130, height: 48 }}
//                   source={require("../assets/logo.png")}
//                 />
//               </Pressable>
//             </View>
//             <View style={{ flex: 2, backgroundColor: "#20756C" }}>
//               <Image
//                 style={{ width: "60%", height: 320 }}
//                 source={require("../assets/login.png")}
//               />
//             </View>
//             {path === "login" && (
//             <View style={{ paddingHorizontal: 15, flex: 2 }}>
//               <View>
//                 <View style={{ alignItems: "center", marginVertical: 20 }}>
//                   <Text style={{ fontSize: 30 }}>Login Account</Text>
//                 </View>
//                 <View>
//                   <View style={styles.container}>
//                     <TextInput
//                       style={styles.input}
//                       placeholder="Mobile No"
//                       placeholderTextColor="#888"
//                     ></TextInput>
//                   </View>
//                   <View style={styles.container}>
//                     <TextInput
//                       style={styles.input}
//                       placeholder="OTP"
//                       placeholderTextColor="#888"
//                     ></TextInput>
//                   </View>
//                   <View>
//                     <View
//                       style={{
//                         flexDirection: "row",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <Text>Keep me signed in</Text>
//                       <Pressable>
//                         <Text>Forgot Password?</Text>
//                       </Pressable>
//                     </View>
//                   </View>
//                   <View style={{ paddingVertical: 30 }}>
//                     <Pressable
//                       style={{
//                         backgroundColor: "pink",
//                         borderRadius: 20,
//                         justifyContent: "center",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Text style={{ padding: 10, fontSize: 27 }}>Login</Text>
//                     </Pressable>
//                   </View>
//                 </View>
//               </View>
//             </View>)}
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   homemain: {
//     backgroundColor: "#FAFAFA",
//     padding: 10,
//   },
//   header: {
//     flex: 1,
//     flexDirection: "row",
//     backgroundColor: "#FAFAFA",
//     justifyContent: "space-between",
//     alignItems: "center",
//     // gap: 10,
//     height: 40,
//     // backgroundColor: "yellow",
//   },
//   headerlogo: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: 10,
//     height: 130,
//     // marginLeft: 20,
//     // flex:1
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingVertical: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     padding: 10,
//     backgroundColor: "#EBF6F5",
//     borderLeftColor: "#44A98B",
//     borderLeftWidth: 8,
//   },
// });

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [formField, setFormField] = useState({
    phone: "",
    otp: "",
    userName: "",
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
    setFormField({ ...formField, [name]: value });
  };

  const onSendOtp = async () => {
    try {
      const response = await axios.post(
        "http:/localhost:8081/auth/sendOtp",
        {
          phone: formField.phone,
        }
      );
      console.log("hiii");
      if (response.data.success) {
        // toast.show("OTP Sent successfully", {
        //   type: "success",
        // });
        // Save the token for later use
        await AsyncStorage.setItem("token", response.data.token);
      } else {
        // toast.show("Failed to send OTP", {
        //   type: "error",
        // });
      }
    } catch (error) {
      // toast.show("Error sending OTP", {
      //   type: "error",
      // });
    }
  };

  const onSignUp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/auth/signup",
        {
          phone: formField.phone,
          userName: formField.userName,
          otp: formField.otp,
        }
      );
      if (response.data.success) {
        toast.show("User registered successfully", {
          type: "success",
        });
        // Navigate to login or home screen
        navigation.navigate("Login");
      } else {
        toast.show("Registration failed", {
          type: "error",
        });
      }
    } catch (error) {
      toast.show("Error registering user", {
        type: "error",
      });
    }
  };

  const onLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/auth/login",
        {
          phone: formField.phone,
          otp: formField.otp,
        }
      );
      console.log(response);
      if (response.data.success) {
        toast.show("Logged in successfully", {
          type: "success",
        });
        // Save the token for later use
        await AsyncStorage.setItem("token", response.data.token);
        // Navigate to home screen
        navigation.navigate("Home");
      } else {
        toast.show("Login failed", {
          type: "error",
        });
      }
    } catch (error) {
      toast.show("Error logging in", {
        type: "error",
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(value) => handleChangeFormField("phone", value)}
        value={formField.phone}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        maxLength={10}
      />
      <Button title="Generate OTP" onPress={onSendOtp} />
      <TextInput
        style={styles.input}
        onChangeText={(value) => handleChangeFormField("otp", value)}
        value={formField.otp}
        placeholder="Enter OTP"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) => handleChangeFormField("userName", value)}
        value={formField.userName}
        placeholder="Enter your username"
      />
      
      {/* <Button title="Login" onPress={onLogin} /> */}
      <Button title="Register" onPress={onSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default LoginScreen;
