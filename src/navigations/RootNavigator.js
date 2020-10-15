/**
 * RootNavigator - holds the entire navigation for the app.
 */
import React, { useState, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileDrawerNavigator from "./ProfileNavigator";
import AuthNavigator from "./AuthNavigator";

export const AuthContext = React.createContext();
const RootNavigator = new createStackNavigator();

export default function RootStackNavigator() {

  const [isSignedIn,dispatch] = useState(false);
  const authContext = useMemo(
    () => ({

      signIn: data => {
        console.log(`user signed in`);
        console.log(data);
        dispatch(true)
      },
      signOut: () => {
        console.log(`signed out`);
        dispatch(false)
      },

      signUp: (data) => {
        console.log(`sign up successful`);
        console.log(data);
        dispatch(true);
      },

      anonymous: ()=> {
        console.log(`user sign in anonymous`);
        dispatch(true);
      }

    })
  )
  return (
    <AuthContext.Provider value = {authContext}>
    <NavigationContainer>
      <RootNavigator.Navigator headermode="none">
        {isSignedIn ? (
          <RootNavigator.Screen name="AppRoot" component={ProfileDrawerNavigator} />
        ) : (
          <RootNavigator.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootNavigator.Navigator>
    </NavigationContainer>
    </AuthContext.Provider>
  );
}
