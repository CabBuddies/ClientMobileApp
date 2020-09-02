import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PackageDeliveryScreen from '../screens/app-screens/PackageDeliveryScreen';
import ChatScreen from '../screens/app-screens/ChatScreen';
import RideScreen from '../screens/app-screens/RideScreen';

import ProfileNavigator from './ProfileNavigator';

const AppNavigator = createBottomTabNavigator();

export default function AppTabsNavigator() {
    return(
        <AppNavigator.Navigator initialRouteName="Ride" >
            <AppNavigator.Screen name="Chat" component={ChatScreen} />
            <AppNavigator.Screen name="Ride" component={RideScreen} />
            <AppNavigator.Screen name="PackageDelivery" component={PackageDeliveryScreen} />
        </AppNavigator.Navigator>
    )
}