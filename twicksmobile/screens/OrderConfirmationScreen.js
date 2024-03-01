import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Button,
} from "react-native";
import React from "react";

const OrderConfirmationScreen = () => {
  return (
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
        </View>
        <View>
          <Text style={{ fontSize: 35, marginBottom: "5%", marginTop: "8%" }}>
            Thank you, your order has been placed!
          </Text>
          <Text style={{ color: "#64B79E", fontSize: 17 }}>
            The order confirmation is sent to your email address{" "}
          </Text>
          <View
            style={{
              borderRadius: 4,
              flexDirection: "row",
              marginVertical: "10%",
              alignItems: "flex-start",
              width: "100%",
              justifyContent: "space-between",
              flex: 1,
              gap:10
            }}
          >
            <Pressable
              style={{
                backgroundColor: "white",
                borderRadius: 6,
                marginLeft: "auto",
                marginRight: "auto",
                padding: 10,
                flex:1
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#38944D",
                  fontSize: 23,
                  fontWeight: 600,
                }}
              >
                Download Invoice
              </Text>
            </Pressable>
            <Pressable
              style={{
                flex:1,
                backgroundColor: "white",
                borderRadius: 6,
                marginLeft: "auto",
                marginRight: "auto",
                padding: 10,
                height:"100%",
                justifyContent:"center"
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#38944D",
                  fontSize: 23,
                  fontWeight: 600,
                }}
              >
                Cancel
              </Text>
            </Pressable>
            {/* <Button
              title="Cancle"
              titleStyle={{ fontSize: 40 }}
            ></Button> */}
          </View>
        </View>
        <View style={{}}>
          <View style={{ backgroundColor: "#437E78", borderRadius: 13 }}>
            <View style={{ padding: 10 }}>
              <Text style={{ color: "white", fontSize: 25 }}>
                Order Details:
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                  paddingVertical: 10,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ color: "white", fontSize: 17, color: "#BAD8D5" }}
                  >
                    Order ID:
                  </Text>
                  <Text
                    style={{ color: "white", fontSize: 17, color: "#BAD8D5" }}
                  >
                    Order Total:
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ color: "white", fontSize: 17, color: "#BAD8D5" }}
                  >
                    Date:
                  </Text>
                  <Text
                    style={{ color: "white", fontSize: 17, color: "#BAD8D5" }}
                  >
                    Time:
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#3F8B64",
                padding: 10,
                borderRadius: 13,
              }}
            >
              <Text style={{ color: "white", fontSize: 25 }}>
                Shipping Details:
              </Text>
              <View style={{ paddingVertical: 10 }}>
                <Text
                  style={{ color: "white", fontSize: 17, color: "#BAD8D5" }}
                >
                  Name:
                </Text>
                <Text
                  style={{ color: "white", fontSize: 17, color: "#BAD8D5" }}
                >
                  Address:
                </Text>
                <Text
                  style={{ color: "white", fontSize: 17, color: "#BAD8D5" }}
                >
                  Contact No.:
                </Text>
              </View>
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ color: "white", fontSize: 25 }}>
                Billing Address:
              </Text>
              <View style={{ paddingVertical: 10 }}>
                <Text
                  style={{ color: "white", fontSize: 17, color: "#BAD8D5" }}
                >
                  Sadar Road Balod
                </Text>
                <Text
                  style={{ color: "white", fontSize: 17, color: "#BAD8D5" }}
                >
                  Pin: <Text>49226</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderConfirmationScreen;

const styles = StyleSheet.create({
  homemain: {
    // backgroundColor: "pink",
    paddingHorizontal: 20,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
  },
  headerlogo: {
    flexDirection: "row",
    alignItems: "center",
    width: 10,
    height: 130,
    // marginLeft: 20,
    // flex:1
  },
});
