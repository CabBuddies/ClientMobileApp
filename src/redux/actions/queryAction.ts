import Reactotron from "reactotron-react-native";
import { getAllQueries } from "../../api/query-api";
import { IQueryAction, IQueryListAction, QueryListActions, QueryActions } from "./actionTypes";
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

export function fetchAllQueries(requestData){
    Reactotron.log!("In query-list thunk");
    return dispatch => {
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

// export function fetchQuery(requestData){
//     Reactotron.log!("In query-list thunk");
//     return dispatch => {
//         dispatch(loadingQueryList());

//         getAllQueries(requestData)
//         .then(response => {
//             Reactotron.log!("all-queries-success",response);
//             dispatch(successQueryList(response));
//         }).catch(error => {
//             Reactotron.log!("all-queries-error",error);
//             dispatch(failureQueryList(error));
//         })
//     }
// }
