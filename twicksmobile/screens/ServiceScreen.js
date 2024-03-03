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
import ServiceCard from "../component/ServiceCard";
import { useFetch } from "../hooks/api_hook";

const ServiceScreen = () => {
  const navigation = useNavigation();
  const [searchField, setSearchField] = useState("");
  const { data: services } = useFetch("/api/getAllService");
  const [searchService, setSearchService] = useState(undefined);
  const [openIndex, setIndex] = useState(0);
  // console.log(JSON.stringify(services));
  const search = async (text) => {
    if (text !== "") {
      const { data } = await axios.post(
        `https://backend.twicks.in/api/searchService`,
        {
          search: text,
        }
      );
      setSearchService(data.data);
    } else {
      setIndex(0);
      setSearchService(undefined);
    }
  };

  useEffect(() => {
    search(searchField);
  }, [searchField]);

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#FAFAFA",
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {services?.map((item, index) => {
                console.log(item);
                return <ServiceCard key={item._id} item={item} />;
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ServiceScreen;

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
    // gap: 10,
    height: 40,
    // backgroundColor: "yellow",
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
