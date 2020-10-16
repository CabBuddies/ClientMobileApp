import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import TravelQueryScreen from '../screens/app-screens/query-screens/TravelQueryScreen';
import QueryViewScreen from '../screens/app-screens/query-screens/QueryViewScreen';

const QueryNavigator = createStackNavigator();

export default function QueryNavigatorScreen(props) {
    return(
        <QueryNavigator.Navigator initialRouteName="GuideMe" >
            <QueryNavigator.Screen name="GuideMe" component={TravelQueryScreen} />
            <QueryNavigator.Screen name="QueryView" component={QueryViewScreen} />
        </QueryNavigator.Navigator>
    )
}