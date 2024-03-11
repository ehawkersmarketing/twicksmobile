import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Pressable,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductCard = ({ item , index }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // /.log(index)
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("auth_token");
        if (token !== null) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, [navigation]);
  const navigation = useNavigation();
  const fontSize = Platform.select({
    ios: 24, 
    android: 17, 
  });

  return (
    <>
      {isLoggedIn && (
        <Pressable
          key={item?._id}
          onPress={() =>
            navigation.navigate("Product", {
              productId: item?._id,
              productName: item?.title,
              productImage: item?.image,
              productDetais: item?.description,
              productPrice: item?.price,
              productCategory: item?.category.category,
              productReview: item?.reviews,
              productRating: item?.rating,
              productQuantity:item?.quantity,
              index:index
            })
          }
          style={{
            marginVertical: 15,
            backgroundColor: "white",
            borderRadius: 20,
            height: "auto",
            width: "46%",
            overflow: "hidden",
            marginHorizontal: "2%",
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "80%" }}>
              <Text numberOfLines={1} style={{ fontSize: 15 }}>
                {item?.category.category}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <FontAwesome name="star" size={15} color="#FFBB56" />
              <Text>{item?.rating} </Text>
            </View>
          </View>
          <Image
            style={{
              width: "100%",
              height: 140,
              resizeMode: "contain",
              marginTop: -10,
            }}
            source={{ uri: item?.image }}
          />
          <ImageBackground
            style={{
              width: "100%",
              marginTop: -40,
              paddingBottom: 10,
              resizeMode: "contain",
            }}
            source={require("../assets/homepage-below-main.png")}
          >
            <View
              style={{
                marginTop: 30,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ marginLeft: 10 }}>
                <Text style={[styles.title, { fontSize }]}>{item?.title}</Text>
                <Text style={styles.price}>
                  ₹ {item?.price}/-
                </Text>
              </View>
            </View>
          </ImageBackground>
        </Pressable>
      )}
    </>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  title: {
    color: "#1E786F",
    marginVertical: 3,
  },
  price:{
    fontSize:14
  }
});
