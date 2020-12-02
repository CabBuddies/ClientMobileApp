import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PackageDeliveryScreen from '../screens/app-screens/PackageDeliveryScreen';
import { TouchableOpacity } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';

const PDNavigator = createStackNavigator();

export default function PDStackNavigator() {
    const navigation = useNavigation();
    return (
        <PDNavigator.Navigator>
            <PDNavigator.Screen name="Delivery" component={PackageDeliveryScreen} />
        </PDNavigator.Navigator>
    )
}
