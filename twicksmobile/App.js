import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import GlobalStyles from "./component/GlobalStyles";

export default function App() {
  return (
    <>
      <SafeAreaView style={GlobalStyles.androidSafeArea}>
        
          <StackNavigator />
     
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
