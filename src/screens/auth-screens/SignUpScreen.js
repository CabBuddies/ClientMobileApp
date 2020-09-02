import React from 'react';
import { View, Text } from 'react-native';
import SignUpForm from "../../components/organisms/SignUpForm"
export default function SignUpScreen() {
    return(
        <View style={{ flex: 1, padding:40 }}>
            {/* <Text>This is Sign Up Screen.</Text> */}
            <SignUpForm/>
        </View>
    )
}