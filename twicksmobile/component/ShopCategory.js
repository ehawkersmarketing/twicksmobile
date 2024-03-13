import { StyleSheet, Pressable, Text, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const ShopCategory = ({ item, selected, onPress }) => {
  const backgroundColor = selected ? "#BAE4F6" : "white";
  return (
    <Pressable
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
    >
      <View style={styles.category}>
        {selected ? (
          <View style={{flexDirection:"row",gap:7}}>
            <Text style={styles.text}>{item.category}</Text>
            <Entypo name="cross" size={20} color="black" />
          </View>
        ) : (
          <Text style={styles.text}>{item.category}</Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "black",
    borderRadius: 15,
    padding: 10,
    margin: 10,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  category: { alignItems: "center", justifyContent: "center" },
});

export default ShopCategory;
