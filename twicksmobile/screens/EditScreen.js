import {
  StyleSheet,
  Alert,
  TextInput,
  Pressable,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const EditScreen = () => {
  const navigate = useNavigation();
  const [userData, setUserData] = useState({});

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

  const [inputHandler, setInputHandler] = useState({
    id: userData?._id,
    userName: "",
    email: "",
  });
  const handleSubmit = async (req, res) => {
    if (inputHandler.email === "") {
      Alert.alert("Enter Email");
    } else if (inputHandler.userName === "") {
      Alert.alert("Enter the UserName");
    } else {
      try {
        const { data } = await axios.put(
          `https://backend.twicks.in/auth/updateUserInfo/${userData?._id}`,
          {
            userId: userData?._id,
            email: inputHandler?.email,
            userName: inputHandler?.userName,
          }
        );
        if (data.success) {
          onLogOut();
        }
      } catch (err) {
        console.log("Error while updating the user details",err);
      }

      
    }
  };

  const onChangeInputHandler = (value, name) => {
    setInputHandler((prevInputHandler) => {
      return { ...prevInputHandler, [name]: value };
    });
  };

  const onLogOut = async () => {
    try {
      Alert.alert(
        "Updated",
        "Please login again",
        [{ text: "OK", onPress: () => navigate.navigate("Login") }],
        { cancelable: false }
      );

      await AsyncStorage.clear();
      navigate.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("auth_token");
        if (token !== null) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          navigate.navigate("Login");
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, [navigate]);
  return (
    <>
      {isLoggedIn && (
        <View
          style={{ padding: 10, backgroundColor: "#237169", height: "100%" }}
        >
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ paddingVertical: 5, fontSize: 20, color: "white" }}>
              Name
            </Text>
            <TextInput
              onChangeText={(value) => onChangeInputHandler(value, "userName")}
              placeholder={userData.userName}
              style={{ fontSize: 30, color: "white" }}
              placeholderTextColor={"rgb(187, 182, 182);"}
            />
            <View style={styles.line}></View>
          </View>

          <View style={{ paddingVertical: 10 }}>
            <Text style={{ paddingVertical: 5, fontSize: 20, color: "white" }}>
              Email ID
            </Text>
            <TextInput
              onChangeText={(value) => onChangeInputHandler(value, "email")}
              placeholder={userData.email}
              style={{ fontSize: 30, color: "white" }}
              placeholderTextColor={"rgb(187, 182, 182);"}
            />
            <View style={styles.line}></View>
          </View>

          <View>
            <Pressable
              onPress={handleSubmit}
              style={{
                backgroundColor: "#28635D",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ color: "white", padding: 14, fontSize: 20 }}>
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "white",
    // marginVertical: 10,
  },
});
