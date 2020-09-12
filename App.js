import "react-native-gesture-handler";
import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import RootStackNavigator from "./src/navigations/RootNavigator";

export default function App() {

  // placeholder variable
  const isSignedIn = true;

  return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <RootStackNavigator isLoggedIn={isSignedIn} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
