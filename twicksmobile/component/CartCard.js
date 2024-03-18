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
  let [quantity, setQuantity] = useState(1);

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

  useEffect(()=>{
    setQuantity(cart?.products[index]?.units) 

  },[cart])
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
 
   
 const categories = cart?.products.map(
    (product) => product?.productId?.category
  );

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
            userId: user?._id,
            productId: cart.products[index].productId?._id,
            units: 1,
          }
        );
        if (data.success) {
          navigation.navigate("Cart");
          setQuantity((prevQuantity) => prevQuantity + 1); // Correct
          // window.location.reload();
        } else {
          console.log(data.message);
        }
      }
    } catch (error) {
      console.log("Error in increasing the product Quantity" , error.message);
    }
  };

  const decreaseValueHandler = async (index) => {
    try {
      const { data } = await axios.delete(
        `https://backend.twicks.in/api/dropFromCart/${user._id}/${cart?.products[index]?.productId._id}`
      );
      if (data.success) {
        // window.location.reload();
        setQuantity((prevQuantity) => prevQuantity - 1); // Correct

      } else {
        Alert.alert(data.message);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <>
{  quantity >0 &&   <View
      key={item?._id}
      style={{
        width: "100%",
        paddingVertical: 8,
        flex: 1,
        flexDirection: "row",
      }}
    >
      <Pressable
        onPress={() =>
          navigation.navigate("Product", {
            productId: item?._id,
            productName: item?.productId?.title,
            productImage: item?.productId?.image,
            productDetais: item?.productId?.description,
            productPrice: item?.productId?.price,
            productReview: item?.productId?.reviews,
            productRating: item?.productId?.rating,
            productQuantity: item?.productId?.quantity,
            productUnits: item?.units, 
            index: index,
          })
        }
        style={{
          borderColor: "#EBF6F5",
          width: "100%",
          padding: 20,
          borderRadius: 15,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-between",
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 1,
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
          <Text style={{ fontWeight: "500", fontSize: 20 }}>
            {item?.productId?.title}
          </Text>

          <Text style={{ fontWeight: "500", fontSize: 19, color: "#4F6E80" }}>
            ₹ {item?.productId?.price}/-
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
              paddingTop: 10,
            }}
          >
            <Pressable
              onPress={() => decreaseValueHandler(index)}
              style={({ pressed }) => [
                {
                  alignItems: "center",
                  backgroundColor: pressed ? "#D8E8E7" : "#FFFFFF",
                },
              ]}
            >
              <AntDesign name="minuscircleo" size={18} color="black" />
            </Pressable>

            <Text style={{ fontSize: 20 }}>{quantity}</Text>
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
              <AntDesign name="pluscircleo" size={18} color="black" />
            </Pressable>
          </View>
        </View>
      </Pressable>
    </View>}
    </>
  );
};

export default CartCard;

const styles = StyleSheet.create({});
