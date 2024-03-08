import { SafeAreaView, StyleSheet, ScrollView, Text, View } from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReturnAndRefund = () => {
  const navigate = useNavigation();
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
          <ScrollView>
            <View style={{ padding: 15 }}>
              <Text
                style={{ fontSize: 40, fontWeight: "bold", color: "#000000" }}
              >
                Return And Refund
              </Text>
              <View style={styles.line}></View>
              <Text style={styles.text}>
                At TAFI, we prioritize your satisfaction with our products. Our
                Return and Refund Policy is designed to make the return process
                as simple and hassle-free as possible.
              </Text>
              <Text style={styles.text}>
                You can return any product purchased from our official website
                within 30 days from the shipping date.
              </Text>
              <Text style={styles.text}>
                Refunds will be processed within 5-7 working days from the date
                we receive the returned product. Please note that the actual
                refund timeline may vary depending on your payment method and
                financial institution.
              </Text>
              <Text style={styles.HeadMain}>Refund Process:</Text>
              <Text style={styles.subMain}>
                Full Refund (UPI/Credit Card/Debit Card):
              </Text>
              <Text style={styles.text}>
                For orders paid via UPI, Credit Card, or Debit Card, you are
                eligible for a full refund. The refund will be processed to the
                original payment method.
              </Text>
              <Text style={styles.HeadMain}>Return Procedure:</Text>
              <Text style={styles.text}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    color: "#000000",
                    paddingVertical: 10,
                  }}
                >
                  a.
                </Text>
                Log in to your TAFI account on our official website.
              </Text>
              <Text style={styles.text}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    color: "#000000",
                    paddingVertical: 10,
                  }}
                >
                  b.
                </Text>
                Go to the “Order History” section and select the order
                containing the item you wish to return.
              </Text>
              <Text style={styles.text}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    color: "#000000",
                    paddingVertical: 10,
                  }}
                >
                  c.
                </Text>
                Click on the “Return Items” button and follow the on-screen
                instructions to complete the return process.
              </Text>
              <Text style={styles.HeadMain}>Return Shipping:</Text>
              <Text style={styles.text}>
                There are no charges for return shipping. We want to ensure a
                convenient and cost-free return experience for our customers.
              </Text>
              <Text style={styles.HeadMain}>Contact Information:</Text>
              <Text style={styles.text}>
                If you have any questions or concerns about our Return and
                Refund Policy, please reach out to our customer support team at
                support@twicks.in.
              </Text>
              <Text style={styles.text}>
                TAFI reserves the right to update or modify this policy at any
                time without prior notice. We encourage our customers to review
                the policy periodically for any changes.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) }
    </>
  );
};

export default ReturnAndRefund;

const styles = StyleSheet.create({
  HeadMain: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#000000",
    paddingVertical: 10,
  },
  subMain: {
    fontSize: 29,
    fontWeight: "bold",
    color: "#000000",
    paddingVertical: 10,
  },
  text: {
    fontSize: 20,
    color: "#000000",
    paddingVertical: 10,
    textAlign: "justify",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
});
