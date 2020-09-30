import "react-native-gesture-handler";
import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import RootStackNavigator from "./src/navigations/RootNavigator";
import { Root } from "native-base";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";

export default function App() {

  // placeholder variable
  const isSignedIn = false;

  let [fontsLoaded] = useFonts(
    {
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    }
  )
  
  return (
    (!fontsLoaded)?
    (
      <Root>
      <AppLoading/>
    </Root>
    )
    :
    (
    
    <Root>
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <RootStackNavigator isLoggedIn={isSignedIn} />
      </View>
    </Root>
    )

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
