import { StyleSheet, Alert, Pressable, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useFetch } from "../hooks/api_hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
const CartCard = ({ item, index }) => {
  console.log("hiiiiiiiiiii");
  console.log("bdbcjdsbcjdb",index)
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
  let { data: cart } = useFetch(`/api/getCartByUser/${user?._id}`);
  const increaseValueHandler = async (index) => {
    try {
      console.log(index)
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
        // console.log(data)
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

  // console.log("aa agyaaaA", item);
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
      <View
        style={{
          width: "100%",
          paddingVertical: 10,
          flex: 1,
          flexDirection: "row",
        }}
      >
        <Pressable
          key={item?._id}
          onPress={() =>
            navigation.navigate("Product", {
              cartId: item?._id,
              cartName: item?.title,

              cartPrice: item?.price,
            })
          }
          style={{
            borderColor: "#EBF6F5",
            borderWidth: 1,
            width: "100%",
            padding: 20,
            borderRadius: 4,
            backgroundColor: "#FFFFFF",
          }}
        >
          <Text style={{ fontWeight: "500", fontSize: 21 }}>
            {item?.productId.title}
          </Text>

          <Text style={{ fontWeight: "500", fontSize: 19 }}>
            Rs. {item?.productId.price}/-
          </Text>

          <Pressable
            onPress={() => decreaseValueHandler(index)}
            style={({ pressed }) => [
              {
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingTop: 10,
                backgroundColor: pressed ? "#D8E8E7" : "#FFFFFF", // Example of changing background color on press
              },
            ]}
          >
            <Feather name="minus-square" size={24} color="#237169" />
          </Pressable>

          <Text style={{ fontSize: 21 }}>{item?.units}</Text>
          <Pressable
            onPress={() => increaseValueHandler(index)}
            style={({ pressed }) => [
              {
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingTop: 10,
                backgroundColor: pressed ? "#D8E8E7" : "#FFFFFF", // Example of changing background color on press
              },
            ]}
          >
            <Feather name="plus-square" size={24} color="#237169" />
          </Pressable>
        </Pressable>
      </View>
    </>
  );
};

export default CartCard;

const styles = StyleSheet.create({});
