import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PackageDeliveryScreen from '../screens/app-screens/PackageDeliveryScreen';

const PDNavigator = createStackNavigator();

export default function PDStackNavigator() {
    return (
        <PDNavigator.Navigator screenOptions={{
            title: 'Delivery'
        }}>
            <PDNavigator.Screen name="Delivery" component={PackageDeliveryScreen} />
        </PDNavigator.Navigator>
    )
}
