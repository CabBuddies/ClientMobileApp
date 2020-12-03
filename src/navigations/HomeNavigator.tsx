/**
 * AppNavigator - let's user navigate through the different services like, Ride, Package Delivery, Chat
 */
import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatNavigator from './ChatNavigator';
import QueryNavigatorScreen from './QueryNavigator';
import { Navs, Screens } from "../definitions/screen-definitions";
import { Icon } from 'native-base';
import RideStackNavigator from './RideStackNavigator';
import { IconType } from '../definitions/common-definitions';
import PDStackNavigator from './PDStackNavigator';
import { FunctionComponent } from 'react';
import { ComponentClass } from 'react';
import reactotron from 'reactotron-react-native';
import MyProfileStackNavigator from './ProfileStackNavigator';
import { bindActionCreators } from 'redux';
import { logOut, signOut } from '../redux/actions/auth-action';
import { getUser } from '../redux/actions/user-action';
import { IAppState } from '../redux/initialState';
import { connect } from 'react-redux';

const AppNavigator = createBottomTabNavigator();

function HomeNavigator({ signOut, userFetch, isAnonymous, anonymousRedirect }: any) {

    useEffect(() => {
        reactotron.log!('HomeNavigator', 'loaded fully');
        if (!isAnonymous) userFetch()
    }, [isAnonymous])

    type tabMapValue = {
        props: {
            options: {
                title: string,
                tabBarLabel?: string,
            },
            name: string,
            component: ComponentClass<any, any> | FunctionComponent<any>,
        },
        tabBarIcon: {
            name: string,
            type: IconType
        }
    }

    const tabMap: { [key: string]: tabMapValue } = {
        [Navs.RIDE]: {
            props: {
                options: {
                    title: Screens.RIDE,
                    tabBarLabel: Screens.RIDE,
                },
                name: Navs.RIDE,
                component: RideStackNavigator,
            },
            tabBarIcon: {
                name: 'ios-car',
                type: 'Ionicons'
            }
        },
        [Navs.PACKAGE_DELIVERY]: {
            props: {
                options: {
                    title: Screens.PACKAGE_DELIVERY,
                    tabBarLabel: Screens.PACKAGE_DELIVERY,
                },
                name: Navs.PACKAGE_DELIVERY,
                component: PDStackNavigator,
            },
            tabBarIcon: {
                name: 'box',
                type: 'Entypo'
            }
        },
        [Navs.GUIDE_ME]: {
            props: {
                options: {
                    title: Screens.GUIDE_ME,
                    tabBarLabel: Screens.GUIDE_ME,
                },
                name: Navs.GUIDE_ME,
                component: QueryNavigatorScreen,
            },
            tabBarIcon: {
                name: 'map-marker-question',
                type: 'MaterialCommunityIcons'
            }
        },
        [Navs.CHATS]: {
            props: {
                options: {
                    title: Screens.CHATS,
                    tabBarLabel: Screens.CHATS,
                },
                name: Navs.CHATS,
                component: ChatNavigator,
            },
            tabBarIcon: {
                name: 'ios-chatbubbles',
                type: 'Ionicons'
            }
        },
        [Navs.PROFILE]: {
            props: {
                options: {
                    title: Screens.ACCOUNT, // ONLYFOR - tab title purpose
                    // tabBarLabel: Screens.ACCOUNT,
                },
                name: Navs.PROFILE,
                component: MyProfileStackNavigator,
            },
            tabBarIcon: {
                name: 'account',
                type: 'MaterialCommunityIcons'
            }
        }
    }

    return (
        <AppNavigator.Navigator initialRouteName={Navs.RIDE} tabBarOptions={{
            keyboardHidesTabBar: true
        }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    const tabBarIcon = (tabMap[route.name] || tabMap[Navs.RIDE]).tabBarIcon;
                    reactotron.log!(route, route.name, tabBarIcon);
                    return <Icon {...tabBarIcon} />
                }
            })}
        >
            {
                Object.keys(tabMap).map((k) =>
                    <AppNavigator.Screen key={Date.now().toString()} {...tabMap[k].props} />
                )
            }

        </AppNavigator.Navigator>
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

export default connect(mapStateToProps,mapDispatchToProps)(HomeNavigator);