import { CommentActions, CoreActions, IQueryAction, QueryActions } from "./action-types"
import { apiActionGenerator, ApiError } from "./common-types"
import Reactotron from "../../../dev/ReactotronConfig";
import RESTObject from "node-rest-objects/dist/rest/rest.object";
import { IQuery } from "node-rest-objects/dist/data/queries";
import { createComment, createQuery, getAllComments } from "../../api/query-api";
import { ErrorType } from "../initialState";

// export function loadingQuery():IQueryAction{
//     return {
//         type:QueryActions.LOADING,
//         loading:true
//     }
// }
// export function successQuery(data):IQueryAction{
//     return {
//         type:QueryActions.FETCH_SUCCESS,
//         loading:false,
//         payload:data
//     }
// }
// export function failureQuery(error:ApiError):IQueryAction{
//     return {
//         type:QueryActions.FETCH_ERROR,
//         loading:false,
//         error:error.message,
//         errorType:ErrorType.QUERY
//     }
// }

const queryFetchActions = apiActionGenerator(CoreActions.QUERY_FETCH);
const queryCreateActions = apiActionGenerator(CoreActions.QUERY_CREATE);
const commentCreateActions = apiActionGenerator(CoreActions.COMMENT_CREATE);
const commentFetchActions = apiActionGenerator(CoreActions.COMMENT_FETCH);

export function fetchQuery(query:RESTObject<IQuery>){
    Reactotron.log!("In query-list thunk",query);
    return async dispatch => {
        dispatch(queryFetchActions.createLoadingAction());
       await query.read()
       .then(() => {
           Reactotron.log!("query-read-successful");
           dispatch(queryFetchActions.createSuccessAction(query))
       }).catch(error => {
        dispatch(queryFetchActions.createFailureAction(error));
       })
    }
}

export function writeQuery(data){
    return async dispatch => {
        dispatch(queryCreateActions.createLoadingAction())
        createQuery(data)
        .then(response => {
            Reactotron.log!("query-create-response",response);
            dispatch(queryCreateActions.createSuccessAction(response))
        }).catch(error => {
            Reactotron.error!("query-creation-failure",error);
            dispatch(queryCreateActions.createFailureAction(error))
        })
    }
}


export function writeComment(query,data){
    return async dispatch => {
        dispatch(commentCreateActions.createLoadingAction());
        createComment(query,data)
        .then(response => {
            dispatch(commentCreateActions.createSuccessAction(response));
        }).catch(error => {
            dispatch(commentCreateActions.createFailureAction(error));
        })
    }
}

// function loadCommentsSuccess(data){
//     return{
//         type:QueryActions.LOAD_COMMENTS,
//         loading:false,
//         payload:{
//             comment:data
//         }
//     }
// }

// function loadCommentFailure(error:ApiError){
//     return {
//         type:CommentActions.FETCH_FAILURE,
//         loading:false,
//         error:error.message,
//         errorType:ErrorType.COMMENT
//     }
// }

export function loadComments(query,req){
    return async dispatch => {
        dispatch(commentFetchActions.createLoadingAction());
        getAllComments(query,req)
        .then(response => {
            Reactotron.log!("loading comments successful",response);
            dispatch(commentFetchActions.createSuccessAction(response));
        })
        .catch(error => {
            Reactotron.log!("loading comments error",error);
            dispatch(commentFetchActions.createLoadingAction(error));
        })
    }
}

// export function commentCreateFailure(error:ApiError){
//     return {
//         type:CommentActions.CREATE_FAILURE,
//         error:error.message,
//         loading:false,
//         errorType:ErrorType.COMMENT
//     }
// }

// export function commentCreateSuccess(data){
//     return {
//         type:CommentActions.CREATE_SUCCESS,
//         loading:false,
//         payload:{
//             comment:data
//         }
//     }
// }

// export function commentLoading(){
//     return {
//         type:QueryActions.LOADING,
//         loading:true
//     }
// }