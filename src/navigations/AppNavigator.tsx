/**
 * AppNavigator - let's user navigate through the different services like, Ride, Package Delivery, Chat
 */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatNavigator from './ChatNavigator';
import QueryNavigatorScreen from './QueryNavigator';
import { Screens } from "../definitions/screen-definitions";
import { Icon } from 'native-base';
import PDStackNavigator from './PDStackNavigator';
import RideStackNavigator from './RideStackNavigator';
import SearchNavigator from './SearchNavigator';

const AppNavigator = createBottomTabNavigator();

export default function AppTabsNavigator() {
    return (
        <AppNavigator.Navigator initialRouteName={Screens.RIDE} tabBarOptions={{
            keyboardHidesTabBar: true
        }}>
            <AppNavigator.Screen name={Screens.RIDE} component={RideStackNavigator} options={{
                title: Screens.RIDE,
                tabBarLabel: Screens.RIDE,
                tabBarIcon: () => (<Icon name="ios-car" />)
            }} />
            <AppNavigator.Screen name={Screens.PACKAGE_DELIVERY} component={PDStackNavigator} options={{
                title: Screens.PACKAGE_DELIVERY,
                tabBarLabel: Screens.PACKAGE_DELIVERY,
                tabBarIcon: () => (<Icon name="box" type="Entypo" />)
            }} />
            <AppNavigator.Screen name={Screens.GUILD} component={SearchNavigator} options={{
                title: Screens.SEARCH,
                tabBarLabel: Screens.SEARCH,
                tabBarIcon: () => (<Icon name="search" type="Ionicons" />)
            }} />
            <AppNavigator.Screen name={Screens.GUIDE_ME} component={QueryNavigatorScreen} options={{
                title: Screens.GUIDE_ME,
                tabBarLabel: 'Guide Me',
                tabBarIcon: () => (<Icon name="map-marker-question" type="MaterialCommunityIcons" />)
            }} />
            <AppNavigator.Screen name={Screens.CHATS} component={ChatNavigator} options={{
                title: Screens.CHATS,
                tabBarLabel: Screens.CHATS,
                tabBarIcon: () => (<Icon name="ios-chatbubbles" />)
            }} />
        </AppNavigator.Navigator>
    )
}