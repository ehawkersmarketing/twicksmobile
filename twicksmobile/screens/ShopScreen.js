import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, {useState, useEffect} from "react";
import { useFetch } from "../hooks/api_hook";
import ShopCategory from "../component/ShopCategory";
import ProductCard from "../component/ProductCard";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


const ShopScreen = () => {

  
  //  To read data
  //  const user = async () => {
  //   try {
  //      const value = await AsyncStorage.getItem('user')
  //      if(value !== null) {
  //      }
  //   } catch(e) {
  //   }
  //  }
  
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
          `https:/backend.twicks.in/api/searchProduct`,
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
        if (activeFilter.filter === "" ) {
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
          <Text style={{ fontSize: 23 ,padding:10}}>Categories</Text>
          <Feather name="search" size={24} color="black" style={{padding:10}}/>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator>
        {activeFilter.filter === "" &&
              searchField === "" &&
              categories &&
              categories?.map((item, index) => {
                return <ShopCategory item={item} key={index} />;
              })}
        </ScrollView>
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
                return (
                  <ProductCard
                    item={item}
                    key={index}
                  />
                );
              })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({});
