import { NavigationProp } from "@react-navigation/native";
import { IResponse, Query } from "node-rest-objects/dist/data/queries";
import { IUser } from "node-rest-objects/dist/data/user-management";
import { loc } from "../definitions/ride-definitions";
import { Navs, Screens } from "../definitions/screen-definitions";

type typeNav = NavigationProp<Record<string, object | undefined>, string, any, {}, {}>;

export function showUserProfile(navigation: typeNav, userData: IUser) {
    navigation.navigate(Navs.APP, {
        screen: Navs.PROFILE,
        params: {
            screen: Screens.USER_PROFILE,
            params: {
                user: userData
            }
        }
    });
}

export function showRidesNow(navigation: typeNav, fromLocation: loc, toLocation: loc) {
    navigation.navigate(Navs.APP, {
        screen: Navs.RIDE,
        params: {
            screen: Screens.GROUPS_SCREEN,
            params: {
                fromLocation,
                toLocation
            }
        }
    })
}

export function createTravelGroup(navigation: typeNav, fromLocation: loc, toLocation: loc) {
    navigation.navigate(Navs.APP, {
        screen: Navs.RIDE,
        params: {
            screen: Screens.CREATE_GROUP,
            params: {
                fromLocation,
                toLocation
            }
        }
    })
}
export function openResponseForm(navigation:typeNav,updateData?:IResponse){
    if(!updateData){
        navigation.navigate(Navs.APP, {
            screen: Navs.GUIDE_ME,
            params: {
                screen: Screens.RESPONSE_CREATE,
            }
        })
    }
    else{
        navigation.navigate(Navs.APP, {
            screen: Navs.GUIDE_ME,
            params: {
                screen: Screens.RESPONSE_CREATE,
                params:{
                    formData:updateData
                }
            }
        })
    }
}
export function goToQueryView(navigation:typeNav){
    navigation.navigate(Navs.APP, {
        screen: Navs.GUIDE_ME,
        params: {
            screen: Screens.QUERY_VIEW,
        }
    })
}
export function goToQueryListScreen(navigation:typeNav){
    navigation.navigate(Navs.APP, {
        screen: Navs.GUIDE_ME,
        params: {
            screen: Screens.GUIDE_ME,
        }
    })
}
export function showUserFollowers() {
}
export function showUserFollowing() {
}
export function openPostFullView() {
}
export function goToGroups() {
}
export function openDirectChat() {
}
export function showCreatedQuery() {
}
export function func() {
}
export function func2() {
}
export function showQueryFullView(navigation: typeNav, queryData) {
}