import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import SignInScreen from '../screens/auth-screens/SignInScreen';
import SignUpScreen from '../screens/auth-screens/SignUpScreen';

const AuthNavigator = createStackNavigator();

export default function AuthStackNavigator() {
    return(
        <AuthNavigator.Navigator initialRouteName="SignIn" >
            <AuthNavigator.Screen name="SignIn" component={SignInScreen} />
            <AuthNavigator.Screen name="SignUp" component={SignUpScreen} />
        </AuthNavigator.Navigator>
    )
}