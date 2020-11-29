import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Screens } from '../definitions/screen-definitions';
import SearchScreen from '../screens/user-screens/SearchScreen';
import UserProfileScreen from '../screens/user-screens/UserProfileScreen';

const SearchStack = createStackNavigator();

function SearchNavigator() {
    return (
        <SearchStack.Navigator initialRouteName={Screens.SEARCH} mode="modal">
            <SearchStack.Screen name="Search" component={SearchScreen} />
            <SearchStack.Screen name={Screens.USER_PROFILE} component={UserProfileScreen} />
        </SearchStack.Navigator>
    );
}

export default SearchNavigator
