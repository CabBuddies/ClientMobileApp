import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import RideScreen from '../screens/app-screens/group-screens/RideScreen';
import { Screens } from '../definitions/screen-definitions';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import TravelGroupsListScreen from '../screens/app-screens/group-screens/TravelGroupsListScreen';
import CreateGroupScreen from '../screens/app-screens/group-screens/CreateGroupScreen';
import GroupViewScreen from '../screens/app-screens/group-screens/GroupViewScreen';
import PostCreateScreen from '../screens/app-screens/group-screens/PostCreateScreen';


const RideNavigator = createStackNavigator();

export default function RideStackNavigator() {
    const navigation = useNavigation();
    return (
        <RideNavigator.Navigator initialRouteName={Screens.RIDE}
        // screenOptions={{
        //     headerLeft: () => (
        //         <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        //             <Icon name="menu" type="MaterialCommunityIcons" />
        //         </TouchableOpacity>
        //     )
        // }}
        >
            <RideNavigator.Screen name={Screens.RIDE} component={RideScreen} />
            <RideNavigator.Screen name={Screens.GROUPS_SCREEN} component={TravelGroupsListScreen} />
            <RideNavigator.Screen name={Screens.CREATE_GROUP} component={CreateGroupScreen} />
            <RideNavigator.Screen name={Screens.GROUP_VIEW} component={GroupViewScreen} />
            <RideNavigator.Screen name={Screens.POST_CREATE} component={PostCreateScreen}/>
        </RideNavigator.Navigator>
    )
}
