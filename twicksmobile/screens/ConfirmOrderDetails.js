import {React} from "react";
import { Pressable, SafeAreaView, TextInput, ScrollView, StyleSheet, Text, View, } from "react-native";

const ConfirmOrderDetails = () =>{
    
    return (
        <>
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "#F5FCFF",
            width:"100%",
          }}>
            <ScrollView>
                <View>
                    <View style={{padding:10,}}>
                        <Text style={{fontWeight:"bold", fontSize:18}}>Your Order Details</Text>
                    </View>
                    <View>
                    <View style={styles.table}>
                        {/* {data.map((item, index) => ( */}
                            <View  style={styles.row}>
                            <Text style={styles.cell}>Product Image</Text>
                            <Text style={styles.cell}>Name</Text>
                            <Text style={styles.cell}>Quantity</Text>
                            <Text style={styles.cell}>Price</Text>
                            </View>
                        {/* ))} */}
                    </View>
                    <View style={{padding:30,}}>
                        <View style={{flex:1, flexDirection:"row", justifyContent:"space-between", paddingTop:10, }}>
                            <Text style={{fontWeight:"bold", fontSize:13}}>Product Subtotal:</Text>
                            <Text style={{fontWeight:"bold", fontSize:13}}>₹ 123</Text>
                        </View>
                        <View style={{flex:1, flexDirection:"row", justifyContent:"space-between", paddingTop:10,}}>
                            <Text style={{fontWeight:"bold", fontSize:13}}>Shipping Charges:</Text>
                            <Text style={{fontWeight:"bold", fontSize:13}}>₹ 123</Text>
                        </View>
                        <View style={{flex:1, flexDirection:"row", justifyContent:"space-between", paddingTop:10,}}>
                            <Text style={{fontWeight:"bold", fontSize:13}}>Order Total:</Text>
                            <Text style={{fontWeight:"bold", fontSize:13}}>₹123</Text>
                        </View>
                    </View>
                    </View>
                    <View style={{padding:30,}}>
                        <View>
                            <Text style={{fontWeight:"bold", fontSize:18}}>Confirm Address:</Text>
                            <Text style={{ fontSize:13}}>₹123</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              padding: 10,
              backgroundColor: "#F5FCFF",
            }}>
            <View style={styles.line}></View>
            <Pressable onPress={() => navigation.navigate("ConfirmDetails")}
                  style={{
                    backgroundColor: "#28635D",
                    padding: 14,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 10,
                    marginTop: 10,
                    flex: 1
                  }}>
              <Text style={{ color: "white", fontSize: 20 }}>
                Place Order
              </Text>
            </Pressable>
          </View>

        </SafeAreaView>
        
        </>
    )
};
export default ConfirmOrderDetails;

const styles = StyleSheet.create({
    table: {
        flex: 1,
        marginTop: 50,
     },
     row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 10,
     },
     cell: {
        flex: 1,
        textAlign: 'center',
     },
});