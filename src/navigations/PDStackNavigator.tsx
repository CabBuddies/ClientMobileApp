import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PackageDeliveryScreen from '../screens/app-screens/PackageDeliveryScreen';
import { TouchableOpacity } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';
import PDHomeScreen from '../screens/app-screens/pd-screens/PDHomeScreen';
import PDListScreen from '../screens/app-screens/pd-screens/PDListScreen';
import { Screens } from '../definitions/screen-definitions';
import PDCreateScreen from '../screens/app-screens/pd-screens/PDCreateScreen';

const PDNavigator = createStackNavigator();

export default function PDStackNavigator() {
    const navigation = useNavigation();
    return (
        <PDNavigator.Navigator>
            <PDNavigator.Screen name={Screens.DELIVERY} component={PDHomeScreen} />
            <PDNavigator.Screen name={Screens.DELIVERY_LIST} component={PDListScreen} />
            <PDNavigator.Screen name={Screens.DELIVERY_CREATE} component={PDCreateScreen} />
        </PDNavigator.Navigator>
    )
}
