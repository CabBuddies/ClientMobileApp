import "react-native-gesture-handler";
import React from "react";
import { useState , useEffect } from "react"; 
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Root } from "native-base";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";

import AuthNavigator from './src/navigations/AuthNavigator';
import AppNavigator from './src/navigations/AppNavigator';

export default function App() {

  // placeholder variable
  const isSignedIn = false

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
      <NavigationContainer>
          <StatusBar style="auto" />
          {
            isSignedIn ?
            <AppNavigator /> :
            <AuthNavigator />
          }
      </NavigationContainer>
    </Root>
    )
  );
}
