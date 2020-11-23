import { Comment, IQuery, Query } from "node-rest-objects/dist/data/queries";
import RESTObject from "node-rest-objects/dist/rest/rest.object";
import SearchRESTObject from "node-rest-objects/dist/rest/search.rest.object";
import Reactotron from "../../dev/ReactotronConfig";
import { QueryStatus } from "../redux/initialState";
import axios from 'axios';
import reactotron from "reactotron-react-native";
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
        Reactotron.log!(`error creating the query`,error);
        throw error;
    }
}

export async function createComment(query:RESTObject<IQuery>,request){
    try {
        let comment:Comment = new Comment();
        comment.data.body = request;
        comment.data.queryId=query.data._id;
        await comment.create();
        Reactotron.log!("comment-api-response",comment.data);
        return comment;
    } catch (error) {
        Reactotron.log!("Error creating comment",error);
        throw error;
    }
    
}

async function commentReader(cmnt){
    const comment = <Comment>cmnt;
    await comment.read();
    return comment;
}

export async function getAllComments(query:RESTObject<IQuery>,request){
    try{
        Reactotron.log!("GETTING ALL COMMENTS.......");
        let comment:Comment = new Comment();
        comment.data.queryId = query.data._id;
        const searchComment = new SearchRESTObject(comment);
        searchComment.setRequest(request);
        await searchComment.search();
        const cmnts = searchComment.response.result;
        const comments = await Promise.all(cmnts.map(commentReader));
        Reactotron.log!("comments",comments);
        return comments;
    }
    catch(error){
        reactotron.log!("comment fetch api error",error);
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

