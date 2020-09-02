import React from 'react';
import { View, Text, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Form from '../../components/organisms'
// import SignInForm from '../../components/organisms/SignInForm'

export default function SignInScreen({ navigation }) {
    const nav = (nav) => {
        console.log('[Info] navigating to SignUp screen\n')
        navigation.navigate('SignUp')
    }
    return(
        <KeyboardAwareScrollView>
        <View style={{ flex: 1}}>
            <Form type="login"/>
            <Text>Don't have an account? </Text>
            <Button 
                title="Sign Up"
                onPress={nav}
            />
        </View>
        </KeyboardAwareScrollView>
    )
}