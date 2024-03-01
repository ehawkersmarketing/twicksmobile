import {
  SafeAreaView,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from "react-native";
import React from "react";
import CheckBox from "@react-native-community/checkbox";
import { LinearGradient } from 'expo-linear-gradient';


const LoginScreen = () => {
  return (
    <>
      <SafeAreaView style={styles.homemain}>
        <ScrollView>
          <View style={{flex:1,backgroundColor: "#20746C"}}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#FAFAFA",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 15,
                // gap: 10,
                height: 60,
                // backgroundColor: "yellow",
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
            </View>
            <View style={{flex:2,backgroundColor:"#20756C"}}>
              <Image
                style={{ width: "60%", height: 320 }}
                source={require("../assets/login.png")}
              />
              
            </View>
            <View style={{  paddingHorizontal: 15,flex:2 }}>
              <View>
                <View style={{ alignItems: "center", marginVertical: 20 }}>
                  <Text style={{ fontSize: 30 }}>Login Account</Text>
                </View>
                <View>
                  <View style={styles.container}>
                    <TextInput
                      style={styles.input}
                      placeholder="Mobile No"
                      placeholderTextColor="#888"
                    ></TextInput>
                  </View>
                  <View style={styles.container}>
                    <TextInput
                      style={styles.input}
                      placeholder="OTP"
                      placeholderTextColor="#888"
                    ></TextInput>
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>Keep me signed in</Text>
                      <Pressable>
                        <Text>Forgot Password?</Text>
                      </Pressable>
                    </View>
                  </View>
                  <View style={{ paddingVertical: 30 }}>
                    <Pressable
                      style={{
                        backgroundColor: "pink",
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ padding: 10, fontSize: 27 }}>Login</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  homemain: {
    backgroundColor: "#FAFAFA",
    padding: 10,
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
    // marginLeft: 20,
    // flex:1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#EBF6F5",
    borderLeftColor: "#44A98B",
    borderLeftWidth: 8,
  },
});
