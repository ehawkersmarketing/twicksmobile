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


const ProductCard = ({item}) => {
  const navigation = useNavigation();

  return (
    <Pressable
    onPress={() => navigation.navigate('SingleShop', {productId: '{item?._Id}'} )}
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
        <Text style={{fontSize:15}}>{item?.category.category}</Text>
        <View style={{flexDirection: 'row', alignItems:"center"}}>
          <FontAwesome name="star" size={24} color="yellow" />
          <Text>{item?.reviews}</Text>
        </View>
      </View>
      <Image
        style={{ width: 150, height: 130, resizeMode: "contain" ,marginTop:-20}}
        source={{uri: item?.image}}
      />
      <ImageBackground
        style={{ width: 175, height: 90, marginTop: -30 ,resizeMode:"contain"}}
        source={require("../assets/homepage-below-main.png")}
      >
        <View style={{ marginTop: 30, display: "flex", flexDirection: "row" ,justifyContent:"space-between"}}>
          <View style={{marginLeft:10}}>
            <Text style={{color:"#1E786F"}}>{item?.title}</Text>
            <Text>Rs. {item?.price}</Text>
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
