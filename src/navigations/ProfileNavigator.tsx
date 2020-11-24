/**
 * ProfileNavigator - main navigator which holds entire app navigation.
 */
import React from 'react';
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { Screens } from "../definitions/screen-definitions";
import MyProfileScreen from '../screens/user-screens/MyProfileScreen';
import SettingsScreen from '../screens/user-screens/SettingsScreen';
import AppTabsNavigator from './AppNavigator';
import { connect } from 'react-redux';
import { signOut } from '../redux/actions/auth-action';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import { CButton } from "../components/atoms"

const ProfileDrawer = createDrawerNavigator();
type SignOut = () => void

/**
 * parent of all the post-auth application screens
 */
function ProfileDrawerNavigator({ signOut }: any) {
    const navigation = useNavigation();
    return (
        <ProfileDrawer.Navigator initialRouteName={Screens.APP} drawerContent={
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

function mapDispatchToProps(dispatch) {
    return {
        signOut: bindActionCreators(signOut, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(ProfileDrawerNavigator);