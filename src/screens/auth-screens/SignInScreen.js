import React from 'react';
import { View, Text, Button } from 'react-native';
import SignInForm from '../../components/organisms/SignInForm'
export default function SignInScreen({ navigation }) {
    const nav = (nav) => {
        console.log('[Info] navigating to SignUp screen\n')
        navigation.navigate('SignUp')
    }
    return(
        <View style={{ flex: 1}}>
            <SignInForm/>
            <Text>Don't have an account? </Text>
            <Button 
                title="Sign Up"
                onPress={nav}
            />
        </View>
    )
}