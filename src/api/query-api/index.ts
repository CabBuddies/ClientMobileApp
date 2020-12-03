import { Comment, IQuery, IResponse, Query, Response, TQOpinion } from "node-rest-objects/dist/data/queries";
import RESTObject from "node-rest-objects/dist/rest/rest.object";
import SearchRESTObject from "node-rest-objects/dist/rest/search.rest.object";
import Reactotron from "../../../dev/ReactotronConfig";
import { QueryStatus } from "../../redux/initialState";
import axios from 'axios';
import reactotron from "reactotron-react-native";
import queryReducer from "../../redux/reducers/query-reducer";
import { OpinionType } from "../../definitions/common-definitions";
import * as APIUtils from './../api-utils';
import safePromise from 'node-rest-objects/dist/rest/safe.promise';
// const draftTemplateRequest = {
//     title:"What can I do about the BART being unavailable to San Jose",
//     tags: ["BART","Bay Area","San Jose","Public Transport"],
//     body: "It has been a while since the San Jose BART lines have been built,\
//     but the stations are still not open, what can I do about this? ",
// }
const defaultSearchRequest = {
    sort: {
        "createdAt": -1
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
// ------------------------------- FETCH APIs ------------------------------------------------
export async function getAllQueries(request = defaultSearchRequest) {
    try {
        // getDataSendRequestTest();
        const query: Query = new Query();
        const querySro = new SearchRESTObject(query);
        querySro.setRequest(request);
        Reactotron.log!("query-search-request", querySro.request);
        await querySro.search();
        Reactotron.log!("query-search-response", querySro.response);
        return querySro.response;
    }
    catch (error) {
        Reactotron.log!("Query-API: Error in query-search", error);
        throw error;
    }
}
export async function getAllResponses(query: Query, request) {
    try {
        const answer: Response = new Response();
        answer.setQueryId(query.data._id);
        const searchRestObject = new SearchRESTObject(answer);
        searchRestObject.setRequest(request);
        await searchRestObject.search();
        const preRead = searchRestObject.response.result;
        const answers = await Promise.all(preRead.map(responseReader));
        Reactotron.log!("answers", answers);
        return answers;
    } catch (error) {
        Reactotron.log!(`Query-API: Error getting responses queryId:${query.data._id}`, error);
        throw error;
    }
}
async function responseReader(resp) {
    const answer = <Response>resp;
    await answer.read(true);
    return answer;
}
async function commentReader(cmnt) {
    const comment = <Comment>cmnt;
    await comment.read();
    return comment;
}

export async function getAllComments(restObj: RESTObject<IQuery | IResponse>, request) {
    try {
        Reactotron.log!("GETTING ALL COMMENTS.......");
        let comment: Comment = new Comment();
        comment.data.queryId = restObj.data._id;
        const searchComment = new SearchRESTObject(comment);
        searchComment.setRequest(request);
        await searchComment.search();
        const cmnts = searchComment.response.result;
        const comments = await Promise.all(cmnts.map(commentReader));
        Reactotron.log!("comments", comments);
        return comments;
    }
    catch (error) {
        reactotron.log!("Query-API: comment fetch api error", error);
        throw error;
    }
}

// ------------------------------- CREATE APIs ------------------------------------------------
export async function createQuery(request) {
    try {
        const query: Query = new Query();
        // query.setDraft(request);
        query.data.published = request;
        query.setStatus("published");
        await query.create();
        // Reactotron.log!("query: ",query);
        return query;
    } catch (error) {
        Reactotron.log!(`Query-API: error creating the query`, error);
        throw error;
    }
}

export async function createComment(query: RESTObject<IQuery | IResponse>, request) {
    try {
        let comment: Comment = new Comment();
        comment.data.body = request;
        comment.data.queryId = query.data._id;
        await comment.create();
        Reactotron.log!("comment-api-response", comment.data);
        return comment;
    } catch (error) {
        Reactotron.log!("Query-API: Error creating comment", error);
        throw error;
    }
}

export async function createResponse(query: Query, request) {
    try {
        const response: Response = new Response();
        response.setQueryId(query.data._id);
        response.setPublished(request);
        response.setStatus("published");
        await response.create();
        // Reactotron.log!("response: ",response);
        return response;
    } catch (error) {
        Reactotron.log!(`Query-API: error creating the response`, error);
        throw error;
    }
}
// ------------------------------- UPDATE APIs ------------------------------------------------
export async function updateQuery(queryId:string, request) {
    try {
        Reactotron.log!("update-query-input-args",queryId,request);
        const query =  new Query();
        query.data._id = queryId;
        query.data.published = request;
        query.setStatus("published");
        Reactotron.log!("update-query-pre-obj",query);
        await query.update();
        Reactotron.log!("update-query-post-obj",query);
        return query;
    } catch (error) {
        Reactotron.log!(`Query-API: error updating the query`, error);
        throw error;
    }
}
export async function updateResponse(response: Response, request) {
    try {
        response.setPublished(request);
        response.setStatus("published");
        await response.update();
        // Reactotron.log!("response: ",response);
        return response;
    } catch (error) {
        Reactotron.log!(`Query-API: error updating the response`, error);
        throw error;
    }
}
export async function updateComment(comment: Comment, request) {
    try {
        comment.data.body = request;
        await comment.update();
        Reactotron.log!("comment-api-response", comment.data);
        return comment;
    } catch (error) {
        Reactotron.log!("Query-API: Error updating comment", error);
        throw error;
    }
}
// ------------------------------ DELETE APIs -------------------------------------------------------
export async function deleteQuery(query: Query) {
    try {
        await query.delete();
        return query;
    } catch (error) {
        Reactotron.log!(`Query-API: error deleting the query`, error);
        throw error;
    }
}
export async function deleteResponse(response: Response) {
    try {
        await response.delete();
        Reactotron.log!("deleted response", response);
        return response;
    } catch (error) {
        Reactotron.log!(`Query-API: error creating the query`, error);
        throw error;
    }
}
export async function deleteComment(comment: Comment) {
    try {
        await comment.delete();
        return comment;
    } catch (error) {
        Reactotron.log!(`Query-API: error creating the query`, error);
        throw error;
    }
}
// -------------------------------------------- Opinion ---------------------------------------------------
export async function createOpinion(restObj: RESTObject<IQuery | IResponse>, type: OpinionType) {
    try {
        let queryId;
        let responseId = '';
        const opinion = new TQOpinion();
        opinion.data.opinionType = type;
        if (restObj instanceof Response) {
            queryId = restObj.data.queryId;
            responseId = restObj.data._id;
            opinion.data.queryId = queryId;
            opinion.data.responseId = responseId;
        }
        else {
            queryId = restObj.data._id;
            opinion.data.queryId = queryId;
        }
        await opinion.create();
        const opinionMap = {};
        opinionMap[`${queryId};${responseId};${type}`] = opinion.data._id;
        return opinionMap;
    }
    catch (error) {
        reactotron.log!(`error creating the opinion`, error);
        throw error;
    }
}

export async function deleteOpinion(opinionId: string) {
    try {
        const opinion = new TQOpinion();
        opinion.data._id = opinionId;
        await opinion.delete();
        return opinionId;
    }
    catch (error) {
        reactotron.log!(`error deleting the opinion:`, opinionId, error);
        throw error;
    }
}


// -------- utils------


// const opinionMap:Record<string,string> = {};

// export function saveOpinion(queryId,responseId,opinionType,opinionId){
//     opinionMap[`${queryId};${responseId};${opinionType}`] = opinionId;
// }

export function getOpinion(opinionMap, queryId, responseId, opinionType): string {
    return opinionMap[`${queryId};${responseId};${opinionType}`];
}


async function searchQuery(sro:SearchRESTObject<IQuery>,search: string = '', attributes?: string[]) {
    try {
        // const query: Query = new Query();
        // const sro: SearchRESTObject<IQuery> = new SearchRESTObject(query);
        console.log(sro.request.query);
        sro.request.query={
           $and:[
               { "status":"published"},
               APIUtils.testSearchUtil(["published.title", "published.body"], search)
               // TODO - Add Tag Search
           ]
        };
        sro.request.sort = {
            "published.lastModifiedAt": -1
        };
        sro.request.pageSize = 5;
        if (attributes)
            sro.request.attributes = attributes;
        await safePromise(sro.search());
        sro.response.result.forEach((u) => console.log(u.data.published.title));
        return sro.response.result;
    } catch (error) {
        console.error(error);
    }
    return []
}

export async function liveQuerySuggestion(sro:SearchRESTObject<IQuery>,search: string): Promise<any[]> {
    try {
        return await searchQuery(sro,search, ['createdAt', 'published.title', 'published.tags', 'author', 'stats']);
    } catch (error) {
        console.error(error);
    }
    return [];
}