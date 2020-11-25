import Reactotron from "reactotron-react-native";
import { getAllQueries } from "../../api/query-api";
import { CoreActions, IQueryListAction, QueryListActions } from "./action-types";
import { ApiError, apiActionGenerator } from "./common-types";


const queryListActions = apiActionGenerator(CoreActions.QUERY_LIST);

export function fetchAllQueries(requestData){
    Reactotron.log!("In query-list thunk");
    return async dispatch => {
        dispatch(queryListActions.createLoadingAction());

        getAllQueries(requestData)
        .then(response => {
            Reactotron.log!("all-queries-success",response);
            dispatch(queryListActions.createSuccessAction(response));
        }).catch(error => {
            Reactotron.log!("all-queries-error",{message:error});
            dispatch(queryListActions.createFailureAction(error));
        })
    }
}





// export function loadingQueryList():IQueryListAction{
    //     return {
    //         type:QueryListActions.FETCH_LOADING,
    //         loading:true
    //     }
    // }
    
    // export function successQueryList(data):IQueryListAction{
    //     return {
    //         type:QueryListActions.FETCH_SUCCESS,
    //         loading:false,
    //         payload:data
    //     }
    // }
    
    // export function failureQueryList(error:ApiError):IQueryListAction{
    //     return {
    //         type:QueryListActions.FETCH_ERROR,
    //         loading:false,
    //         error:error.message
    //     }
    // }