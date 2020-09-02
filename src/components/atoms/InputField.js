import React from 'react';
import { TextInput, View } from 'react-native';

export default function InputField(props) {
    return(
        <View style = {{flex: 1, padding:10}}>
        <TextInput
            {...props}
        />
        </View>
    )
}