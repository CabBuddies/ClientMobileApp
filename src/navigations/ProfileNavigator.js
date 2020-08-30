import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MyProfileScreen from '../screens/user-screens/MyProfileScreen';

const ProfileDrawer = createDrawerNavigator();

export default function ProfileDrawerNavigator() {
    return(
        <ProfileDrawer.Navigator>
            <ProfileDrawer.Screen name="MyProfile" component={MyProfileScreen} />
        </ProfileDrawer.Navigator>
    )
}