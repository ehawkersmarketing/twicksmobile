import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  View,
  Pressable,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const SingleServiceScreen = () => {
  const route = useRoute();

  const { serviceId, serviceName, serviceImage, serviceDetais } = route.params;

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <Image
              style={{
                resizeMode: "contain",
                flex: 1,
                width: "100%",
                height: 255,
              }}
              source={{ uri: serviceImage }}
            />
            <View style={{ padding: 10, flex: 1 }}>
              <Text style={{ fontSize: 35, paddingBottom: 10 }}>
                {serviceName}
              </Text>
              <Text style={{ fontSize: 20, textAlign: "justify" }}>
                {serviceDetais}
              </Text>
            </View>
            <View style={{ justifyContent: "flex-end", flex: 1 }}>
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  backgroundColor: "pink",
                  width: "50%",
                  borderRadius: 10,
                  justifyContent: "space-around",
                  padding: 10,
                  marginLeft: 10,
                }}
              >
                <Text style={{ fontSize: 20 }}>Show Interest</Text>
                <FontAwesome name="whatsapp" size={20} color="black" />
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SingleServiceScreen;

const styles = StyleSheet.create({});
