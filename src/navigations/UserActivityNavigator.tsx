import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Screens } from '../definitions/screen-definitions';
import UserGroupsScreen from '../screens/user-screens/UserGroupsScreen';
import UserQueriesScreen from '../screens/user-screens/UserQueriesScreen';
import UserDeliveryScreen from '../screens/user-screens/UserDeliveryScreen';

const UserActivityTopTabsNavigator = createMaterialTopTabNavigator();

const UserActivityNavigator = ({ user }) => {
    return (
        <>
            <UserActivityTopTabsNavigator.Navigator initialRouteName={Screens.USER_GROUPS} >
                <UserActivityTopTabsNavigator.Screen name={Screens.USER_GROUPS} component={UserGroupsScreen} initialParams={user} />
                <UserActivityTopTabsNavigator.Screen name={Screens.USER_QUERIES} component={UserQueriesScreen} initialParams={user} />
                <UserActivityTopTabsNavigator.Screen name={Screens.USER_DELIVERY} component={UserDeliveryScreen} initialParams={user} />
            </UserActivityTopTabsNavigator.Navigator>
        </>
    )
}

export default UserActivityNavigator
