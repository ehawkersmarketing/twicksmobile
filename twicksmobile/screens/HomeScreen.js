import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Button,
} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ProductCard from "../component/ProductCard";
import HomeImage from "../component/HomeImage";
import CategoryComponent from "../component/CategoryComponent";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// import { SliderBox } from "react-native-image-slider-box";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView style={styles.homemain}>
        <ScrollView>
          <View style={styles.header}>
            <Pressable
              onPress={() => navigation.navigate("Home")}
              style={styles.headerlogo}
            >
              <Image
                style={{ width: 130, height: 48 }}
                source={require("../assets/logo.png")}
              />
            </Pressable>
            <Pressable style={styles.headericons}>
              <Ionicons name="person-outline" size={24} color="black" onPress={() => navigation.navigate("Profile")}/>
              <AntDesign name="shoppingcart" size={24} color="black" onPress={() => navigation.navigate("Cart")}/>
            </Pressable>
          </View>
          <View style={styles.searchmain}>
            <Pressable style={styles.searchpress}>
              <TextInput
                placeholder="Search"
                style={{
                  marginLeft: 20,
                }}
              />
              <AntDesign
                style={{ paddingLeft: 10, marginRight: 20 }}
                name="search1"
                size={22}
                color="black"
              />
            </Pressable>
          </View>
          <View>
            <View style={styles.header}>
              <Text style={{ fontSize: 20, paddingLeft: 15 }}>Categories</Text>
              <Button
                title="See All"
                color="#1E786F"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* {list.map((item, index) => ( */}
              <CategoryComponent />
              <CategoryComponent />
              <CategoryComponent />
              <CategoryComponent />
              <CategoryComponent />
              <CategoryComponent />
              <CategoryComponent />
              <CategoryComponent />
              <CategoryComponent />
              <CategoryComponent />
              <CategoryComponent />
              <CategoryComponent />
              {/* ))} */}
            </ScrollView>
          </View>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <HomeImage />
              {/* <HomeImage />
              <HomeImage /> */}
            </ScrollView>
          </View>
          <View>
            <View style={styles.header}>
              <Text style={{ fontSize: 20, paddingLeft: 15 }}>
                Featured Products
              </Text>
              <Button
                title="See All"
                color="#1E786F"
                onPress={() => navigation.navigate("Shop")}
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homemain: {
    backgroundColor: "#FAFAFA",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    height: 60,
  },
  headerlogo: {
    flexDirection: "row",
    alignItems: "center",
    width: 10,
    height: 130,
    marginLeft: 20,
    // flex:1
  },
  headericons: {
    flexDirection: "row",
    marginRight: 20,
    gap: 10,
    // flex:3
  },
  searchmain: {
    backgroundColor: "#FAFAFA",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchpress: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: "white",
    borderRadius: 50,
    height: 38,
    flex: 1,
    justifyContent: "space-between",
  },
});
