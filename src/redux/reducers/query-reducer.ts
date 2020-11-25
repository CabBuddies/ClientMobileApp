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
    [FetchActions.SUCCESS]:(state,action:IQueryAction) => {
        if(action.type.startsWith("query-delete")){
            return {
                ...state,
                loading:action.loading,
                query:undefined,
                error:undefined,
                errorType:undefined
            }
        }
        return {
            ...state,
            loading:action.loading,
            query:action.payload,
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
        else if(action.type.startsWith("comment-delete")){
            let comments:Array<any> = state.comment;
            let deletedComment = action.payload;
            comments = comments.filter(obj => obj.data._id !== deletedComment.data._id);
            return {
                ...state,
                loading:action.loading,
                comment:comments,
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

const responseActionHandler = guardedState => ({
    [FetchActions.BEGIN]: (state,action:IQueryAction) => {
        if(action.type.startsWith("response-create")){
            return {
                ...state,
                loading:action.loading,
                error:undefined,
                errorType:undefined
            }
        }
        else if(action.type.startsWith("comment-delete")){
            let responses:Array<any> = state.comment;
            let deletedResponse = action.payload;
            responses = responses.filter(obj => obj.data._id !== deletedResponse.data._id);
            return {
                ...state,
                loading:action.loading,
                response:responses,
                error:undefined,
                errorType:undefined
            }
        }
        return {
            ...state,
            loading:action.loading,
            response:undefined,
            error:undefined,
            errorType:undefined
        }
    },
    [FetchActions.SUCCESS]:(state,action:IQueryAction) => {
        if(action.type.startsWith("response-create")){
            return {
                ...state,
                loading:action.loading,
                response:[action.payload,...state.response],
                error:undefined,
                errorType:undefined
            }
        }
        return {
            ...state,
            loading:action.loading,
            response:action.payload,
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

export const genReducerGenerator = (coreName,actionHandler) => {
    const guardedState = initialState.queryState || initialState;
    return reducerGenerator(
        coreName,
        actionHandler(guardedState),
        guardedState
    )
}
// export const queryReducerGenerator = (coreName,screenInitialState?:any) => {
//     const guardedState = initialState.queryState || initialState;
//     return reducerGenerator(
//         coreName,
//         queryActionHandler(guardedState),
//         guardedState
//     )
// }
// export const commentReducerGenerator = (coreName,screenInitialState?:any) => {
//     const guardedState = initialState.queryState || initialState;
//     return reducerGenerator(
//         coreName,
//         commentActionHandler(guardedState),
//         guardedState
//     )
// }
// export const responseReducerGenerator = (coreName,screenInitialState?:any) => {
//     const guardedState = initialState.queryState || initialState;
//     return reducerGenerator(
//         coreName,
//         responseActionHandler(guardedState),
//         guardedState
//     )
// }
enum GenMode{
    QUERY = "query",
    RESPONSE="response",
    COMMENT = "comment"
}
function generateReducers(mode:GenMode){
    switch(mode){
        case GenMode.QUERY:
            return[
                genReducerGenerator(CoreActions.QUERY_FETCH,queryActionHandler),
                genReducerGenerator(CoreActions.QUERY_CREATE,queryActionHandler),
                genReducerGenerator(CoreActions.QUERY_UPDATE,queryActionHandler),
                genReducerGenerator(CoreActions.QUERY_DELETE,queryActionHandler)
            ];
        case GenMode.COMMENT:
            return [
                genReducerGenerator(CoreActions.COMMENT_FETCH,commentActionHandler),
                genReducerGenerator(CoreActions.COMMENT_CREATE,commentActionHandler),
                genReducerGenerator(CoreActions.COMMENT_UPDATE,commentActionHandler),
                genReducerGenerator(CoreActions.COMMENT_DELETE,commentActionHandler)
            ];
        case GenMode.RESPONSE:
            return [
                genReducerGenerator(CoreActions.RESPONSE_FETCH,responseActionHandler),
                genReducerGenerator(CoreActions.RESPONSE_CREATE,responseActionHandler),
                genReducerGenerator(CoreActions.RESPONSE_UPDATE,responseActionHandler),
                genReducerGenerator(CoreActions.RESPONSE_DELETE,responseActionHandler)
            ];
    }
}
// const queryFetchReducer = queryReducerGenerator(CoreActions.QUERY_FETCH);
// const queryCreateReducer = queryReducerGenerator(CoreActions.QUERY_CREATE);
// const commentFetchReducer = commentReducerGenerator(CoreActions.COMMENT_FETCH);
// const commentCreateReducer = commentReducerGenerator(CoreActions.COMMENT_CREATE);
// const responseFetchReducer = responseReducerGenerator(CoreActions.RESPONSE_FETCH);
// const responseCreateReducer= responseReducerGenerator(CoreActions.RESPONSE_CREATE);

const queryReducers = generateReducers(GenMode.QUERY);
const commentReducers = generateReducers(GenMode.COMMENT);
const responseReducers = generateReducers(GenMode.RESPONSE);




const queriesReducer = reduceReducers(initialState.queryState,...queryReducers);
const commentsReducer = reduceReducers(initialState.queryState,...commentReducers);
const responseReducer = reduceReducers(initialState.queryState,...responseReducers);


const queryReducer = reduceReducers(initialState.queryState,queriesReducer,commentsReducer,responseReducer);

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