import { IQueryAction, QueryActions } from '../actions/action-types'
import {initialState, IQueryState} from '../initialState';

export default function queryReducer(state = initialState.queryState, action:IQueryAction):IQueryState {
    switch(action.type) {
        case QueryActions.LOADING:
            return {...state,query:undefined,loading:action.loading};
        case QueryActions.FETCH_SUCCESS:
            return {...state, query:action.payload,loading:action.loading};
        case QueryActions.FETCH_ERROR:
            return {...state,error:action.error,query:undefined,loading:action.loading};
        case QueryActions.CREATE:
            return {...state, query:action.payload,loading:action.loading};
        case QueryActions.FAILURE:
            return {...state,error:action.error,query:undefined,loading:action.loading};
        case QueryActions.DRAFT:
            return {...state, query:action.payload?.data,loading:action.loading};
        case QueryActions.UP_VOTE:
            return state!;
        case QueryActions.DOWN_VOTE:
            return state!;
        default:
            return state!;
    }

}