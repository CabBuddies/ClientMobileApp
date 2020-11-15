import { IQuery } from "node-rest-objects/dist/data/queries";
import RESTObject from "node-rest-objects/dist/rest/rest.object";
import Reactotron from "reactotron-react-native";
import { getAllQueries,createQuery } from "../../api/query-api";
import { IQueryAction, IQueryListAction, QueryListActions, QueryActions } from "./action-types";
import { ApiError } from "./common-types";


export function loadingQueryList():IQueryListAction{
    return {
        type:QueryListActions.FETCH_LOADING,
        loading:true
    }
}

export function successQueryList(data):IQueryListAction{
    return {
        type:QueryListActions.FETCH_SUCCESS,
        loading:false,
        payload:data
    }
}

export function failureQueryList(error:ApiError):IQueryListAction{
    return {
        type:QueryListActions.FETCH_ERROR,
        loading:false,
        error:error.message
    }
}



export function fetchAllQueries(requestData){
    Reactotron.log!("In query-list thunk");
    return async dispatch => {
        dispatch(loadingQueryList());

        getAllQueries(requestData)
        .then(response => {
            Reactotron.log!("all-queries-success",response);
            dispatch(successQueryList(response));
        }).catch(error => {
            Reactotron.log!("all-queries-error",error);
            dispatch(failureQueryList(error));
        })
    }
}


