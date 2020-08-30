import React from 'react';
import { View, Text, Button } from 'react-native';

export default function SignInScreen({ navigation }) {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>This is Sign In Screen</Text>
            <Button 
                title="Sign Up"
                onPress={() => navigation.navigate('SignUp')}
            />
        </View>
    )
}