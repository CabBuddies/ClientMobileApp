/**
 * ProfileNavigator - main navigator which holds entire app navigation.
 */
import React from 'react';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Navs, Screens } from "../definitions/screen-definitions";
import MyProfileScreen from '../screens/user-screens/MyProfileScreen';
import AppTabsNavigator from './HomeNavigator';
import { connect } from 'react-redux';
import { logOut, signOut } from '../redux/actions/auth-action';
import { bindActionCreators } from 'redux';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { getUser } from '../redux/actions/user-action';
import { useEffect } from 'react';
import { IAppState } from '../redux/initialState';
import RelationsTopTabNavigator from './RelationsNavigator';
import UserSearchScreen from '../screens/user-screens/UserSearchScreen';
import UserProfileScreen from '../screens/user-screens/UserProfileScreen';

const MyProfileStack = createStackNavigator();

/**
 * Just a wrapper for My Profile Screens
 */
function ProfileStackNavigator() {
    const navigation = useNavigation();
    return (
        <MyProfileStack.Navigator initialRouteName={Screens.MY_PROFILE} >
            <MyProfileStack.Screen name={Screens.MY_PROFILE} component={MyProfileScreen} />
            <MyProfileStack.Screen name={Screens.USER_SEARCH} component={UserSearchScreen} />
            <MyProfileStack.Screen name={Screens.USER_PROFILE} component={UserProfileScreen} />
            <MyProfileStack.Screen name={Screens.USER_RELATIONS} component={RelationsTopTabNavigator} />
        </MyProfileStack.Navigator>
    );
}

export default ProfileStackNavigator;

// const ProfileDrawer = createDrawerNavigator();

// /**
//  * parent of all the post-auth application screens
//  */
// function ProfileDrawerNavigator({ signOut, userFetch, isAnonymous, anonymousRedirect }: any) {
//     useEffect(() => {
//         if (!isAnonymous) userFetch()
//     }, [isAnonymous])
//     const navigation = useNavigation();
//     const signOutRoutine = () => {
//         if (isAnonymous) {
//             anonymousRedirect(); // no api call needed
//         }
//         else {
//             signOut(); // logout a signed in user with api call
//         }
//     }
//     return (
//         <ProfileDrawer.Navigator
//             drawerType="slide"
//             initialRouteName={Navs.APP}
//             drawerContent={
//                 (props) => {
//                     return (
//                         <DrawerContentScrollView {...props}>
//                             <DrawerItemList {...props} />
//                             <DrawerItem
//                                 label={isAnonymous ? "SignIn/SignUp" : "Sign Out"}
//                                 style={{ backgroundColor: "#3F51B5" }}
//                                 labelStyle={{ color: "#fffeee", fontSize: 15, fontWeight: "bold" }}
//                                 onPress={signOutRoutine}
//                             />
//                         </DrawerContentScrollView>
//                     )
//                 }
//             }
//             drawerContentOptions={
//                 {
//                     labelStyle: { fontSize: 15 }
//                 }
//             }
//         >
//             <ProfileDrawer.Screen name={Navs.APP} component={AppTabsNavigator} />
//             {!(isAnonymous) && <ProfileDrawer.Screen name={Navs.PROFILE} component={MyProfileStackNavigator} />}
//         </ProfileDrawer.Navigator>
//     )
// }

// function mapStateToProps(state: IAppState) {
//     const { authState } = state;
//     return {
//         isSignedIn: authState.isSignedIn,
//         isAnonymous: authState.anonymous
//     };
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         userFetch: bindActionCreators(getUser, dispatch),
//         signOut: bindActionCreators(signOut, dispatch),
//         anonymousRedirect: bindActionCreators(logOut, dispatch)
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ProfileDrawerNavigator);