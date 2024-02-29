import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const ProductCard = () => {
  const navigation = useNavigation();

  return (
    <Pressable
    onPress={() => navigation.navigate("SingleShop")}
    style={{
        marginHorizontal: 10,
        marginVertical: 15,
        backgroundColor: "white",
        borderRadius: 20,
        height: 200,
        width:175,
        overflow:"hidden"
      }}
    >
      <View style={{flexDirection: 'row', padding: 10,alignContent:"center", justifyContent:"space-between"}}>
        <Text style={{fontSize:15}}>Fertilizer</Text>
        <View style={{flexDirection: 'row', alignItems:"center"}}>
          <FontAwesome name="star" size={24} color="yellow" />
          <Text>4.5</Text>
        </View>
      </View>
      <Image
        style={{ width: 150, height: 130, resizeMode: "contain" ,marginTop:-20}}
        source={require("../assets/product.png")}
      />
      <ImageBackground
        style={{ width: 175, height: 90, marginTop: -30 ,resizeMode:"contain"}}
        source={require("../assets/homepage-below-main.png")}
      >
        <View style={{ marginTop: 30, display: "flex", flexDirection: "row" ,justifyContent:"space-between"}}>
          <View style={{marginLeft:10}}>
            <Text style={{color:"#1E786F"}}>Water-Fertilizer</Text>
            <Text>Rs.1052/-</Text>
          </View>
          <Pressable style={{ backgroundColor: "pink", borderRadius: 90,marginRight:10,height:30,width:30 }}>
            <AntDesign name="arrowright" size={24} color="black" />
          </Pressable>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productImage: {},
});
