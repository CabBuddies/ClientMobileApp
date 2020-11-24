import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import RideScreen from '../screens/app-screens/RideScreen';
import { Screens } from '../definitions/screen-definitions';

const RideNavigator = createStackNavigator();

export default function RideStackNavigator() {
    return (
        <RideNavigator.Navigator>
            <RideNavigator.Screen name={Screens.RIDE} component={RideScreen} />
        </RideNavigator.Navigator>
    )
}
