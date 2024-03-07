import { StyleSheet, Alert, Image, Pressable, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useFetch } from "../hooks/api_hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const CartCard = ({ item, index }) => {
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
      if (
        cart.products[index].units ==
        cart.products[index].productId.units.maxQuantity
      ) {
        Alert.alert("You have reached product max limit");
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
          navigation.navigate("Cart");
          // window.location.reload();
        } else {
          console.log(data.message);
        }
      }
    } catch (error) {
      console.log("catch", error.message);
    }
  };

  const decreaseValueHandler = async (index) => {
    try {
      const { data } = await axios.delete(
        `https://backend.twicks.in/api/dropFromCart/${user._id}/${cart.products[index].productId._id}`
      );
      if (data.success) {
        console.log("success");
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
      console.log("catch" + error.message);
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
        key={item?._id}
        style={{
          width: "100%",
          paddingVertical: 10,
          flex: 1,
          flexDirection: "row",
        }}
      >
        <Pressable
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
            borderRadius: 10,
            backgroundColor: "#FFFFFF",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "30%" }}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
              source={{ uri: item?.productId?.image }}
            />
          </View>
          <View style={{ width: "65%" }}>
            <Text style={{ fontWeight: "500", fontSize: 24 }}>
              {item?.productId.title}
            </Text>

            <Text style={{ fontWeight: "500", fontSize: 19,color:"#4F6E80" }}>
              Rs. {item?.productId.price}/-
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingTop: 10,
              }}
            >
              <Pressable
                onPress={() => decreaseValueHandler(index)}
                style={({ pressed }) => [
                  {
                    alignItems: "center",
                    gap: 10,
                    backgroundColor: pressed ? "#D8E8E7" : "#FFFFFF",
                  },
                ]}
              >
                <AntDesign name="minuscircleo" size={24} color="black" />
              </Pressable>

              <Text style={{ fontSize: 21 }}>{item?.units}</Text>
              <Pressable
                onPress={() => increaseValueHandler(index)}
                style={({ pressed }) => [
                  {
                    flexDirection: "row",
                    gap: 10,
                    backgroundColor: pressed ? "#D8E8E7" : "#FFFFFF", 
                  },
                ]}
              >
                <AntDesign name="pluscircleo" size={24} color="black" />
              </Pressable>
            </View>
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default CartCard;

const styles = StyleSheet.create({});
