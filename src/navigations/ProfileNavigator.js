/**
 * ProfileNavigator - main navigator which holds entire app navigation.
 */
import React,{ useContext } from 'react';
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';

import MyProfileScreen from '../screens/user-screens/MyProfileScreen';
import SettingsScreen from '../screens/user-screens/SettingsScreen';
import AppTabsNavigator from '../navigations/AppNavigator';
import { AuthContext } from "./AuthContext";

// import { CButton } from "../components/atoms"

const ProfileDrawer = createDrawerNavigator();

export default function ProfileDrawerNavigator() {
    const { signOut } = useContext(AuthContext)
    return(
        <ProfileDrawer.Navigator initialRouteName="App" drawerContent = {
            (props) => {return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}/>
                <DrawerItem label = "Sign Out" style = {{backgroundColor:"tomato"}} labelStyle = {{color:"#fffeee",fontSize:20}} onPress = {signOut}/>
            </DrawerContentScrollView>
            ) }          
        }
        drawerContentOptions = {
            {
                activeTintColor:"#e95021",
                labelStyle: {fontSize:20}
            }
        }
        >
            <ProfileDrawer.Screen name="App" component={AppTabsNavigator} />
            <ProfileDrawer.Screen name="My Profile" component={MyProfileScreen} />
            <ProfileDrawer.Screen name="Settings" component={SettingsScreen} />
        </ProfileDrawer.Navigator>
    )
}