import "react-native-gesture-handler";
import React, { useState, useMemo, useEffect } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import RootStackNavigator from "./src/navigations/RootNavigator";
import  { Provider as PaperProvider } from 'react-native-paper';
import { Root } from "native-base";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./src/redux/configureStore";
if(__DEV__) {
  import ('./dev/ReactotronConfig')
}
import Reactotron from 'reactotron-react-native';
import { applyLocalDefinitions } from "./src/api/api-definitions";

Reactotron.log!("Hello there!")

export default function App() {
  const store = configureStore();
  // reset api definitions on component mount
  useEffect(() =>{
    applyLocalDefinitions();
  },[])
  
  // placeholder variable
  const isSignedIn = store;

  let [fontsLoaded] = useFonts({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });

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
        <ReduxProvider store={store}>
          <PaperProvider>
            <View style={styles.container}>
              {Platform.OS === "ios" && <StatusBar barStyle="default" />}
              <RootStackNavigator />
            </View>
          </PaperProvider>
        </ReduxProvider>
      </Root>
      )
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
