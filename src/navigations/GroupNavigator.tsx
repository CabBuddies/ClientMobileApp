import { DrawerActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'native-base';
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { Screens } from '../definitions/screen-definitions';
import TravelGroupScreen from '../screens/app-screens/group-screens/TravelGroupScreen';

const TravelNavigator = createStackNavigator();

export default function GroupNavigator() {
    const navigation = useNavigation();
    return (
        <TravelNavigator.Navigator initialRouteName={Screens.GUILD} screenOptions={{
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <Icon name="menu" type="MaterialCommunityIcons" />
                </TouchableOpacity>
            )
        }}>
            <TravelNavigator.Screen name={Screens.GUILD} component={TravelGroupScreen} />
        </TravelNavigator.Navigator>
    )
}
