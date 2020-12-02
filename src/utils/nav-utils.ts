import { NavigationProp } from "@react-navigation/native";
import { IUser } from "node-rest-objects/dist/data/user-management";
import { Navs, Screens } from "../definitions/screen-definitions";

type typeNav= NavigationProp<Record<string, object | undefined>, string, any, {}, {}>;

const NavScreenList = {
    [Navs.APP]:{
        [Navs.RIDE]:{},

    }
}

export function showUserProfile(navigation:typeNav, userData:IUser) {
    navigation.navigate(Screens.USER_PROFILE,{
        user:userData
    });
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

