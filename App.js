import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import AuthNavigator from './src/navigations/AuthNavigator';
import AppNavigator from './src/navigations/AppNavigator';

export default function App() {

  // placeholder variable
  const isSignedIn = true

  return (
    <NavigationContainer>
        <StatusBar style="auto" />
        {
          isSignedIn ?
          <AppNavigator /> :
          <AuthNavigator />
        }
    </NavigationContainer>
  );
}
