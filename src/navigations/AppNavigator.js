/**
 * AppNavigator - let's user navigate through the different services like, Ride, Package Delivery, Chat
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatNavigator from './ChatNavigator';
import PackageDeliveryScreen from '../screens/app-screens/PackageDeliveryScreen';
import RideScreen from '../screens/app-screens/RideScreen';
import TravelQueryScreen from '../screens/app-screens/query-screens/TravelQueryScreen';

const AppNavigator = createBottomTabNavigator();

export default function AppTabsNavigator() {
    return(
        <AppNavigator.Navigator initialRouteName="Ride" >
            <AppNavigator.Screen name="Chat" component={ChatNavigator} />
            <AppNavigator.Screen name="Ride" component={RideScreen} />
            <AppNavigator.Screen name="Travel Query" component={TravelQueryScreen} />
            <AppNavigator.Screen name="Package Delivery" component={PackageDeliveryScreen} />
        </AppNavigator.Navigator>
    )
}