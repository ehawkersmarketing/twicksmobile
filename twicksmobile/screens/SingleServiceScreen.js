import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  View,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'

import { useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SingleServiceScreen = () => {
  const navigate = useNavigation();
  const [user, setUser] = useState(null);
  const route = useRoute();
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

  const { serviceId, serviceName, serviceImage, serviceDetais } = route.params;

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

  // console.log("user", user);

  const submitData = () => {
    submitEnquiry();
    sendToWhatsapp();
  };

  const submitEnquiry = async (event) => {
    const { data } = await axios.post(
      "https://backend.twicks.in/api/generateEnquiry",
      {
        name: user.userName,
        mobile: user.phone,
        email: user.email,
        message: `Hello, I am interested in [${serviceName}]`,
      }
    );
    if (data.success) {
      Alert.alert(
        "Twicks ,Thankyou for contacting TAFI - Twicks Agro Farm Industries"
      );
    } else {
      console.log("failed submit");
    }
  };

  const sendToWhatsapp = async (event) => {
    const { data } = await axios.post(
      "https://backend.twicks.in/api/sendToWhatsapp",
      {
        name: user.userName,
        mobile: user.phone,
        email: user.email,
        message: `Hello, I am interested in [${serviceName}]`,
      }
    );
    if (data.data.data.status) {
      console.log("Data send successfully");
    } else {
      console.log("failed submit");
    }
  };

  return (
    <>
      {isLoggedIn && (
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F5FCFF",
          }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View>
              <Image
                style={{
                  resizeMode: "contain",
                  width: "100%",
                  height: 270,
                }}
                source={{ uri: serviceImage }}
              />
            </View>

            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 35 }}>{serviceName}</Text>
              <View style={styles.line}></View>

              <Text style={{ fontSize: 20, textAlign: "justify" }}>
                {serviceDetais}
              </Text>
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

            <View>
              <Pressable
                onPress={submitData}
                style={{
                  backgroundColor: "#28635D",
                  padding: 14,
                  borderRadius: 10,
                  alignItems: "center",
                  marginHorizontal: 10,
                  marginTop: 10,
                  flexDirection: "row",
                  gap: 10,
                  bottom: 0,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>
                  Show Interest
                </Text>
                <FontAwesome name="whatsapp" size={20} color="white" />
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default SingleServiceScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 100,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
});
