import { DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { CustomAvatar } from '../components/molecules';
import { Screens } from '../definitions/screen-definitions';
import SearchScreen from '../screens/user-screens/SearchScreen';
import UserProfileScreen from '../screens/user-screens/UserProfileScreen';

const SearchStack = createStackNavigator();

function SearchNavigator({ navigation }) {
    return (
        <SearchStack.Navigator initialRouteName={Screens.SEARCH} mode="modal" screenOptions={{
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <Icon name="menu" type="MaterialCommunityIcons" />
                </TouchableOpacity>
            )}}>
            <SearchStack.Screen name="Search" component={SearchScreen} />
            <SearchStack.Screen name={Screens.USER_PROFILE} component={UserProfileScreen} />
        </SearchStack.Navigator>
    );
}

export default SearchNavigator
