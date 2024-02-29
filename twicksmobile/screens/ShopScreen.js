import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ShopCategory from "../component/ShopCategory";
import ProductCard from "../component/ProductCard";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const ShopScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 23 }}>Categories</Text>
          <Feather name="search" size={24} color="black" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator>
          <ShopCategory />
          <ShopCategory />
        </ScrollView>
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
  );
};

export default ShopScreen;

const styles = StyleSheet.create({});
