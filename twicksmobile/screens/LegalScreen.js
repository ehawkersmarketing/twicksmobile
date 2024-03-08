import { StyleSheet, Pressable, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const LegalScreen = () => {
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
        <View
          style={{ padding: 10, backgroundColor: "#237169", height: "100%" }}
        >
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
              <Ionicons name="return-up-back" size={24} color="white" />
              <Text style={styles.names}>Return And Refund</Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="white" />
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
              <AntDesign name="lock" size={24} color="white" />
              <Text style={styles.names}>Privacy Policy</Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="white" />
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
              <AntDesign name="filetext1" size={24} color="white" />
              <Text style={styles.names}>Terms & Conditions</Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="white" />
          </Pressable>
        </View>
      )}
    </>
  );
};

export default LegalScreen;

const styles = StyleSheet.create({
  names: {
    fontSize: 20,
    color: "white",
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "white",
    marginVertical: 10,
  },
});
