import { StyleSheet, Pressable, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const LegalScreen = () => {
  const navigate = useNavigation();

  return (
    <View style={{ padding: 10 }}>
      <Pressable
        onPress={() => navigate.navigate("ReturnAndRefund")}
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
          <Ionicons name="return-up-back" size={24} color="black" />
          <Text style={styles.names}>Return And Refund</Text>
        </View>
        <MaterialIcons name="navigate-next" size={24} color="black" />
      </Pressable>
      <View style={styles.line}></View>
      <Pressable
        onPress={() => navigate.navigate("PrivacyPolicy")}
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
          <AntDesign name="lock" size={24} color="black" />
          <Text style={styles.names}>Privacy Policy</Text>
        </View>
        <MaterialIcons name="navigate-next" size={24} color="black" />
      </Pressable>
      <View style={styles.line}></View>
      <Pressable
        onPress={() => navigate.navigate("TermAndCondition")}
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
          <AntDesign name="filetext1" size={24} color="black" />
          <Text style={styles.names}>Terms & Conditions</Text>
        </View>
        <MaterialIcons name="navigate-next" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default LegalScreen;

const styles = StyleSheet.create({
  names: {
    fontSize: 20,
    color: "black",
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
    marginVertical: 10,
  },
});
