/**
 * RootNavigator - holds the entire navigation for the app.
 */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileDrawerNavigator from "./ProfileNavigator";
import AuthNavigator from "./AuthNavigator";

const RootNavigator = new createStackNavigator();

export default function RootStackNavigator({ isLoggedIn }) {
  return (
    <NavigationContainer>
      <RootNavigator.Navigator headermode="none">
        {isLoggedIn ? (
          <RootNavigator.Screen name="App" component={ProfileDrawerNavigator} />
        ) : (
          <RootNavigator.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootNavigator.Navigator>
    </NavigationContainer>
  );
}
