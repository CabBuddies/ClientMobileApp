/**
 * AppNavigator - let's user navigate through the different services like, Ride, Package Delivery, Chat
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatNavigator from './ChatNavigator';
import PackageDeliveryScreen from '../screens/app-screens/PackageDeliveryScreen';
import RideScreen from '../screens/app-screens/RideScreen';
import TravelQueryScreen from '../screens/app-screens/query-screens/TravelQueryScreen';
import QueryNavigatorScreen from './QueryNavigator';
import { Screens } from "../definitions/screen-definitions";

const AppNavigator = createBottomTabNavigator();

export default function AppTabsNavigator() {
    return(
        <AppNavigator.Navigator initialRouteName={Screens.RIDE} >
            <AppNavigator.Screen name={Screens.CHATS} component={ChatNavigator} />
            <AppNavigator.Screen name={Screens.RIDE}  component={RideScreen} />
            <AppNavigator.Screen name={Screens.GUIDE_ME}  component={QueryNavigatorScreen} />
            <AppNavigator.Screen name={Screens.PACKAGE_DELIVERY}  component={PackageDeliveryScreen} />
        </AppNavigator.Navigator>
    )
}