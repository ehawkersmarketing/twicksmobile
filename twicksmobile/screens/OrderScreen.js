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
  const { data: fetchedOrders } = useFetch(
    `/api/getAllOrderByUser/${userData._id}`
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        const user = JSON.parse(userString);
        setUserData(user);
        // console.log(userData);
        // console.log(userData._id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <SafeAreaView>
        <ScrollView
          style={{ padding: 10, backgroundColor: "#237169", height: "100%" }}
        >
          {fetchedOrders &&
            fetchedOrders.map((item, index) => {
              // console.log("vfjdhcjfdbcfmnrbjhervfehj",fetchedOrders);

              return <OrderCard item={item} index={index} />;
            })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
