/**
 * RootNavigator - holds the entire navigation for the app.
 */
import React, { useState, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { storeItem, retrieveItem } from "../local-storage/StorageHelpers";
import { AuthContext } from "./AuthContext";
import ProfileDrawerNavigator from "./ProfileNavigator";
import AuthNavigator from "./AuthNavigator";
import Reactotron from 'reactotron-react-native'


const RootNavigator = new createStackNavigator();

export default function RootStackNavigator() {

  const [isSignedIn,dispatch] = useState(false);
  const authContext = useMemo(
    () => ({

      signIn: async (data) => {
        Reactotron.log(`user signed in`);
        Reactotron.log(data);
        await storeItem("@user",data,true);
        dispatch(true)
      },
      signOut: async () => {
        Reactotron.log(`signed out`);
        dispatch(false)
      },

      signUp: async (data) => {
        Reactotron.log(`sign up successful`);
        Reactotron.log(data);
        await storeItem("@user",data,true);
        dispatch(true);
      },

      anonymous: async ()=> {
        Reactotron.log(`user sign in anonymous`);
        dispatch(true);
      }

    })
  )
  return (
    <AuthContext.Provider value = {authContext}>
    <NavigationContainer>
      <RootNavigator.Navigator headerMode="none">
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
