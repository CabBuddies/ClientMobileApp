import { NavigationProp } from "@react-navigation/native";
import { IGroup, IPost } from "node-rest-objects/dist/data/groups";
import { IResponse, Query } from "node-rest-objects/dist/data/queries";
import { IUser } from "node-rest-objects/dist/data/user-management";
import { loc } from "../definitions/ride-definitions";
import { Navs, Screens } from "../definitions/screen-definitions";
import { showToast } from "./Helpers";

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
export function showGroupView(navigation:typeNav,groupData:IGroup){
    navigation.navigate(Navs.APP, {
        screen: Navs.RIDE,
        params: {
            screen: Screens.GROUP_VIEW,
            params:{
                groupData:groupData
            }
        }
    })
}   
export function goToGroups(navigation) {
    navigation.navigate(Navs.APP, {
        screen: Navs.RIDE,
        params: {
            screen: Screens.GROUP_VIEW
        }
    })
}

export function openPostCreateForm(navigation:typeNav,data:IGroup |IPost,isUpdate=false){
    // showToast("exec entered nav-utils open-post create form");
    navigation.navigate(Navs.APP, {
        screen: Navs.RIDE,
        params: {
            screen:Screens.POST_CREATE,
                params:{
                    groupData:data,
                    isUpdate:isUpdate
                }
        }
    })
}

export function showGroupPost(navigation:typeNav,data:IPost){
    navigation.navigate(Navs.APP, {
        screen: Navs.RIDE,
        params: {
            screen:Screens.POST_VIEW,
                params:{
                    data:data,
                }
        }
    })
}

export function showUserFollowers() {
}
export function showUserFollowing() {
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