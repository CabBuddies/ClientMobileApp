import reactotron from "reactotron-react-native";
import { createOpinion } from "../../api/query-api";
import { OpinionType } from "../../definitions/common-definitions";
import { CoreActions } from "./action-types";
import { apiActionGenerator } from "./common-types";


const [
    opinionCreateActions,
    opinionDeleteActions,
    opinionFetchActions,
    opinionListActions
] = [ 
    apiActionGenerator(CoreActions.OPINION_CREATE),
    apiActionGenerator(CoreActions.OPINION_DELETE),
    apiActionGenerator(CoreActions.OPINION_FETCH),
    apiActionGenerator(CoreActions.OPINION_LIST)
    ];


export function createOpinionThunk(query,type:OpinionType){
    return async dispatch => {
        dispatch(opinionCreateActions.createLoadingAction());
        createOpinion(query,type)
        .then(response => {
            reactotron.log!("IN QUERY OPINION THUNK: response:",response);
            dispatch(opinionCreateActions.createSuccessAction(response));
        }).catch(error => {
            reactotron.log!("IN QUERY OPINION THUNK: response:",error);
            dispatch(opinionCreateActions.createFailureAction(error));
        });
    }
}
export function deleteOpinionThunk(response,type:OpinionType){
    return async dispatch => {
        dispatch(opinionDeleteActions.createLoadingAction());
        createOpinion(response,type)
        .then(response => {
            reactotron.log!("IN QUERY OPINION THUNK: response:",response);
            dispatch(opinionDeleteActions.createSuccessAction(response));
        }).catch(error => {
            reactotron.log!("IN QUERY OPINION THUNK: response:",error);
            dispatch(opinionDeleteActions.createFailureAction(error));
        });
    }
}
