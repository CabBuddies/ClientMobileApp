import { IQuery, Query } from "node-rest-objects/dist/data/queries";
import RESTObject from "node-rest-objects/dist/rest/rest.object";
import SearchRESTObject from "node-rest-objects/dist/rest/search.rest.object";
import Reactotron from "../../dev/ReactotronConfig";
import { QueryStatus } from "../redux/initialState";
import axios from 'axios';
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
// async function getDataSendRequestTest(){
//     axios({
//         method:'POST',
//         url:'https://webhook.site/503cd8d5-9e55-4385-9182-b502266f631f',
//         data:{
//             something:'special'
//         },
//         headers:{
//             'Content-Type': 'application/json'
//         }
//     })
// }
export async function getAllQueries(request = defaultSearchRequest){
    try{
        // getDataSendRequestTest();
        const query:Query = new Query();       
        const querySro= new SearchRESTObject(query);
        querySro.setRequest(request);
        Reactotron.log!("query-search-request",querySro.request);
        await querySro.search();
        Reactotron.log!("query-search-response",querySro.response);
        return querySro.response;
    }
    catch(error){
        Reactotron.log!("Error in query-search",{message:error});
        throw error;
    }
}
export async function createQuery(request){
    try {
        const query:Query = new Query();
        // query.setDraft(request);
        query.setPublished(request);
        query.setStatus("published");
        await query.create();
        // Reactotron.log!("query: ",query);
        return query;    
    } catch (error) {
        Reactotron.error!(`error creating the query`,error);
        throw error;
    }
}

// export async function getQuery(request){
//     try{
//         const query:Query = new Query();
        
//     }
//     catch(error){

//     }
// }

