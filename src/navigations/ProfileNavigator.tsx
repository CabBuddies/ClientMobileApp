/**
 * ProfileNavigator - main navigator which holds entire app navigation.
 */
import React from 'react';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Screens } from "../definitions/screen-definitions";
import MyProfileScreen from '../screens/user-screens/MyProfileScreen';
import SettingsScreen from '../screens/user-screens/SettingsScreen';
import AppTabsNavigator from './AppNavigator';
import { connect } from 'react-redux';
import { logOut, signOut } from '../redux/actions/auth-action';
import { bindActionCreators } from 'redux';
import { Alert, View } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { Text } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
import { Button } from 'react-native-paper';
import EditMyProfileScreen from '../screens/user-screens/EditMyProfileScreen';
import { getUser } from '../redux/actions/user-action';
import { useEffect } from 'react';
import { IAppState } from '../redux/initialState';


// import { CButton } from "../components/atoms"

const MyProfileStack = createStackNavigator();

/**
 * Just a wrapper for My Profile Screens
 */
function MyProfileStackNavigator() {
    const navigation = useNavigation();
    return (
        <MyProfileStack.Navigator initialRouteName={Screens.PROFILE} mode="modal" >
            <MyProfileStack.Screen name={Screens.PROFILE} component={MyProfileScreen} options={{
                headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack()} />
            }} />
            <MyProfileStack.Screen name={Screens.EDIT_PROFILE} component={EditMyProfileScreen} />
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
function ProfileDrawerNavigator({ signOut, userFetch, isAnonymous, anonymousRedirect }: any) {
    useEffect(() => {
        if (!isAnonymous) userFetch()
    }, [isAnonymous])
    const navigation = useNavigation();
    const signOutRoutine = () => {
        if (isAnonymous) {
            anonymousRedirect(); // no api call needed
        }
        else {
            signOut(); // logout a signed in user with api call
        }
    }
    return (
        <ProfileDrawer.Navigator
            drawerType="slide"
            initialRouteName={Screens.APP}
            drawerContent={
                (props) => {
                    return (
                        <DrawerContentScrollView {...props}>
                            <DrawerItemList {...props} />
                            {/* <View>
                                <DrawerItem label="Profile" onPress={() => { navigation.navigate(Screens.PROFILE) }} />
                                <DrawerItem label="Settings" onPress={() => { navigation.navigate(Screens.SETTINGS) }} />
                            </View> */}
                            <DrawerItem label={isAnonymous ? "SignIn/SignUp" : "Sign Out"} style={{ backgroundColor: "#3F51B5" }} labelStyle={{ color: "#fffeee", fontSize: 15, fontWeight: "bold" }} onPress={signOutRoutine} />
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
            {!(isAnonymous) && <ProfileDrawer.Screen name={Screens.PROFILE} component={MyProfileStackNavigator} />}
            {!(isAnonymous) && <ProfileDrawer.Screen name={Screens.SETTINGS} component={SettingsStackNavigator} />}
        </ProfileDrawer.Navigator>
    )
}
function mapStateToProps(state: IAppState) {
    const { authState } = state;
    return {
        isSignedIn: authState.isSignedIn,
        isAnonymous: authState.anonymous
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userFetch: bindActionCreators(getUser, dispatch),
        signOut: bindActionCreators(signOut, dispatch),
        anonymousRedirect: bindActionCreators(logOut, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDrawerNavigator);