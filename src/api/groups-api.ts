import { Group, IGroup, IPost, Post } from 'node-rest-objects/dist/data/groups';
import safePromise from 'node-rest-objects/dist/rest/safe.promise';
import SearchRESTObject from 'node-rest-objects/dist/rest/search.rest.object';
import Reactotron from '../../dev/ReactotronConfig';
import { defaultRequest } from '../definitions/query-definitions';
import { loc } from '../definitions/ride-definitions';
import { TGAccess } from 'node-rest-objects/dist/data/groups/tg.access';
import * as APIUtils from '../api/api-utils';
import reactotron from '../../dev/ReactotronConfig';
import { showToast } from '../utils/Helpers';

export async function getAllGroups(request = defaultRequest,type:string='group') {
    try {
        const group: Group = new Group();
        const groupSro = new SearchRESTObject(group);
        if(!request.query){
            request.query={}
        }
        request.query={
            "$and":[
                request.query,
                {
                    "customAttributes.type":type
                }
            ]
        }
        groupSro.setRequest(request);
        Reactotron.log!("group-search-request", groupSro.request);
        await groupSro.search();
        Reactotron.log!("group-search-response", groupSro.response);
        return groupSro.response.result;
    }
    catch (error) {
        Reactotron.log!("Group-API: Error in group-search", error);
        throw error;
    }
}

const TIME_FLEXIBILITY = 1000 * 60 * 60 * 6;
export const LOCATION_DELTA = 0.03625;

function manipulateDate(date: Date, ms: number) {
    return new Date(date.getTime() + ms);
}

function buildPlanPlace(inp, loc: loc) {
    const { lat, lng } = loc;
    const bounds = [
        { lat: lat! + LOCATION_DELTA, lng: lng! + LOCATION_DELTA },
        { lat: lat! + LOCATION_DELTA, lng: lng! - LOCATION_DELTA },
        { lat: lat! - LOCATION_DELTA, lng: lng! + LOCATION_DELTA },
        { lat: lat! - LOCATION_DELTA, lng: lng! - LOCATION_DELTA },
    ];
    inp.address.raw = loc.raw.address;
    inp.gps = { lat, lng };
    inp.isFlexible = true;
    inp.flexibility = { bounds };
}

export async function createGroup(
    title: string,
    planOriginTime: Date,
    planOriginPlace: loc,
    planDestinationTime: Date,
    planDestinationPlace: loc,
    type:string='group'
) {
    try {

        const group: Group = new Group();
        // group.setDraft(request);
        group.data.title = title;

        group.data.plan.origin.time.isFlexible = true;
        group.data.plan.origin.time.timestamp = planOriginTime;
        group.data.plan.origin.time.flexibility = {
            early: manipulateDate(planOriginTime, -1 * TIME_FLEXIBILITY),
            late: manipulateDate(planOriginTime, TIME_FLEXIBILITY)
        };

        group.data.plan.destination.time.isFlexible = true;
        group.data.plan.destination.time.timestamp = planDestinationTime;
        group.data.plan.destination.time.flexibility = {
            early: manipulateDate(planDestinationTime, -1 * TIME_FLEXIBILITY),
            late: manipulateDate(planDestinationTime, TIME_FLEXIBILITY)
        };

        buildPlanPlace(group.data.plan.origin.place, planOriginPlace);
        buildPlanPlace(group.data.plan.destination.place, planDestinationPlace);

        group.data.preferences.automaticMembership = true;

        group.data.customAttributes={type};

        await safePromise(group.create());
        // Reactotron.log!("group: ",group);
        return group;
    } catch (error) {
        Reactotron.log!(`Group-API: error creating the group`, error);
        throw error;
    }
}

export async function createPost(group: IGroup, request: { title: string, body: string, media: string[] }) {
    try {
        const post: Post = new Post();
        post.data.groupId = group._id;
        post.data.title = request.title;
        post.data.body = request.body;
        post.data.media = request.media;
        await safePromise(post.create());
        return post;
    } catch (error) {
        Reactotron.log!(`Group-API: error creating the post`, error);
        throw error;
    }
}

export async function updatePost(postData: IPost, request: { title: string, body: string, media: string[] }) {
    try {
        const post: Post = new Post();
        post.data.groupId = postData.groupId;
        post.data._id = postData._id;
        post.data.title = request.title;
        post.data.media = request.media;
        post.data.body = request.body;
        await safePromise(post.update());
        return post
    } catch (error) {
        Reactotron.log!(`Group-API: error updating the post`, error);
        throw error;
    }
}


// export async function getAllPosts(sro: SearchRESTObject<IPost>, search = '', attributes?: string[]) {
//     try {
//         sro.request.query = {
//             $and: [
//                 { "active": true },
//                 APIUtils.testSearchUtil(["title", "body"], search)
//             ]
//         };
//         sro.request.sort = {
//             "lastModifiedAt": -1
//         }
//         sro.request.pageSize = 5;
//         if (attributes)
//             sro.request.attributes = attributes;
//         await safePromise(sro.search());
//         return sro.response.result;
//     }
//     catch (error) {
//         reactotron.log!("Groups API - post_list_fetch error", error);
//         showToast(`falied to load posts for this group`);
//     }
//     return [];
// }

export async function getGroupPosts(sro: SearchRESTObject<IPost>) {
    try {
        sro.request.pageSize = 100;
        reactotron.log!(`getGroupPosts:`,sro.data.data.groupId, sro.data);
        await safePromise(sro.search());
        return sro.response.result;
    } catch (error) {
        reactotron.log!("Groups API - post_list_fetch error", error);
        showToast(`falied to load posts for this group`);

    }
    return [];
}

export async function becomeGroupMember(groupId: string, userId: string) {
    try {
        const tgAccess = new TGAccess();
        tgAccess.data.groupId = groupId;
        tgAccess.data.userId.userId = userId;
        await safePromise(tgAccess.create());
        return tgAccess;
    } catch (error) {
        console.error(error);
    }
}

export async function isGroupMember(groupId: string, userId: string) {
    try {
        const tgAccess = new TGAccess();
        tgAccess.data.groupId = groupId;
        const sro = new SearchRESTObject(tgAccess);
        sro.request.query = {
            "userId": userId,
            "status": "accepted"
        };
        await safePromise(sro.search());
        return sro.response.resultSize === 0 ? false : sro.response.result[0];
    } catch (error) {
        console.error(error);
    }
}

export async function groupMemberList(groupId: string) {
    try {
        const tgAccess = new TGAccess();
        tgAccess.data.groupId = groupId;
        const sro = new SearchRESTObject(tgAccess);
        sro.request.query = {
            "status": "accepted"
        };
        await safePromise(sro.search());
        return sro.response.result;
    } catch (error) {
        console.error(error);
    }
}

export async function memberGroupList(userId: string) {
    try {
        const tgAccess = new TGAccess();
        const sro = new SearchRESTObject(tgAccess);
        sro.request.query = {
            "status": "accepted",
            "userId": userId
        };
        sro.request.pageSize = 1000;
        await safePromise(sro.search());
        const groupIdList = sro.response.result.map((tga) => tga.data.groupId);
        const group = new Group();
        const sroG = new SearchRESTObject(group);
        sroG.request.query = {
            "$or": [
                {
                    "_id": {
                        "$in": groupIdList
                    }
                },
                {
                    "author": userId
                }
            ]
        };
        sroG.request.pageSize = 1000;
        await safePromise(sroG.search());
        return sroG.response.result;
    } catch (error) {
        console.error(error);
    }
}