import { StyleSheet, Pressable, Image, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigate = useNavigation();
  const onLogOut = async () => {
    try {
      await AsyncStorage.clear();
      navigate.navigate("Service");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        // console.log("Token:", token); // Debugging line
        if (token !== null) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, []);
  return (
    <>
      <View>
        {/* s */}
        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <FontAwesome name="user-circle-o" size={24} color="black" />
            <Text style={{ fontSize: 24 }}>Hello, Rishika Kothari</Text>
          </View>
          <View style={{ paddingVertical: 10, flexDirection: "row", gap: 10 }}>
            <Text style={{ fontSize: 17 }}>9993720620</Text>
            <Text style={{ fontSize: 17 }}>rishikak10@gmail.com</Text>
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <Pressable
            onPress={() => navigate.navigate("Edit")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginVertical: 5,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Feather name="edit" size={24} color="black" />
              <Text style={styles.names}>Edit</Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="black" />
          </Pressable>
          <View style={styles.line}></View>
          <Pressable
            onPress={() => navigate.navigate("Order")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginVertical: 5,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Entypo name="shopping-basket" size={24} color="black" />
              <Text style={styles.names}>Orders</Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="black" />
          </Pressable>
          <View style={styles.line}></View>
          <Pressable
            onPress={() => navigate.navigate("Legal")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginVertical: 5,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <FontAwesome name="legal" size={24} color="black" />
              <Text style={styles.names}>Legal</Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="black" />
          </Pressable>
          <View style={styles.line}></View>
          {isLoggedIn && (
            <Pressable
              onPress={onLogOut}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginVertical: 5,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <MaterialIcons name="logout" size={24} color="black" />
                <Text style={styles.names}>Logout</Text>
              </View>

              <MaterialIcons name="navigate-next" size={24} color="black" />
            </Pressable>
          )}
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;

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
  names: {
    fontSize: 22,
    color: "black",
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
    marginVertical: 10,
  },
});
