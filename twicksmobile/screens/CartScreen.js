import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const CartScreen = () => {
  return (
    <>
      <View style={{ flex: 1 ,padding:20}}>
        <View style={styles.container}>
          <View style={styles.rowmain}>
            <Text style={styles.cellmain}>Product Name </Text>
            <Text style={styles.cellmain}>Price (₹) </Text>
            <Text style={styles.cellmain}>Quantity</Text>
            <Text style={styles.cellmain}>Total Amount</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Product 1</Text>
            <Text style={styles.cell}>Price 1</Text>
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#000",
                padding: 5,
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View>
                <AntDesign name="minus" size={15} color="black" />
              </View>
              <Text>1</Text>
              <View>
                <AntDesign name="plus" size={15} color="black" />
              </View>
            </View>

            <Text style={styles.cell}>Amount 1</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Product 2</Text>
            <Text style={styles.cell}>Price 2</Text>
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#000",
                padding: 5,
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View>
                <AntDesign name="minus" size={15} color="black" />
              </View>
              <Text>1</Text>
              <View>
                <AntDesign name="plus" size={15} color="black" />
              </View>
            </View>

            <Text style={styles.cell}>Amount 2</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Total Gross</Text>
            <Text style={styles.cell}></Text>
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#000",
                padding: 5,
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View></View>
              <View></View>
            </View>

            <Text style={styles.cell}>Total</Text>
          </View>
        </View>
        <View style={styles.line}></View>

        <View style={{flexDirection:"row"}}>
          <Pressable  style={{
                backgroundColor: "#28635D",
                padding: 14,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                marginTop: 10,
                flex: 1,
                
              }}>
            <Text style={{ color: "white", fontSize: 20}}>Proceed To Checkout</Text>
          </Pressable>
          <Pressable  style={{
                backgroundColor: "#28635D",
                padding: 14,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                marginTop: 10,
                flex: 1,
              }}>
            <Text style={{ color: "white", fontSize: 20 }}>Continue Shopping</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
  },
  rowmain: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },cellmain: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    fontSize:20

  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    fontSize:15

  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
});
