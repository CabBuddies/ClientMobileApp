/**
 * ChatNavigator is a TopTabNavigator facilitates swtiching between Group and Direct chat
 */
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Screens } from "../definitions/screen-definitions";
import GroupChatScreen from '../screens/app-screens/chat-screens/GroupChatScreen';
import DirectChatScreen from '../screens/app-screens/chat-screens/DirectChatScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { Icon } from 'native-base';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const ChatStackNavigator = createStackNavigator();

const ChatNavigator = createMaterialTopTabNavigator();

function ChatTopTabNavigator() {
    return(
        <ChatNavigator.Navigator initialRouteName={Screens.CHAT_GROUP} >
            <ChatNavigator.Screen name={Screens.CHAT_GROUP} component={GroupChatScreen} />
            <ChatNavigator.Screen  name={Screens.CHAT_DIRECT} component={DirectChatScreen} />
        </ChatNavigator.Navigator>
    )
}

export default function ChatTopTabStackNavigator() {
    const navigation = useNavigation();
    return (
        <ChatStackNavigator.Navigator screenOptions={{
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <Icon name="menu" type="MaterialCommunityIcons" />
                </TouchableOpacity>
            )
        }}>
            <ChatStackNavigator.Screen name={Screens.CHATS} component={ChatTopTabNavigator} />
        </ChatStackNavigator.Navigator>
    );
}