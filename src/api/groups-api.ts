import { Group, IGroup, Post } from 'node-rest-objects/dist/data/groups';
import safePromise from 'node-rest-objects/dist/rest/safe.promise';
import SearchRESTObject from 'node-rest-objects/dist/rest/search.rest.object';
import Reactotron from '../../dev/ReactotronConfig';
import { defaultRequest } from '../definitions/query-definitions';
import { loc } from '../definitions/ride-definitions';

export async function getAllGroups(request = defaultRequest) {
    try {
        const group: Group = new Group();
        const groupSro = new SearchRESTObject(group);
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

const TIME_FLEXIBILITY = 1000*60*60*6;
const LOCATION_DELTA = 0.03625;

function manipulateDate(date:Date,ms:number){
    return new Date(date.getTime()+ms);
}

function buildPlanPlace(inp,loc:loc){
    const {lat,lng} = loc;
    const bounds = [
        {lat:lat!+LOCATION_DELTA,lng:lng!+LOCATION_DELTA},
        {lat:lat!+LOCATION_DELTA,lng:lng!-LOCATION_DELTA},
        {lat:lat!-LOCATION_DELTA,lng:lng!+LOCATION_DELTA},
        {lat:lat!-LOCATION_DELTA,lng:lng!-LOCATION_DELTA},
    ];
    const addresss:any={};
    inp.gps={lat,lng};
    inp.isFlexible=true;
    inp.flexibility={bounds};
}

export async function createGroup(
    title: string,
    planOriginTime: Date,
    planOriginPlace: loc,
    planDestinationTime: Date,
    planDestinationPlace: loc
    ) {
    try {

        const group: Group = new Group();
        // group.setDraft(request);
        group.data.title = title;
        
        group.data.plan.origin.time.isFlexible=true;
        group.data.plan.origin.time.timestamp=planOriginTime;
        group.data.plan.origin.time.flexibility={
            early:manipulateDate(planOriginTime,-1*TIME_FLEXIBILITY),
            late:manipulateDate(planOriginTime,TIME_FLEXIBILITY)
        };

        group.data.plan.destination.time.isFlexible=true;
        group.data.plan.destination.time.timestamp=planDestinationTime;
        group.data.plan.destination.time.flexibility={
            early:manipulateDate(planDestinationTime,-1*TIME_FLEXIBILITY),
            late:manipulateDate(planDestinationTime,TIME_FLEXIBILITY)
        };

        buildPlanPlace(group.data.plan.origin.place,planOriginPlace);
        buildPlanPlace(group.data.plan.destination.place,planDestinationPlace);
        
        await safePromise(group.create());
        // Reactotron.log!("group: ",group);
        return group;
    } catch (error) {
        Reactotron.log!(`Group-API: error creating the group`, error);
        throw error;
    }
}

export async function createPost(group: IGroup, request) {
    try {
        const post:Post =  new Post();
        post.data.groupId = group._id;
        post.data.title = request.title;
        post.data.body = request.body;
        await post.create();
        return post;
    } catch (error) {
        Reactotron.log!(`Query-API: error creating the response`, error);
        throw error;
    }
}

export async function getAllPosts(group:IGroup){
    const post:Post =  new Post();
    post.data.groupId = group._id;
    const sro = new SearchRESTObject(post);
}