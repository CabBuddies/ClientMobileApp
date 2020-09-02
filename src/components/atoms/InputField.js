import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

export default function InputField(props) {

    return(
        <View style = {{paddingBottom:15, justifyContent:"space-around"}}>
        <TextInput
            {...props}
        />
        </View>
    )
    
}
