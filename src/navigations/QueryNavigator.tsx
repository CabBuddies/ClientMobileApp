import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import TravelQueryScreen from '../screens/app-screens/query-screens/TravelQueryScreen';
import QueryViewScreen from '../screens/app-screens/query-screens/QueryViewScreen';
import { Screens } from "../definitions/screen-definitions";

const QueryNavigator = createStackNavigator();

export default function QueryNavigatorScreen(props:any) {
    return(
        <QueryNavigator.Navigator initialRouteName={Screens.GUIDE_ME} >
            <QueryNavigator.Screen name={Screens.GUIDE_ME} component={TravelQueryScreen} />
            <QueryNavigator.Screen name={Screens.QUERY_VIEW} component={QueryViewScreen} options={({ route }:{route:any}) => ({ title: route.params!.name,headerStyle:{backgroundColor:"#3F51B5"}, titleStyle:{color:"#fff"} })}/>
        </QueryNavigator.Navigator>
    )
}