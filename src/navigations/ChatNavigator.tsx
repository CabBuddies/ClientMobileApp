/**
 * ChatNavigator is a TopTabNavigator facilitates swtiching between Group and Direct chat
 */
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Screens } from "../definitions/screen-definitions";
import GroupChatScreen from '../screens/app-screens/chat-screens/GroupChatScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { Icon } from 'native-base';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import DirectChatListScreen from '../screens/app-screens/chat-screens/ChatListScreen';
import DirectChatScreen from '../screens/app-screens/chat-screens/DirectChatScreen';
import GroupChatListScreen from '../screens/app-screens/chat-screens/GroupChatListScreen';
import ChatListScreen from '../screens/app-screens/chat-screens/ChatListScreen';

// const UserDirectChatNavigator = createStackNavigator();

const ChatStackNavigator = createStackNavigator();

// const ChatNavigator = createMaterialTopTabNavigator();

// function UserDirectChat() {
//     return(
//         <UserDirectChatNavigator.Navigator initialRouteName={Screens.CHAT_DIRECT_LIST} mode="modal" >
//             <UserDirectChatNavigator.Screen name={Screens.CHAT_DIRECT} component={DirectChatScreen} />
//             <UserDirectChatNavigator.Screen name={Screens.CHAT_DIRECT_LIST} component={DirectChatListScreen} />
//         </UserDirectChatNavigator.Navigator>
//     );
// }

// function ChatTopTabNavigator() {
//     return(
//         <ChatNavigator.Navigator initialRouteName={Screens.CHAT_GROUP} >
//             <ChatNavigator.Screen name={Screens.CHAT_GROUP_LIST} component={GroupChatListScreen} />
//             <ChatNavigator.Screen name={Screens.CHAT_DIRECT_LIST} component={DirectChatListScreen}/>
//         </ChatNavigator.Navigator>
//     )
// }

export default function ChatNavigator() {
    const navigation = useNavigation();
    return (
        <ChatStackNavigator.Navigator initialRouteName={Screens.CHAT_LIST_SCREEN} 
        // screenOptions={{
        //     headerLeft: () => (
        //         <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        //             <Icon name="menu" type="MaterialCommunityIcons" />
        //         </TouchableOpacity>
        //     )
        // }}
        >
            <ChatStackNavigator.Screen name={Screens.CHAT_DIRECT} component={DirectChatScreen} />
            <ChatStackNavigator.Screen name={Screens.CHAT_GROUP} component={GroupChatScreen} />
            <ChatStackNavigator.Screen name={Screens.CHAT_LIST_SCREEN} component={ChatListScreen} />
            {/* <ChatStackNavigator.Screen name={Screens.CHATS} component={ChatTopTabNavigator} /> */}
        </ChatStackNavigator.Navigator>
    );
}