import React from "react";
import { SafeAreaView,ScrollView, View, Text, StyleSheet } from "react-native";

const Random = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.bottomButtonContainer}>
          <View style={styles.bottomButton}>
            <Text style={styles.buttonText}>Click Me</Text>
          </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",

    backgroundColor: "#F5FCFF",
  },
  bottomButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    borderRadius: 50,
    // width: 100,
    height: 50,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default Random;
