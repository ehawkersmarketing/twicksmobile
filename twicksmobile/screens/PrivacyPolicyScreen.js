import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PrivacyPolicy = () => {
  const navigate = useNavigation();
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
        <SafeAreaView>
          <ScrollView>
            <View style={{ padding: 15 }}>
              <Text
                style={{ fontSize: 40, fontWeight: "bold", color: "#000000" }}
              >
                Privacy Policy
              </Text>
              <View style={styles.line}></View>
              <Text style={styles.text}>
                Thank you for choosing TAFI. This Privacy Policy is designed to
                help you understand how we collect, use, disclose, and safeguard
                your personal information when you visit our website or use our
                services.
              </Text>
              <Text style={styles.HeadMain}>Information We Collect:</Text>
              <Text style={styles.subMain}>1. Personal Information:</Text>
              <Text style={styles.text}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    color: "#000000",
                    paddingVertical: 10,
                  }}
                >
                  a.
                </Text>
                When you register for our services, we may collect personal
                information such as your name, contact details, and address.
              </Text>
              <Text style={styles.text}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    color: "#000000",
                    paddingVertical: 10,
                  }}
                >
                  b.
                </Text>
                Information provided when you communicate with us through email
                or other channels.
              </Text>
              <Text style={styles.subMain}>2. Usage Information:</Text>
              <Text style={styles.text}>
                We may collect data on how you interact with our website,
                including pages visited, time spent, and the actions taken.
              </Text>
              <Text style={styles.HeadMain}>How We Use Your Information:</Text>
              <Text style={styles.subMain}>1. Service Provision:</Text>
              <Text style={styles.text}>
                To provide you with the requested services and information.
              </Text>
              <Text style={styles.subMain}>2. Communication:</Text>
              <Text style={styles.text}>
                To respond to your inquiries and communicate with you about our
                products and services.
              </Text>
              <Text style={styles.subMain}>3. Analytics:</Text>
              <Text style={styles.text}>
                To analyze website usage and improve our content and services.
              </Text>
              <Text style={styles.subMain}>4. Marketing:</Text>
              <Text style={styles.text}>
                With your consent, we may send you promotional materials about
                our products and services.
              </Text>
              <Text style={styles.HeadMain}>Information Sharing:</Text>
              <Text style={styles.text}>
                We do not sell, trade, or otherwise transfer your personal
                information to third parties without your consent, except for
                the purposes of delivering the requested services.
              </Text>
              <Text style={styles.HeadMain}>Security:</Text>

              <Text style={styles.text}>
                We employ industry-standard security measures to protect your
                personal information. However, no method of transmission over
                the internet or electronic storage is 100% secure, and we cannot
                guarantee absolute security.
              </Text>
              <Text style={styles.HeadMain}>
                Updates to this Privacy Policy:
              </Text>
              <Text style={styles.text}>
                We may update this Privacy Policy to reflect changes in our
                practices or for legal reasons. The latest version will be
                posted on our website.
              </Text>
              <Text style={styles.HeadMain}>Contact Us:</Text>
              <Text style={styles.text}>
                If you have any questions or concerns about this Privacy Policy,
                please contact us at support@twicks.in.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  HeadMain: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#000000",
    paddingVertical: 10,
  },
  subMain: {
    fontSize: 29,
    fontWeight: "bold",
    color: "#000000",
    paddingVertical: 10,
  },
  text: {
    fontSize: 20,
    color: "#000000",
    paddingVertical: 10,
    textAlign: "justify",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
});
