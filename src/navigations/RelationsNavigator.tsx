import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import { Screens } from '../definitions/screen-definitions';
import FollowersScreen from '../screens/user-screens/FollowersScreen';
import FollowingScreen from '../screens/user-screens/FollowingScreen';

const RelationsNavigator = createMaterialTopTabNavigator();

export default function RelationsTopTabNavigator() {
    return (
        <>
            <RelationsNavigator.Navigator initialRouteName={Screens.FOLLOWERS}>
                <RelationsNavigator.Screen name={Screens.FOLLOWERS} component={FollowersScreen} />
                <RelationsNavigator.Screen name={Screens.FOLLOWING} component={FollowingScreen} />
            </RelationsNavigator.Navigator>
        </>
    );
}
