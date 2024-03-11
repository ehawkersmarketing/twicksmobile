import {
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import OrderCard from "../component/OrderCard";
import { useNavigation } from "@react-navigation/native";
import { useFetch } from "../hooks/api_hook";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderScreen = () => {
  const navigate = useNavigation();
  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState([]);
  const { data: fetchedOrders } = useFetch(
    `/api/getAllOrderByUser/${userData._id}`
  );
  console.log(userData?._id)

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
        <SafeAreaView>
          {fetchedOrders && fetchedOrders.length > 0 ? (
            <ScrollView
              key={userData?._id}
              style={{ padding: 10, backgroundColor: "white", height: "100%" }}
            >
              {fetchedOrders &&
                fetchedOrders.map((item, index) => {
                  return <OrderCard item={item} index={index} />;
                })}
            </ScrollView>
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: "50%",
                gap: 70,
              }}
            >
              <Text style={{ fontSize: 20 }}>
                You don't have any order yet!!
              </Text>
              <Pressable
                onPress={() => navigate.navigate("Back")}
                style={{
                  backgroundColor: "#28635D",
                  padding: 14,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 10,
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>
                  Continue Shopping
                </Text>
              </Pressable>
            </View>
          )}
        </SafeAreaView>
      )}
    </>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
