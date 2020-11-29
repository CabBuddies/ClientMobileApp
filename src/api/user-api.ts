import { IUser, User } from "node-rest-objects/dist/data/user-management";
import SearchRESTObject from "node-rest-objects/dist/rest/search.rest.object";
import * as APIUtils from './api-utils';


async function searchUser(search:string='',attributes?:string[]) {
    try {
        const user:User = new User();
        const sro:SearchRESTObject<IUser> = new SearchRESTObject(user);
        sro.request.query = APIUtils.testSearchUtil(["fullName","email"],search);
        console.log(sro.request.query);
        sro.request.sort = {
            "firstName":1
        };
        sro.request.pageSize=10;
        if(attributes)
            sro.request.attributes=attributes;
        await sro.search();
        sro.response.result.forEach((u)=>console.log(u.data.email));
        return sro.response.result as User[];
    } catch (error) {
    }
    return [];
}

async function liveUserSuggestion(search:string):Promise<any[]>{
    try {
        const sro = await searchUser(search,['firstName','lastName','userId','displayPicture'])||[];
        return sro
    } catch (error) {
        
    }
    return [];
}

export {
    searchUser,
    liveUserSuggestion
}