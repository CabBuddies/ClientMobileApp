import React from "react";
import { View, Text } from "react-native";
import Form from '../organisms/Form'
export default function SignInForm() {
  return (
    <View style={{flex:1}}>
      <Form type="login"/>
    </View>
  );
}
