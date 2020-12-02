import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Screens } from '../definitions/screen-definitions';
import UserGroupsScreen from '../screens/user-screens/UserGroupsScreen';
import UserQueriesScreen from '../screens/user-screens/UserQueriesScreen';

const UserActivityTopTabsNavigator = createMaterialTopTabNavigator();

const UserActivityNavigator = () => {
    return (
        <>
            <UserActivityTopTabsNavigator.Navigator initialRouteName={Screens.USER_GROUPS}>
                <UserActivityTopTabsNavigator.Screen name={Screens.USER_GROUPS} component={UserGroupsScreen} />
                <UserActivityTopTabsNavigator.Screen name={Screens.USER_QUERIES} component={UserQueriesScreen} />
            </UserActivityTopTabsNavigator.Navigator>
        </>
    )
}

export default UserActivityNavigator
