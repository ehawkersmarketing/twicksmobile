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
import { useFetch } from "../hooks/api_hook";
import ProductCard from "../component/ProductCard";
import HomeImage from "../component/HomeImage";
import CategoryComponent from "../component/CategoryComponent";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const HomeScreen = () => {
  const navigate = useNavigation();
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState({
    filter: "",
  });
  const [openForSort, setOpenForSort] = useState(false);
  // const user = JSON.parse(AsyncStorage.getItem("user"));
  // const { data: cart } = useFetch(`/api/getCartByUser/${user?._id}`);
  const [searchField, setSearchField] = useState("");
  // const filter = ["Price: High To Low", "Price: Low To High"];
  const { data: products, setData: setProducts } = useFetch("/api/allProducts");
  const [searchProducts, setSearchProducts] = useState([]);

  const search = async (text) => {
    if (text !== "") {
      try {
        const { data } = await axios.post(
          `http://localhost:8080/api/searchProduct`,
          {
            search: text,
          }
        );
        setSearchProducts(data.data);
      } catch (error) {
        toast.error(`${error.message}`, {
          position: "bottom-right",
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } else {
      setSearchProducts(undefined);
      setActiveFilter({ ["filter"]: "" });
    }
  };

  useEffect(() => {
    search(searchField);
  }, [searchField]);

  const { data: categories } = useFetch("/api/allCategory");

  const applyFilter = (e, index) => {
    if (index == 2) {
      if (e.target.value === "select the Category") {
        setSearchField("");
        setActiveFilter({ [e.target.name]: "" });
      } else {
        setSearchField(e.target.value);
        setActiveFilter({ [e.target.name]: e.target.value });
      }
      setOpen(false);
    } else {
      if (index == 1) {
        if (activeFilter.filter === "") {
          setProducts(
            products.sort(function (a, b) {
              return a.price - b.price;
            })
          );
          setActiveFilter({ ["filter"]: `` });
          document
            .getElementById("allproduct")
            .scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          setProducts(
            searchProducts.sort(function (a, b) {
              return a.price - b.price;
            })
          );
          setActiveFilter({ ["filter"]: `` });
        }
      } else {
        if (activeFilter.filter === "") {
          setProducts(
            products.sort(function (a, b) {
              return b.price - a.price;
            })
          );

          setActiveFilter({ ["filter"]: `` });
          document
            .getElementById("allproduct")
            .scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          setProducts(
            searchProducts.sort(function (a, b) {
              return b.price - a.price;
            })
          );
          setActiveFilter({ ["filter"]: `` });
        }
      }
      setOpen(false);
    }
    setOpenForSort(false);
    setOpen(false);
  };

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
              <Ionicons
                name="person-outline"
                size={24}
                color="black"
                onPress={() => navigation.navigate("Profile")}
              />
              <AntDesign
                name="shoppingcart"
                size={24}
                color="black"
                onPress={() => navigation.navigate("Cart")}
              />
            </Pressable>
          </View>
          <View style={styles.searchmain}>
            <Pressable style={styles.searchpress}>
              <TextInput
                placeholder="Search"
                style={{
                  marginLeft: 20,
                }}
                s
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
            {activeFilter.filter === "" &&
              searchField === "" &&
              categories &&
              categories?.map((item, index) => {
                return <CategoryComponent item={item} key={index} />;
              })}
            </ScrollView>
          </View>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <HomeImage />
             
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
            {activeFilter.filter === "" &&
              searchField === "" &&
              products &&
              products?.map((item, index) => {
                return <ProductCard item={item} key={index} />;
              })}
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
