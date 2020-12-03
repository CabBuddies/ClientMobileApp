import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import TravelQueryScreen from '../screens/app-screens/query-screens/TravelQueryScreen';
import QueryViewScreen from '../screens/app-screens/query-screens/QueryViewScreen';
import { Screens } from "../definitions/screen-definitions";
import CreateQueryScreen from "../screens/app-screens/query-screens/CreateQueryScreen";
import { TouchableOpacity } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Icon } from "native-base";
import CreateResponseScreen from "../screens/app-screens/query-screens/CreateResponseScreen";

const QueryNavigator = createStackNavigator();
export type QueryStackParamList = {
    [val: string]: any
}
export default function QueryNavigatorScreen(props: any) {
    const navigation = useNavigation();
    return (
        <QueryNavigator.Navigator initialRouteName={Screens.GUIDE_ME} 
        // screenOptions={{
        //     headerLeft: () => (
        //         <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        //             <Icon name="menu" type="MaterialCommunityIcons" />
        //         </TouchableOpacity>
        //     )
        // }}
        >
            <QueryNavigator.Screen name={Screens.GUIDE_ME} component={TravelQueryScreen} />
            <QueryNavigator.Screen name={Screens.QUERY_CREATE} component={CreateQueryScreen} />
            <QueryNavigator.Screen name={Screens.QUERY_VIEW} component={QueryViewScreen}
                options={
                    ({ route }: { route: any }) =>
                        ({ title: route.params!.name })
                }
            />
            <QueryNavigator.Screen name={Screens.RESPONSE_CREATE} component={CreateResponseScreen} />
        </QueryNavigator.Navigator>
    )
}