/**
 * ProfileNavigator - main navigator which holds entire app navigation.
 */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MyProfileScreen from '../screens/user-screens/MyProfileScreen';
import SettingsScreen from '../screens/user-screens/SettingsScreen';
import AppTabsNavigator from '../navigations/AppNavigator';

const ProfileDrawer = createDrawerNavigator();

export default function ProfileDrawerNavigator() {
    return(
        <ProfileDrawer.Navigator initialRouteName="App">
            <ProfileDrawer.Screen name="App" component={AppTabsNavigator} />
            <ProfileDrawer.Screen name="MyProfile" component={MyProfileScreen} />
            <ProfileDrawer.Screen name="Settings" component={SettingsScreen} />
        </ProfileDrawer.Navigator>
    )
}