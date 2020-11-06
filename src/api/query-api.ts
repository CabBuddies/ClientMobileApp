import { IQuery, Query } from "node-rest-objects/dist/data/queries";
import RESTObject from "node-rest-objects/dist/rest/rest.object";
import SearchRESTObject from "node-rest-objects/dist/rest/search.rest.object";
// const draftTemplateRequest = {
//     title:"What can I do about the BART being unavailable to San Jose",
//     tags: ["BART","Bay Area","San Jose","Public Transport"],
//     body: "It has been a while since the San Jose BART lines have been built,\
//     but the stations are still not open, what can I do about this? ",
// }
const defaultSearchRequest = {
    sort:{
        "createdAt":-1
    }
}
export async function getAllQueries(request = defaultSearchRequest){
    try{
        const query:Query = new Query();       
        const querySro= new SearchRESTObject(query);
        querySro.setRequest(request);
        await querySro.search();
        console.log("query-search-response",querySro.response);
        return querySro.response;
    }
    catch(error){
        console.log("Error in query-search",error);
    }
}
export async function createQuery(request,token?:string){
    try {
        const query:Query = new Query();
        query.setDraft(request);
        await query.create();
        // console.log("query: ",query);
        return query;    
    } catch (error) {
        console.error(`error creating the query`,error);
        throw error;
    }
    
}

