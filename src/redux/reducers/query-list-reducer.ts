import { IQueryListState,initialState } from "./initialState";
import { IQueryListAction, QueryListActions } from "../actions/actionTypes";

export function queryListReducer(state = initialState.queryListState,action:IQueryListAction):IQueryListState{
    
    switch(action.type){
        case QueryListActions.FETCH_SUCCESS:
            return {...state,queries:action.payload};
        case QueryListActions.FETCH_LOADING:
            return {...state,loading:action.loading, queries:undefined};
        case QueryListActions.FETCH_ERROR:
            return {...state, error:action.error, queries:undefined};
        default:
            return state!;
    }
}