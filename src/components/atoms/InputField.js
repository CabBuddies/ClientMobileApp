import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

export default function InputField(props) {

    return(
        <View style = {{ paddingBottom:20 }}>
        <TextInput
            {...props}
        />
        </View>
    )
    
}
