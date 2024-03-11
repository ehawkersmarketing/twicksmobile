import {
  StyleSheet,
  Pressable,
  Text,
  View,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigate = useNavigation();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        const user = JSON.parse(userString);
        setUserData(user);
        console.log(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const onLogOut = async () => {
    try {
      Alert.alert(
        "Logout",
        "Please login again",
        [{ text: "OK", onPress: () => navigate.navigate("Register") }],
        { cancelable: false }
      );

      await AsyncStorage.clear();
      // navigate.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
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

  return (
    <>
      {isLoggedIn && (
        <SafeAreaView
          key={userData?._id}
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#237169",
          }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={{ backgroundColor: "#237169", height: "100%" }}>
              <View style={{ padding: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome name="user-circle-o" size={24} color="white" />
                    <Text style={{ fontSize: 24, color: "white" }}>
                      {userData.userName}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => navigate.navigate("Edit")}
                    style={{ padding: 10 }}
                  >
                    <Entypo name="edit" size={24} color="white" />
                  </Pressable>
                </View>

                <View
                  style={{
                    paddingVertical: 10,
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <Feather name="phone" size={17} color="white" />
                    <Text style={{ fontSize: 17, color: "white" }}>
                      {userData.phone}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <Entypo name="email" size={17} color="white" />
                    <Text style={{ fontSize: 17, color: "white" }}>
                      {userData.email}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              padding: 10,
              backgroundColor: "#237169",
            }}
          >
            <View style={styles.line}></View>
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
                <MaterialIcons name="logout" size={24} color="white" />
                <Text style={styles.names}>Logout</Text>
              </View>

              <MaterialIcons name="navigate-next" size={24} color="white" />
            </Pressable>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 100,
  },
  homemain: {
    backgroundColor: "#FAFAFA",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
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
    color: "white",
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "white",
    marginVertical: 10,
  },
});
