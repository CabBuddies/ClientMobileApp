import { UserRelation,IUserRelation } from "node-rest-objects/dist/data/user-management";
import SearchRESTObject from "node-rest-objects/dist/rest/search.rest.object";
import reactotron from "../../dev/ReactotronConfig";

export async function getRelation(userId:string){
    try {
        const userRelation:UserRelation = new UserRelation();
        const sro = new SearchRESTObject<IUserRelation>(userRelation);
        sro.request.query={
            followeeId:userId,
            status:'accepted'
        }
        reactotron.log!(userRelation);
        await sro.search();
        sro.response.result.forEach(u=>console.log(u.data))
        if(sro.response.resultSize>0)
            return sro.response.result[0] as UserRelation;
    } catch (error) {
        console.error(error);
    }
    return null;
}

export async function getAllRelations(
    status:'accepted'|'rejected'|'requested'|'blocked'|'any'='accepted',
    type:'followeeId'|'followerId'|'any'='any',
    ownUserId?:string) {
    try {
        const userRelation:UserRelation = new UserRelation();
        const sro = new SearchRESTObject<IUserRelation>(userRelation);
        sro.request.query={};
        if(status!=='any')
            sro.request.query['status']=status;
        if(type!=='any')
            sro.request.query[type]=ownUserId;
        sro.request.pageSize=100;
        reactotron.log!(userRelation);
        await sro.search();
        return sro.response.result.map((iur)=>{return iur as UserRelation;})
    } catch (error) {
        
    }
    return [];
}

export async function sendFollowRequest(userId:string) {
    try {
        const userRelation:UserRelation = new UserRelation();
        userRelation.data.followeeId.userId = userId;
        userRelation.data.status = 'requested';
        await userRelation.create();
        return userRelation;
    } catch (error) {
        console.error(error);
    }
    return null;
}

export async function unfollowUser(userId:string,relationId:string) {
    try {
        const userRelation:UserRelation = new UserRelation();
        userRelation.data.followeeId.userId = userId;
        userRelation.data._id = relationId;
        console.log(userRelation.data);
        await userRelation.delete();
        return userRelation;
    } catch (error) {
        console.error(error);
    }
    return null
}