/**
 * ProfileNavigator - main navigator which holds entire app navigation.
 */
import React,{ useContext } from 'react';
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { Screens } from "../definitions/screen-definitions";
import MyProfileScreen from '../screens/user-screens/MyProfileScreen';
import SettingsScreen from '../screens/user-screens/SettingsScreen';
import AppTabsNavigator from './AppNavigator';
import { connect } from 'react-redux';
import {signOut} from '../redux/actions/auth-action';
import { bindActionCreators } from 'redux';

// import { CButton } from "../components/atoms"

const ProfileDrawer = createDrawerNavigator();
type SignOut = () => void

/**
 * parent of all the post-auth application screens
 */
function ProfileDrawerNavigator({signOut}:any) {
    return(
        <ProfileDrawer.Navigator initialRouteName={Screens.PROFILE} drawerContent = {
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
            <ProfileDrawer.Screen name={Screens.APP} component={AppTabsNavigator} />
            <ProfileDrawer.Screen name={Screens.PROFILE} component={MyProfileScreen} />
            <ProfileDrawer.Screen name={Screens.SETTINGS} component={SettingsScreen} />
        </ProfileDrawer.Navigator>
    )
}
// function mapStateToProps(state) {
//     const { authState } = state;
//     return {
//           isSignedIn: authState.isSignedIn
//       };
//   }

function mapDispatchToProps(dispatch){
    return{
        signOut: bindActionCreators(signOut,dispatch)
    }
}

export default connect(null,mapDispatchToProps)(ProfileDrawerNavigator);