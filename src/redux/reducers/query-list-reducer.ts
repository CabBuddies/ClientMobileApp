import { IQueryListState,initialState } from "../initialState";
import { CoreActions, FetchActions, IQueryListAction, QueryListActions } from "../actions/action-types";
import { reducerGenerator } from "../generators";

const queryListActionHandler = guardedState => ({
    [FetchActions.BEGIN]: (state,action:IQueryListAction) => ({
        ...state,
        loading:action.loading,
        queries:undefined,
        error:undefined,
        errorType:undefined
    }),
    [FetchActions.SUCCESS]:(state,action:IQueryListAction) => ({
        ...state,
        loading:action.loading,
        queries:action.payload,
        error:undefined,
        errorType:undefined
    }),
    [FetchActions.FAILURE]:(state,action:IQueryListAction) => ({
        ...state,
        loading:action.loading,
        error:action.error,
        errorType:action.errorType,
        queries:undefined
    }),
});

export const queryListReducerGenerator = (coreName,screenInitialState?:any) => {
    const guardedState = initialState.queryListState || initialState;
    return reducerGenerator(
        coreName,
        queryListActionHandler(guardedState),
        guardedState
    )
}

const queryListReducer = queryListReducerGenerator(CoreActions.QUERY_LIST);

export default queryListReducer;

// export default function queryListReducer(state = initialState.queryListState,action:IQueryListAction):IQueryListState{
//     switch(action.type){
//         case QueryListActions.FETCH_SUCCESS:
//             return {...state,queries:action.payload,loading:action.loading};
//         case QueryListActions.FETCH_LOADING:
//             return {...state,loading:action.loading, queries:undefined};
//         case QueryListActions.FETCH_ERROR:
//             return {...state, error:action.error, queries:undefined, loading:action.loading};
//         default:
//             return state!;
//     }
// }