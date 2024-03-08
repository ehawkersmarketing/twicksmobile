import {
  SafeAreaView,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React,{useState,useEffect} from "react";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckoutScreen = () => {
  const navigation = useNavigation();

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
  const paymentGateway = () => {};

  return (
    <>
      {isLoggedIn && (
        <SafeAreaView>
          <ScrollView>
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 17, padding: 5 }}>Name</Text>
              <TextInput
                placeholder="Name"
                style={{
                  padding: 10,
                  fontSize: 20,
                  backgroundColor: "#CAE4DE",
                  borderRadius: 10,
                }}
              />
              <Text style={{ fontSize: 17, padding: 5 }}>Number</Text>
              <TextInput
                placeholder="Number"
                style={{
                  padding: 10,
                  fontSize: 20,
                  backgroundColor: "#CAE4DE",
                  borderRadius: 10,
                }}
              />
              <Text style={{ fontSize: 17, padding: 5 }}>Email Address</Text>
              <TextInput
                placeholder="Email Address"
                style={{
                  padding: 10,
                  fontSize: 20,
                  backgroundColor: "#CAE4DE",
                  borderRadius: 10,
                }}
              />
              <Text style={{ fontSize: 17, padding: 5 }}>Address Line 1</Text>
              <TextInput
                placeholder="Address Line 1"
                style={{
                  padding: 10,
                  fontSize: 20,
                  backgroundColor: "#CAE4DE",
                  borderRadius: 10,
                }}
              />
              <Text style={{ fontSize: 17, padding: 5 }}>Address Line 2</Text>
              <TextInput
                placeholder="Address Line 2"
                style={{
                  padding: 10,
                  fontSize: 20,
                  backgroundColor: "#CAE4DE",
                  borderRadius: 10,
                }}
              />
              <Text style={{ fontSize: 17, padding: 5 }}>Town / City</Text>
              <TextInput
                placeholder="Town / City"
                style={{
                  padding: 10,
                  fontSize: 20,
                  backgroundColor: "#CAE4DE",
                  borderRadius: 10,
                }}
              />
              <Text style={{ fontSize: 17, padding: 5 }}>State</Text>
              <TextInput
                placeholder="State"
                style={{
                  padding: 10,
                  fontSize: 20,
                  backgroundColor: "#CAE4DE",
                  borderRadius: 10,
                }}
              />
              <Text style={{ fontSize: 17, padding: 5 }}>Pincode</Text>
              <TextInput
                placeholder="Pincode"
                style={{
                  padding: 10,
                  fontSize: 20,
                  backgroundColor: "#CAE4DE",
                  borderRadius: 10,
                }}
              />
              <Text style={{ fontSize: 17, padding: 5 }}>Country / Region</Text>
              <TextInput
                placeholder="Country / Region"
                style={{
                  padding: 10,
                  fontSize: 20,
                  backgroundColor: "#CAE4DE",
                  borderRadius: 10,
                }}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({});
