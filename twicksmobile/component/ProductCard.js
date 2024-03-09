import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import React,{useState,useEffect} from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ProductCard = ({ item }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
// console.log(item)
  const navigation = useNavigation();

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
              productRating:item?.rating,
            })
          }
          style={{
            marginVertical: 15,
            backgroundColor: "white",
            borderRadius: 20,
            height: 220,
            width: "46%",
            overflow: "hidden",
            marginHorizontal: "2%",
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
              height: 130,
              marginTop: -40,
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
                <Text
                  style={{ color: "#1E786F", fontSize: 17, marginVertical: 3 }}
                >
                  {item?.title}
                </Text>
                <Text style={{ fontSize: 15 }}>Rs. {item?.price}/-</Text>
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
  productImage: {},
});
