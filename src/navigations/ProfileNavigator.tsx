/**
 * ProfileNavigator - main navigator which holds entire app navigation.
 */
import React,{ useContext } from 'react';
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';

import MyProfileScreen from '../screens/user-screens/MyProfileScreen';
import SettingsScreen from '../screens/user-screens/SettingsScreen';
import AppTabsNavigator from './AppNavigator';
import { AuthContext } from "./AuthContext";

// import { CButton } from "../components/atoms"

const ProfileDrawer = createDrawerNavigator();
type SignOut = () => void

/**
 * parent of all the post-auth application screens
 */
export default function ProfileDrawerNavigator() {
    const { signOut } = useContext(AuthContext);
    return(
        <ProfileDrawer.Navigator initialRouteName="My Profile" drawerContent = {
            (props) => {return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}/>
                <DrawerItem label = "Sign Out" style = {{backgroundColor:"#3F51B5"}} labelStyle = {{color:"#fffeee",fontSize:20}} onPress = {signOut}/>
            </DrawerContentScrollView>
            ) }          
        }
        drawerContentOptions = {
            {
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