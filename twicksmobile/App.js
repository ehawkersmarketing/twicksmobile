import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { Provider } from "react-redux";
import store from "./store";
import GlobalStyles from "./component/GlobalStyles";

export default function App() {
  return (
    <>
      <SafeAreaView style={GlobalStyles.androidSafeArea}>
        <Provider store={store}>
          <StackNavigator />
        </Provider>
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
