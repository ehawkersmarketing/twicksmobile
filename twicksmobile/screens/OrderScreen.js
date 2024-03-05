import { SafeAreaView, StyleSheet, ScrollView, Text, View } from "react-native";
import React from "react";
import OrderCard from "../component/OrderCard";
const OrderScreem = () => {
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default OrderScreem;

const styles = StyleSheet.create({});
