import React from 'react';
import { View, Text } from 'react-native';
import Form from '../../components/organisms';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default function SignUpScreen() {
    return(
        <KeyboardAwareScrollView>
        <View style={{ flex: 1, paddingTop:40, paddingHorizontal:24 }}>
            {/* <Text>This is Sign Up Screen.</Text> */}
            <Form/>
        </View>
        </KeyboardAwareScrollView>
    )
}