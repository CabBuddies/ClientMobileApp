import { IQueryListState,initialState } from "../initialState";
import { IQueryListAction, QueryListActions } from "../actions/action-types";

export default function queryListReducer(state = initialState.queryListState,action:IQueryListAction):IQueryListState{
    switch(action.type){
        case QueryListActions.FETCH_SUCCESS:
            return {...state,queries:action.payload,loading:action.loading};
        case QueryListActions.FETCH_LOADING:
            return {...state,loading:action.loading, queries:undefined};
        case QueryListActions.FETCH_ERROR:
            return {...state, error:action.error, queries:undefined, loading:action.loading};
        default:
            return state!;
    }
}