import { SafeAreaView, StyleSheet, ScrollView, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import OrderCard from "../component/OrderCard";
import { useNavigation } from "@react-navigation/native";
import { useFetch } from "../hooks/api_hook";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderScreen = () => {
  const navigate = useNavigation();
  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState([]);

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

  useEffect(() => {
    if (userData._id) {
      const fetchOrders = async () => {
        const { data: fetchedOrders } = await useFetch(
          `/api/getAllOrderByUser/${userData._id}`
        );
        setOrders(fetchedOrders);
        console.log(fetchedOrders)
      };

      fetchOrders();
    }
  }, [userData]);

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          {orders &&
            orders.map((order, index) => {
              <OrderCard key={index} order={order} />;
            })}
            <OrderCard/>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
