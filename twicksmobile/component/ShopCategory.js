import { StyleSheet, Pressable, Text, View } from "react-native";
import React from "react";

const ShopCategory = ({ item, selected,onPress }) => {
  const backgroundColor = selected ? "blue" : "white"; 
  return (
    <Pressable
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
    >
      <View style={styles.category}>
        <Text style={styles.text}>{item.category}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
    padding: 10,
    margin: 10,
  },
  category: {},
  text: {},
});

export default ShopCategory;
