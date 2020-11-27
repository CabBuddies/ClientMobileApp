import { Group } from 'node-rest-objects/dist/data/groups';
import SearchRESTObject from 'node-rest-objects/dist/rest/search.rest.object';
import Reactotron from '../../dev/ReactotronConfig';
import { defaultRequest } from '../definitions/query-definitions';

async function getAllGroups(request = defaultRequest){
    try{
        const group:Group =  new Group();
        const groupSro = new SearchRESTObject(group);
        groupSro.setRequest(request);
        Reactotron.log!("group-search-request",groupSro.request);
        await groupSro.search();
        Reactotron.log!("group-search-response",groupSro.response);
        return groupSro.response;
    }
    catch(error){
        Reactotron.log!("Group-API: Error in group-search",error);
        throw error;
    }
}

export async function createGroup(request){
    try {
        const group:Group = new Group();
        // group.setDraft(request);
        group.setPublished(request);
        group.setStatus("published");
        await group.create();
        // Reactotron.log!("group: ",group);
        return group;    
    } catch (error) {
        Reactotron.log!(`Group-API: error creating the group`,error);
        throw error;
    }
}