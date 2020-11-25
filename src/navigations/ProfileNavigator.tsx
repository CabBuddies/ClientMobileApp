/**
 * ProfileNavigator - main navigator which holds entire app navigation.
 */
import React from 'react';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Screens } from "../definitions/screen-definitions";
import MyProfileScreen from '../screens/user-screens/MyProfileScreen';
import SettingsScreen from '../screens/user-screens/SettingsScreen';
import AppTabsNavigator from './AppNavigator';
import { connect } from 'react-redux';
import { signOut } from '../redux/actions/auth-action';
import { bindActionCreators } from 'redux';
import { Alert, View } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Button, Icon } from 'native-base';
import { TouchableOpacity } from '@gorhom/bottom-sheet';


// import { CButton } from "../components/atoms"

const MyProfileStack = createStackNavigator();

/**
 * Just a wrapper for My Profile Screens
 */
function MyProfileStackNavigator() {
    const navigation = useNavigation();
    return (
        <MyProfileStack.Navigator initialRouteName={Screens.PROFILE} mode="modal" screenOptions={{
            headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack()} />
        }} >
            <MyProfileStack.Screen name={Screens.PROFILE} component={MyProfileScreen} />
        </MyProfileStack.Navigator>
    );
}

const SettingsStack = createStackNavigator();

/**
 * Just a wrapper for Settings Screens
 */
function SettingsStackNavigator() {
    const navigation = useNavigation();
    return (
        <SettingsStack.Navigator initialRouteName={Screens.SETTINGS} mode="modal" screenOptions={{
            headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack()} />
        }} >
            <SettingsStack.Screen name={Screens.SETTINGS} component={SettingsScreen} />
        </SettingsStack.Navigator>
    );
}

const ProfileDrawer = createDrawerNavigator();
type SignOut = () => void

/**
 * parent of all the post-auth application screens
 */
function ProfileDrawerNavigator({ signOut }: any) {
    const navigation = useNavigation();
    return (
        <ProfileDrawer.Navigator
            initialRouteName={Screens.APP}
            drawerContent={
                (props) => {
                    return (
                        <DrawerContentScrollView {...props}>
                            <View>
                                <DrawerItem label="Profile" onPress={() => { navigation.navigate(Screens.PROFILE) }} />
                                <DrawerItem label="Settings" onPress={() => { navigation.navigate(Screens.SETTINGS) }} />
                                <DrawerItem label="Sign Out" style={{ backgroundColor: "#3F51B5" }} labelStyle={{ color: "#fffeee", fontSize: 15, fontWeight: "bold" }} onPress={signOut} />
                            </View>
                        </DrawerContentScrollView>
                    )
                }
            }
            drawerContentOptions={
                {
                    labelStyle: { fontSize: 15 }
                }
            }
        >
            <ProfileDrawer.Screen name={Screens.APP} component={AppTabsNavigator} />
            <ProfileDrawer.Screen name={Screens.PROFILE} component={MyProfileStackNavigator} />
            <ProfileDrawer.Screen name={Screens.SETTINGS} component={SettingsStackNavigator} />
        </ProfileDrawer.Navigator>
    )
}
// function mapStateToProps(state) {
//     const { authState } = state;
//     return {
//           isSignedIn: authState.isSignedIn
//       };
//   }

function mapDispatchToProps(dispatch) {
    return {
        signOut: bindActionCreators(signOut, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(ProfileDrawerNavigator);