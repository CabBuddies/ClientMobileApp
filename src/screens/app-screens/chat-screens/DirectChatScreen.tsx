import React from 'react';
import { View, Text, StatusBar } from 'react-native';


export default function DirectChatScreen() {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* <StatusBar hidden/> */}
            <Text>In person chats are displayed here.</Text>
        </View>
    )
}