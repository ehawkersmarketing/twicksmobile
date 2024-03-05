import {
  Pressable,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import CartCard from "../component/CartCard";

const CartScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <ScrollView>
        <View style={{ flex: 1, padding: 10, alignItems: "flex-start" }}>
          <View style={{width:"100%"}}>
            <CartCard />
            <CartCard />
            <CartCard />
            <CartCard />
          </View>

          {/* <View style={{ flex: 1 }}>
          <Button
            title="Order Confirmation"
            onPress={() => navigation.navigate("OrderConfirmation")}
          ></Button>
          <Button
            title="Login"
            onPress={() => navigation.navigate("Login")}
          ></Button>
          <Button
            title="Register"
            onPress={() => navigation.navigate("Register")}
          ></Button>
          <Button
            title="Return And Refund"
            onPress={() => navigation.navigate("ReturnAndRefund")}
          ></Button>
          <Button
            title="Term And Condition"
            onPress={() => navigation.navigate("TermAndCondition")}
          ></Button>
          <Button
            title="Privacy Policy"
            onPress={() => navigation.navigate("PrivacyPolicy")}
          ></Button>
        </View> */}
          <View style={styles.line}></View>

          <View style={{ flexDirection: "row" }}>
            <Pressable
              // onPress={navigation.navigate("OrderConfirmation")}
              style={{
                backgroundColor: "#28635D",
                padding: 14,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                marginTop: 10,
                flex: 1,
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                Proceed To Checkout
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#28635D",
                padding: 14,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                marginTop: 10,
                flex: 1,
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                Continue Shopping
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({

  rowmain: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cellmain: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    fontSize: 20,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    fontSize: 15,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
});
