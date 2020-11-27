/**
 * AuthStackNavigator - Let's user Navigate between Sign Up and Sign In screen.
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { Screens } from "../definitions/screen-definitions";
import SignInScreen from '../screens/auth-screens/SignInScreen';
import LoginScreen from '../screens/auth-screens/LoginScreen';
import SignUpScreen from '../screens/auth-screens/SignUpScreen';

const AuthNavigator = createStackNavigator();

export default function AuthStackNavigator(props: any) {
    return (
        <AuthNavigator.Navigator initialRouteName={Screens.SIGN_IN}  >
            <AuthNavigator.Screen name={Screens.SIGN_IN} component={SignInScreen} />
            <AuthNavigator.Screen name={Screens.SIGN_UP} component={SignUpScreen} />
        </AuthNavigator.Navigator>
    )
}