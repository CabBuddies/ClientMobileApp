/**
 * RootNavigator - holds the entire navigation for the app.
 */
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileDrawerNavigator from "./MyProfileStackNavigator";
import AuthNavigator from "./AuthNavigator";
import { connect } from "react-redux";
import { Navs, Screens } from "../definitions/screen-definitions";
import reactotron from "reactotron-react-native";
import HomeNavigator from "./HomeNavigator";

export type RootStackParamList = {
  [val: string]: any
}
const RootNavigator = createStackNavigator<RootStackParamList>();

/**
 * root for the entire application tree.
 */
function RootStackNavigator({ isSignedIn }) {
  useEffect(() => {
    reactotron.log!(`rootstacknavigator fully loaded`)
  }, [isSignedIn]);
  // Reactotron.log!("sign-in-redux-state",isSignedIn);
  return (
    // <AuthContext.Provider value = {authContext}>
    <NavigationContainer>
      <RootNavigator.Navigator headerMode="none">
        {isSignedIn ? (
          <RootNavigator.Screen name={Navs.APP} component={HomeNavigator} />
        ) : (
            <RootNavigator.Screen name={Navs.AUTH} component={AuthNavigator} />
          )}
      </RootNavigator.Navigator>
    </NavigationContainer>
    // </AuthContext.Provider>
  );
}
function mapStateToProps(state) {
  const { authState } = state;
  return {
    isSignedIn: authState.isSignedIn
  };
}

export default connect(mapStateToProps)(RootStackNavigator);


//context 
// const [isLoggedIn,dispatch] = useState(isSignedIn);
  // const authContext = useMemo(
  //   () => ({

  //     signIn: async (data:any) => {
  //       Reactotron.log!(`user signed in`);
  //       Reactotron.log!(data);

  //       try{
  //         const response:any = await signInApp(data);
  //         // console.log("response in signIn", response);
  //         await storeItem(StorageKeys.JWT,response!.data,true);
  //         dispatch(true);
  //         return "Success";
  //       }
  //       catch(err){
  //         dispatch(false);
  //         if(!isNaN(parseInt(err.name)))
  //           console.log("Error signing in",err.message);
  //         else{
  //           console.error("Oops!",err.message);
  //           throw {message:"Something went wrong!, check your connection"}
  //         }
  //         throw err;
  //       }

  //     },
  //     signOut: async () => {
  //       Reactotron.log!(`signed out`);
  //       dispatch(false)
  //     },

  //     signUp: async (data:any) => {
  //       Reactotron.log!(`sign up successful`);
  //       Reactotron.log!(data);
  //       try{
  //           const response:any = await signUpApp(data);
  //           console.log("signup response",response);
  //           await storeItem(StorageKeys.JWT,response!.data,true);
  //           dispatch(true);
  //           return "Success";
  //       }
  //       catch(err){
  //           dispatch(false);
  //           if(!isNaN(parseInt(err.name)))
  //             console.log("Error signing in",err.message);
  //             else{
  //               console.error("Oops!",err.message);
  //               throw {message:"Something went wrong!, check your connection"};
  //             }
  //             throw err;
  //       }
  //     },

  //     anonymous: async ()=> {
  //       Reactotron.log!(`user sign in anonymous`);
  //       dispatch(true);
  //     }

  //   }),[]
  // )