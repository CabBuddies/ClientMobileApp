import "react-native-gesture-handler";
import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import RootStackNavigator from "./src/navigations/RootNavigator";
import { Root } from "native-base";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./src/redux/configureStore";

export default function App() {
  const store = configureStore();

  // placeholder variable
  const isSignedIn = store.isSignedIn;

  let [fontsLoaded] = useFonts({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });

  return (
    <ReduxProvider store={store}>
      <Root>
        {!fontsLoaded ? (
          <AppLoading />
        ) : (
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <RootStackNavigator isLoggedIn={isSignedIn} />
          </View>
        )}
      </Root>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
