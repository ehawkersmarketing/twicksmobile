import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Button,
} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { useFetch } from "../hooks/api_hook";
import ProductCard from "../component/ProductCard";
import HomeCarousel from "../component/HomeCarousel";
import CategoryComponent from "../component/CategoryComponent";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const HomeScreen = ({ navigation }) => {

  
  useEffect(() => {
     const unsubscribe = navigation.addListener('beforeRemove', (e) => {
       // Prevent default behavior of leaving the screen
       e.preventDefault();
       // Optionally, navigate to the home screen
      //  navigateToLoginIfNotLoggedIn();
     });
 
     return unsubscribe;
  }, [navigation, navigateToLoginIfNotLoggedIn]);
 





  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState({
    filter: "",
  });
  const [hasSearched, setHasSearched] = useState(false);

  const [openForSort, setOpenForSort] = useState(false);
  const { data: products, setData: setProducts } = useFetch("/api/allProducts");
  const [searchField, setSearchField] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);

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
  const navigateToLoginIfNotLoggedIn = () =>{
   if(isLoggedIn){
    console.log("true")
   }else {
    console.log("false")
   }
  } 
 

  return (
    <>
      {isLoggedIn && (
        <SafeAreaView style={styles.homemain}>
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
                onPress={() => navigation.navigate("Home")}
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
                  onPress={() => navigation.navigate("Account")}
                />
                <AntDesign
                  name="shoppingcart"
                  size={24}
                  color="black"
                  onPress={() => navigation.navigate("Cart")}
                />
              </Pressable>
            </View>
            <View style={{ padding: 15 }}>
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
                    <Text>No Results Found</Text>
                  )
                ) : null}
              </View>
            </View>
            <View>
              <View style={styles.header}>
                <Text style={{ fontSize: 20, paddingLeft: 15 }}>
                  Categories
                </Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories &&
                  categories?.map((item, index) => {
                    return <CategoryComponent item={item} key={index} />;
                  })}
              </ScrollView>
            </View>
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HomeCarousel />
              </ScrollView>
            </View>
            <View>
              <View style={styles.header}>
                <Text style={{ fontSize: 20}}>
                  Featured Products
                </Text>
                <Pressable
                  color="#1E786F"
                  onPress={() => navigation.navigate("Shop")}
                >
                  <Text style={{fontSize:19 }}>View All</Text>
                </Pressable>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              {products &&
                products?.map((item, index) => {
                  return <ProductCard item={item} key={index} />;
                })}
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default HomeScreen;

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
    paddingHorizontal:15
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
    width: "100%",
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
