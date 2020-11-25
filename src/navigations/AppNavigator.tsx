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
import GroupNavigator from './GroupNavigator';

const AppNavigator = createBottomTabNavigator();

export default function AppTabsNavigator() {
    return (
        <AppNavigator.Navigator initialRouteName={Screens.RIDE} tabBarOptions={{
            keyboardHidesTabBar: true
        }}>
            <AppNavigator.Screen name={Screens.CHATS} component={ChatNavigator} options={{
                title: Screens.CHATS,
                tabBarLabel: Screens.CHATS,
                tabBarIcon: () => (<Icon name="ios-chatbubbles" />)
            }} />
            <AppNavigator.Screen name={Screens.GUILD} component={GroupNavigator} options={{
                title: Screens.GUILD,
                tabBarLabel: Screens.GUILD,
                tabBarIcon: () => (<Icon name="account-group" type="MaterialCommunityIcons" />)
            }} />
            <AppNavigator.Screen name={Screens.RIDE} component={RideStackNavigator} options={{
                title: Screens.RIDE,
                tabBarLabel: 'Rides',
                tabBarIcon: () => (<Icon name="ios-car" />)
            }} />
            <AppNavigator.Screen name={Screens.GUIDE_ME} component={QueryNavigatorScreen} options={{
                title: Screens.GUIDE_ME,
                tabBarLabel: 'Guide Me',
                tabBarIcon: () => (<Icon name="map-marker-question" type="MaterialCommunityIcons" />)
            }} />
            <AppNavigator.Screen name={Screens.PACKAGE_DELIVERY} component={PDStackNavigator} options={{
                title: Screens.PACKAGE_DELIVERY,
                tabBarLabel: 'Package Delivery',
                tabBarIcon: () => (<Icon name="box" type="Entypo" />)
            }} />
        </AppNavigator.Navigator>
    )
}