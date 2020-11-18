import { CommentActions, IQueryAction, QueryActions } from "./action-types"
import { ApiError } from "./common-types"
import Reactotron from "../../../dev/ReactotronConfig";
import RESTObject from "node-rest-objects/dist/rest/rest.object";
import { IQuery } from "node-rest-objects/dist/data/queries";
import { createComment, createQuery, getAllComments } from "../../api/query-api";
import { ErrorType } from "../initialState";

export function loadingQuery():IQueryAction{
    return {
        type:QueryActions.LOADING,
        loading:true
    }
}
export function successQuery(data):IQueryAction{
    return {
        type:QueryActions.FETCH_SUCCESS,
        loading:false,
        payload:data
    }
}
export function failureQuery(error:ApiError):IQueryAction{
    return {
        type:QueryActions.FETCH_SUCCESS,
        loading:false,
        error:error.message,
        errorType:ErrorType.QUERY
    }
}

export function fetchQuery(query:RESTObject<IQuery>){
    Reactotron.log!("In query-list thunk");
    return async dispatch => {
        dispatch(loadingQuery());
       await query.read()
       .then(() => {
           Reactotron.log!("query-read-successful");
           dispatch(successQuery(query))
       }).catch(error => {
        dispatch(failureQuery(error))
       })
    }
}

function createQueryFailure(error:ApiError){
    return {
        type:QueryActions.FAILURE,
        error:error.message,
        loading:false,
        errorType:ErrorType.QUERY
    }
}
function createQuerySuccess(data){
    return {
        type:QueryActions.CREATE,
        loading:false,
        payload:data
    }
}

export function writeQuery(data){
    return async dispatch => {
        createQuery(data)
        .then(response => {
            Reactotron.log!("query-create-response",response);
            dispatch(createQuerySuccess(response))
        }).catch(error => {
            Reactotron.error!("query-creation-failure",error);
            dispatch(createQueryFailure(error))
        })
    }
}

export function commentCreateFailure(error:ApiError){
    return {
        type:CommentActions.CREATE_FAILURE,
        error:error.message,
        loading:false,
        errorType:ErrorType.COMMENT
    }
}

export function commentCreateSuccess(data){
    return {
        type:CommentActions.CREATE_SUCCESS,
        loading:false,
        payload:{
            comment:data
        }
    }
}

export function commentLoading(){
    return {
        type:QueryActions.LOADING,
        loading:true
    }
}

export function writeComment(query,data){
    return async dispatch => {
        createComment(query,data)
        .then(response => {
            dispatch(commentCreateSuccess(response));
        }).catch(error => {
            dispatch(commentCreateFailure(error));
        })
    }
}

function loadCommentsSuccess(data){
    return{
        type:QueryActions.LOAD_COMMENTS,
        loading:false,
        payload:{
            comment:data
        }
    }
}

function loadCommentFailure(error:ApiError){
    return {
        type:CommentActions.FETCH_FAILURE,
        loading:false,
        error:error.message,
        errorType:ErrorType.COMMENT
    }
}

export function loadComments(query,req){
    return async dispatch => {
        getAllComments(query,req)
        .then(response => {
            Reactotron.log!("loading comments successful",response);
            dispatch(loadCommentsSuccess(response));
        })
        .catch(error => {
            Reactotron.log!("loading comments error",error);
            dispatch(loadCommentFailure(error));
        })
    }
}