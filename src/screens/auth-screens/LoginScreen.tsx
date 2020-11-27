import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import * as Google from "expo-google-app-auth";
import Constants from "expo-constants";

/**
 * 
 IOS CLIENT ID
1067716858916-mfm74qsnfas48kvfokh20nksscjmit36.apps.googleusercontent.com
IOS URL SCHEME
com.googleusercontent.apps.1067716858916-mfm74qsnfas48kvfokh20nksscjmit36 
ANDROID CLIENT ID
1067716858916-g7ep4dem93p8c1890ui4ukhg47m2l10c.apps.googleusercontent.com
 */
const IOS_CLIENT_ID =
  "1067716858916-mfm74qsnfas48kvfokh20nksscjmit36.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
  "1067716858916-g7ep4dem93p8c1890ui4ukhg47m2l10c.apps.googleusercontent.com";

export default class LoginScreen extends Component<{[key:string]:any}> {
  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: Constants.manifest.extras.IOS_CLIENT_ID,
        androidClientId: Constants.manifest.extras.ANDROID_CLIENT_ID,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        console.log("LoginScreen.js.js 21 | ", result.user ,result.user.givenName);
        // this.props.navigation.navigate("Profile", {
        //   username: result.user.givenName
        // }); //after Google login redirect to Profile
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log('LoginScreen.js.js 30 | Error with login', e);
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Login with Google" onPress={this.signInWithGoogle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});