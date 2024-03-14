import {
  SafeAreaView,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useFetch } from "../hooks/api_hook";
import ShopCategory from "../component/ShopCategory";
import ProductCard from "../component/ProductCard";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const ShopScreen = () => {
  const route = useRoute();
  const selectedHomeCategory = route.params?.selectedHomeCategory;
  // console.log("ksdjnvjsdn",selectedHomeCategory)
  const navigate = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [previousCategory, setPreviousCategory] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState({
    filter: "",
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [searchField, setSearchField] = useState("");
  const { data: products, setData: setProducts } = useFetch("/api/allProducts");
  const [searchProducts, setSearchProducts] = useState([]);
  const [isTouchableVisible, setIsTouchableVisible] = useState(false);

  const search = async (text) => {
    if (text !== "") {
      try {
        const { data } = await axios.post(
          "https://backend.twicks.in/api/searchProduct",
          { search: text }
        );
        setSearchProducts(data.data);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setSearchProducts([]);
    }
  };

  useEffect(() => {
    if (searchField !== "") {
      search(searchField);
    }
  }, [searchField]);
  const { data: categories } = useFetch("/api/allCategory");
  const handleCategoryClick = (category,selectedHomeCategory) => {
    if (selectedCategory === category ) {
      setSelectedCategory(null);
      setPreviousCategory(null);
    } else {
      if (previousCategory) {
        setSelectedCategory(category);
      } else {
        setSelectedCategory(category);
      }
      setPreviousCategory(selectedCategory);
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("auth_token");
        if (token !== null) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          navigate.navigate("Login");
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, [navigate]);
  const filterProducts = (category) => {
    return products.filter(
      (product) => product?.category?.category === category
    );
  };

  const noProductsAvailable =
    !products ||
    (selectedCategory &&
      filterProducts(selectedCategory.category).length === 0);

  return (
    <>
      {isLoggedIn && (
        <SafeAreaView>
          <ScrollView>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#FAFAFABC",
                justifyContent: "space-between",
                alignItems: "center",
                height: 60,
              }}
            >
              <Pressable
                onPress={() => navigate.navigate("Home")}
                style={styles.headerlogo}
              >
                <Image
                  style={{ width: 130, height: 48 }}
                  source={require("../assets/logo.png")}
                />
              </Pressable>
              <Pressable style={styles.headericons}>
                <Ionicons
                  name="person-outline"
                  size={24}
                  color="black"
                  onPress={() => navigate.navigate("Account")}
                />
                <AntDesign
                  name="shoppingcart"
                  size={24}
                  color="black"
                  onPress={() => navigate.navigate("Cart")}
                />
              </Pressable>
            </View>
            <View style={{ padding: 15, backgroundColor: "#FAFAFABC" }}>
              <View style={styles.searchpress}>
                <TextInput
                  placeholder="Search"
                  onChangeText={(text) => {
                    setSearchField(text);
                    if (text === "") {
                      setHasSearched(false);
                    } else {
                      setHasSearched(true);
                    }
                  }}
                  value={searchField}
                  style={{
                    marginLeft: 20,
                    width: "100%",
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                  width: "100%",
                  backgroundColor: "#FAFAFABC",
                  justifyContent: "space-around",
                }}
              >
                {hasSearched ? (
                  searchProducts.length > 0 ? (
                    <>
                      {searchProducts.map((item, index) => (
                        <ProductCard item={item} key={index} />
                      ))}
                    </>
                  ) : (
                    <View style={{ height: "100%" }}>
                      <Text>No Results Found</Text>
                    </View>
                  )
                ) : null}
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator
              style={{ backgroundColor: "#FAFAFABC", flex: 1 }}
            >
              {searchField === "" &&
                categories &&
                categories?.map((item, index) => {
                  const isSelected = selectedCategory === item;
                  return (
                    <ShopCategory
                      item={item}
                      key={index}
                      selected={isSelected}
                      onPress={() => handleCategoryClick(item)}
                    />
                  );
                })}
            </ScrollView>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                backgroundColor: "#FAFAFABC",
              }}
            >
              {searchField === "" &&
                products &&
                (noProductsAvailable ? (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "FAFAFABC",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>No products available</Text>
                  </View>
                ) : (
                  filterProducts(selectedCategory?.category).map(
                    (item, index) => {
                      return <ProductCard item={item} key={index} />;
                    }
                  )
                ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  homemain: {
    backgroundColor: "#FAFAFABC",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FAFAFABC",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
  },
  headerlogo: {
    flexDirection: "row",
    alignItems: "center",
    width: 10,
    height: 130,
    marginLeft: 20,
  },
  headericons: {
    flexDirection: "row",
    marginRight: 20,
    gap: 10,
  },
  searchmain: {
    backgroundColor: "#FAFAFABC",
    padding: 10,
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
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
