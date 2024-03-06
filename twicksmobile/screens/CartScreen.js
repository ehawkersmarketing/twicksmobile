import {
  Pressable,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import CartCard from "../component/CartCard";
import { useFetch } from "../hooks/api_hook";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = () => {
  const navigation = useNavigation();
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);

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
  let { data: cart } = useFetch(`/api/getCartByUser/${user?._id}`);
  // console.log(cart?.products)
  useEffect(() => {
    if (cart) {
      let totalPrice = 0;
      for (let i = 0; i < cart.products.length; i++) {
        totalPrice +=
          cart.products[i]?.productId?.price * cart.products[i]?.units;
      }
      setTotal(totalPrice);
    }
  }, [cart]);

  const increaseValueHandler = async (index) => {
    try {
      if (
        cart.products[index].units ==
        cart.products[index].productId.units.maxQuantity
      ) {
        Alert.alert("You have reached product max limit");
        // toast.error(`You have reached product max limit`, {
        //   position: "bottom-right",
        //   autoClose: 8000,
        //   pauseOnHover: true,
        //   draggable: true,
        //   theme: "dark",
        // });
      } else {
        const { data } = await axios.put(
          `https://backend.twicks.in/api/addToCart`,
          {
            userId: user._id,
            productId: cart.products[index].productId._id,
            units: 1,
          }
        );
        if (data.success) {
          window.location.reload();
        } else {
          console.log(data.message);
          // toast.error(`${data.message}`, {
          //   position: "bottom-right",
          //   autoClose: 8000,
          //   pauseOnHover: true,
          //   draggable: true,
          //   theme: "dark",
          // });
        }
      }
    } catch (error) {
      console.log("catch", error.message);
      // toast.error(`${error.message}`, {
      //   position: "bottom-right",
      //   autoClose: 8000,
      //   pauseOnHover: true,
      //   draggable: true,
      //   theme: "dark",
      // });
    }
  };

  const decreaseValueHandler = async (index) => {
    try {
      const { data } = await axios.delete(
        `https://backend.twicks.in/api/dropFromCart/${user._id}/${cart.products[index].productId._id}`
      );
      if (data.success) {
        console.log("sucess");
        // window.location.reload();
      } else {
        console.log(data.message);
        // toast.error(`${data.message}`, {
        //   position: "bottom-right",
        //   autoClose: 8000,
        //   pauseOnHover: true,
        //   draggable: true,
        //   theme: "dark",
        // });
      }
    } catch (error) {
      console.log(error.message);
      // toast.error(`${error.message}`, {
      //   position: "bottom-right",
      //   autoClose: 8000,
      //   pauseOnHover: true,
      //   draggable: true,
      //   theme: "dark",
      // });
    }
  };
  return (
    <>
      <ScrollView>
        <View style={{ flex: 1, padding: 10, alignItems: "flex-start" }}>
          <View style={{ width: "100%" }}>
            {cart &&
              cart.products.map((item, index) => (
                <CartCard item={item} key={index} />
              ))}
          </View>

          <View style={{ flex: 1 }}>
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
          </View>
          <View style={styles.line}></View>

          <View style={{ flexDirection: "row" }}>
            <Pressable
              onPress={() => navigation.navigate("Checkout")}
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
