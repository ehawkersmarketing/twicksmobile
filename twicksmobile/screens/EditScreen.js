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
        console.log(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const [inputHandler, setInputHandler] = useState({
    id: userData._id,
    userName: "",
    email: "",
  });
  const handleSubmit = async (req, res) => {
    if (inputHandler.email === "") {
      Alert.alert("Enter Email");
    } else if (inputHandler.userName === "") {
      Alert.alert("Enter the UserName");
    } else {
      // console.log("mil gyi id" + userData._id);
      const { data } = await axios.post(
        `https://backend.twicks.in/api/putUserAddress`,
        {
          userId: userData._id,
          email: inputHandler.email,
          userName: inputHandler.userName,
        }
      );
      if (data.success) {
      }
      onLogOut();
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
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, []);
  return (
    <>
      <View style={{ padding: 10 }}>
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ paddingVertical: 5, fontSize: 20 }}>Name</Text>
          <TextInput
            onChangeText={(value) => onChangeInputHandler(value, "userName")}
            placeholder={userData.userName}
            style={{ fontSize: 30 }}
          />
          <View style={styles.line}></View>
        </View>

        <View style={{ paddingVertical: 10 }}>
          <Text style={{ paddingVertical: 5, fontSize: 20 }}>Email ID</Text>
          <TextInput
            onChangeText={(value) => onChangeInputHandler(value, "email")}
            placeholder={userData.email}
            style={{ fontSize: 30 }}
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
              Edit
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
    // marginVertical: 10,
  },
});
