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
import Reactotron from 'reactotron-react-native';
import { signInApp, signUpApp } from '../api/Auth';


const RootNavigator = new createStackNavigator();

export default function RootStackNavigator() {

  const [isSignedIn,dispatch] = useState(false);
  const authContext = useMemo(
    () => ({

      signIn: async (data) => {
        Reactotron.log(`user signed in`);
        Reactotron.log(data);
        
        try{
          const response = await signInApp(data);
          console.log("response in signIn", response);
          await storeItem("@JWT",response.data,true);
          dispatch(true);
          return "Success";
        }
        catch(err){
          dispatch(false);
          if(!isNaN(parseInt(err.name)))
            console.log("Error signing in",err.message);
          else{
            console.error("Oops!",err.message);
            throw {message:"Something went wrong!, check your connection"}
          }
          throw err;
        }
        
      },
      signOut: async () => {
        Reactotron.log(`signed out`);
        dispatch(false)
      },

      signUp: async (data) => {
        Reactotron.log(`sign up successful`);
        Reactotron.log(data);
        try{
            const response = await signUpApp(data);
            console.log("signup response",response);
            await storeItem("@user",data,true);
            dispatch(true);
            return "Success";
        }
        catch(err){
            if(!isNaN(parseInt(err.name)))
              console.log("Error signing in",err.message);
            else
              console.error("Oops!",err.message);
            dispatch(false);
            throw err;
        }
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
