import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import RideScreen from '../screens/app-screens/RideScreen';
import { Screens } from '../definitions/screen-definitions';
import { TouchableOpacity } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';
import TravelGroupScreen from '../screens/app-screens/group-screens/TravelGroupScreen';

const RideNavigator = createStackNavigator();

export default function RideStackNavigator() {
    const navigation = useNavigation();
    return (
        <RideNavigator.Navigator 
        // screenOptions={{
        //     headerLeft: () => (
        //         <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        //             <Icon name="menu" type="MaterialCommunityIcons" />
        //         </TouchableOpacity>
        //     )
        // }}
        >
            <RideNavigator.Screen name={Screens.RIDE} component={RideScreen} />
            <RideNavigator.Screen name={Screens.GROUPS_SCREEN} component={TravelGroupScreen} />
        </RideNavigator.Navigator>
    )
}
