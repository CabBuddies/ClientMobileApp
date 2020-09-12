import React from 'react';
import { View, Text } from 'react-native';

export default function MyProfileScreen({ navigation }) {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>This is My Profile Screen.</Text>
        </View>
    )
}