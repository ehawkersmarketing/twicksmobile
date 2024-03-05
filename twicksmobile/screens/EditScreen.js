import { StyleSheet, TextInput, Pressable, Text, View } from "react-native";
import React from "react";

const EditScreen = () => {
  return (
    <>
      <View style={{ padding: 10 }}>
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ paddingVertical: 5, fontSize: 15 }}>Name</Text>
          <TextInput placeholder="Rishika Kothari" style={{ fontSize: 30 }} />
          <View style={styles.line}></View>
        </View>
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ paddingVertical: 5, fontSize: 15 }}>
            Mobile Number
          </Text>
          <TextInput placeholder="9993720620" style={{ fontSize: 30 }} />
          <View style={styles.line}></View>
        </View>
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ paddingVertical: 5, fontSize: 15 }}>Email ID</Text>
          <TextInput
            placeholder="rishikak10@gmail.com"
            style={{ fontSize: 30 }}
          />
          <View style={styles.line}></View>
        </View>
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ paddingVertical: 5, fontSize: 15 }}>Location</Text>
          <TextInput placeholder="Sadar Road Balod" style={{ fontSize: 30 }} />
          <View style={styles.line}></View>
        </View>
        <View>
          <Pressable
            style={{
              backgroundColor: "#28635D",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white", padding: 14, fontSize: 20 }}>
              Edit
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
    // marginVertical: 10,
  },
});
