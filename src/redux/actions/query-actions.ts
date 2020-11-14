import { IQueryAction, QueryActions } from "./actionTypes"
import { ApiError } from "./common-types"
import Reactotron from "../../../dev/ReactotronConfig";
import RESTObject from "node-rest-objects/dist/rest/rest.object";
import { IQuery } from "node-rest-objects/dist/data/queries";
import { createQuery } from "../../api/query-api";

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
        error:error.message
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