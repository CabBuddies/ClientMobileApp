/**
 * ChatNavigator is a TopTabNavigator facilitates swtiching between Group and Direct chat
 */
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import GroupChatScreen from '../screens/app-screens/chat-screens/GroupChatScreen';
import DirectChatScreen from '../screens/app-screens/chat-screens/DirectChatScreen';

const ChatNavigator = createMaterialTopTabNavigator();

export default function ChatTopTabNavigator() {
    return(
        <ChatNavigator.Navigator initialRouteName="Group" >
            <ChatNavigator.Screen name="Group" component={GroupChatScreen} />
            <ChatNavigator.Screen  name="Direct" component={DirectChatScreen} />
        </ChatNavigator.Navigator>
    );
}