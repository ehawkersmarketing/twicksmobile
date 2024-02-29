import { StyleSheet, Pressable, Text, View } from "react-native";
import React from "react";

const ShopCategory = ({ categoryName }) => {
  return (
    <Pressable style={styles.container}>
      <View style={styles.category}>
        <Text style={styles.text}>All</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
  category: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
    padding: 10,
    margin: 10,
  },
  text: {},
});

export default ShopCategory;
