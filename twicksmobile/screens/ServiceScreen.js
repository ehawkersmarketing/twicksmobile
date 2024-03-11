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
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ServiceCard from "../component/ServiceCard";
import { useFetch } from "../hooks/api_hook";
import axios from "axios";

const ServiceScreen = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [searchField, setSearchField] = useState("");
  const navigation = useNavigation();
  const { data: services } = useFetch("/api/getAllService");
  const [searchService, setSearchService] = useState([]);
  const [openIndex, setIndex] = useState(0);

  const search = async (text) => {
    if (text !== "") {
      try {
        const { data } = await axios.post(
          "https://backend.twicks.in/api/searchService",
          { search: text }
        );
        setSearchService(data.data);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setSearchService([]);
    }
  };

  useEffect(() => {
    if (searchField !== "") {
      search(searchField);
    }
  }, [searchField]);

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
  return (
    <>
      {isLoggedIn && (
        <SafeAreaView  style={{backgroundColor:"#FAFAFABC",height:"100%"}}>
          <ScrollView>
            <View>
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
              <View style={{padding:15,gap:10,backgroundColor:"#FAFAFABC"}}>
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
                    searchService.length > 0 ? (
                      <>
                        {searchService.map((item, index) => (
                          <ServiceCard item={item} key={index} />
                        ))}
                      </>
                    ) : (
                      <Text>No Results Found</Text>
                    )
                  ) : (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {services?.map((item, index) => {
                        return <ServiceCard key={item._id} item={item} />;
                      })}
                    </View>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default ServiceScreen;

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
    justifyContent: "space-between",shadowOffset:{
      width: 2,
      height: 2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
