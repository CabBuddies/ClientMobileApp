import { CommentActions, CoreActions, FetchActions, IQueryAction, QueryActions } from '../actions/action-types'
import { reducerGenerator } from '../generators';
import {initialState, IQueryState} from '../initialState';
import reduceReducers from "reduce-reducers";
import reactotron from 'reactotron-react-native';

const queryActionHandler = guardedState => ({
    [FetchActions.BEGIN]: (state,action:IQueryAction) => ({
        ...state,
        loading:action.loading,
        query:undefined,
        error:undefined,
        errorType:undefined
    }),
    [FetchActions.SUCCESS]:(state,action:IQueryAction) => ({
        ...state,
        loading:action.loading,
        query:action.payload,
        error:undefined,
        errorType:undefined
    }),
    [FetchActions.FAILURE]:(state,action:IQueryAction) => ({
        ...state,
        loading:action.loading,
        error:action.error,
        errorType:action.errorType
    }),
});

export const queryReducerGenerator = (coreName,screenInitialState?:any) => {
    const guardedState = initialState.queryState || initialState;
    return reducerGenerator(
        coreName,
        queryActionHandler(guardedState),
        guardedState
    )
}
const queryFetchReducer = queryReducerGenerator(CoreActions.QUERY_FETCH);
const queryCreateReducer = queryReducerGenerator(CoreActions.QUERY_CREATE);

const commentActionHandler = guardedState => ({
    [FetchActions.BEGIN]: (state,action:IQueryAction) => {
        if(action.type.startsWith("comment-create")){
            return {
                ...state,
                loading:action.loading,
                error:undefined,
                errorType:undefined
            }
        }
        return {
            ...state,
            loading:action.loading,
            comment:undefined,
            error:undefined,
            errorType:undefined
        }
        
    },
    [FetchActions.SUCCESS]:(state,action:IQueryAction) => {
        if(action.type.startsWith("comment-create")){
            return {
                ...state,
                loading:action.loading,
                comment:[action.payload,...state.comment],
                error:undefined,
                errorType:undefined
            }
        }
        return {
            ...state,
            loading:action.loading,
            comment:action.payload,
            error:undefined,
            errorType:undefined
        }
            
    },
    [FetchActions.FAILURE]:(state,action:IQueryAction) => ({
        ...state,
        loading:action.loading,
        error:action.error,
        errorType:action.errorType
    }),
});
export const commentReducerGenerator = (coreName,screenInitialState?:any) => {
    const guardedState = initialState.queryState || initialState;
    return reducerGenerator(
        coreName,
        commentActionHandler(guardedState),
        guardedState
    )
}
const commentFetchReducer = commentReducerGenerator(CoreActions.COMMENT_FETCH);
const commentCreateReducer = commentReducerGenerator(CoreActions.COMMENT_CREATE);

const queriesReducer = reduceReducers(initialState.queryState,queryFetchReducer,queryCreateReducer);
const commentsReducer = reduceReducers(initialState.queryState,commentFetchReducer,commentCreateReducer);


const queryReducer = reduceReducers(initialState.queryState,queriesReducer,commentsReducer);

export default queryReducer;

// export default function queryReducer(state = initialState.queryState, action:IQueryAction):IQueryState {
//     switch(action.type) {
//         case QueryActions.LOADING:
//             return {...state,query:undefined,loading:action.loading};
//         case QueryActions.FETCH_SUCCESS:
//             return {...state, query:action.payload,loading:action.loading,error:undefined};
//         case QueryActions.FETCH_ERROR:
//             return { ...state, error:action.error, query:undefined, loading:action.loading, errorType:action.errorType};
//         case QueryActions.CREATE:
//             return {...state, query:action.payload,loading:action.loading};
//         case QueryActions.FAILURE:
//             return {...state,error:action.error, errorType:action.errorType,query:undefined,loading:action.loading};
        
//         case CommentActions.CREATE_FAILURE:
//             return {...state,loading:action.loading,error:action.error,errorType:action.errorType};
//         case CommentActions.CREATE_SUCCESS:
//             return {...state,loading:action.loading,comment:[action.payload.comment,...state.comment]};
//         case QueryActions.LOAD_COMMENTS:
//             return {...state,loading:action.loading,comment:action.payload.comment};
//         case CommentActions.UPDATE_SUCCESS:
//             return {...state,query:action.payload.query,loading:action.loading,
//                     comment:action.payload.comment, error:undefined, errorType:undefined};
//         case CommentActions.UPDATE_FAILURE:
//             return {...state,loading:action.loading,error:action.error};
//         case CommentActions.DELETE_FAILURE:
//             return {...state,loading:action.loading,error:action.error};
//         case CommentActions.DELETE_SUCCESS:
//             return {...state,query:action.payload.query,loading:action.loading,
//                 comment:undefined,error:undefined,errorType:undefined};
//         case CommentActions.FETCH_FAILURE:
//             return {...state, error:action.error,loading:action.loading,errorType:action.errorType };


//         case QueryActions.DRAFT:
//             return {...state, query:action.payload?.data,loading:action.loading};
//         case QueryActions.UP_VOTE:
//             return state!;
//         case QueryActions.DOWN_VOTE:
//             return state!;
//         default:
//             return state!;
//     }

// }