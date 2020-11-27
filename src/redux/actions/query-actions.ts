import { CommentActions, CoreActions, IQueryAction, QueryActions } from "./action-types"
import { apiActionGenerator, ApiError, IFetchActionCreators } from "./common-types"
import Reactotron from "../../../dev/ReactotronConfig";
import RESTObject from "node-rest-objects/dist/rest/rest.object";
import { IQuery } from "node-rest-objects/dist/data/queries";
import { createComment, createQuery, createResponse, deleteComment, deleteQuery, deleteResponse, getAllComments, getAllResponses, updateComment, updateQuery } from "../../api/query-api";
import { ErrorType } from "../initialState";

// export function loadingQuery():IQueryAction{
//     return {
//         type:QueryActions.LOADING,
//         loading:true
//     }
// }
// export function successQuery(data):IQueryAction{
//     return {
//         type:QueryActions.FETCH_SUCCESS,
//         loading:false,
//         payload:data
//     }
// }
// export function failureQuery(error:ApiError):IQueryAction{
//     return {
//         type:QueryActions.FETCH_ERROR,
//         loading:false,
//         error:error.message,
//         errorType:ErrorType.QUERY
//     }
// }
enum GenMode{
    QUERY = "query",
    RESPONSE="response",
    COMMENT = "comment"
}

function generateActionCreators(mode:GenMode){
    switch(mode){
        case GenMode.QUERY:
            return[
                apiActionGenerator(CoreActions.QUERY_FETCH),
                apiActionGenerator(CoreActions.QUERY_CREATE),
                apiActionGenerator(CoreActions.QUERY_UPDATE),
                apiActionGenerator(CoreActions.QUERY_DELETE)
            ];
        case GenMode.COMMENT:
            return [
                apiActionGenerator(CoreActions.COMMENT_FETCH),
                apiActionGenerator(CoreActions.COMMENT_CREATE),
                apiActionGenerator(CoreActions.COMMENT_UPDATE),
                apiActionGenerator(CoreActions.COMMENT_DELETE)
            ];
        case GenMode.RESPONSE:
            return [
                apiActionGenerator(CoreActions.RESPONSE_FETCH),
                apiActionGenerator(CoreActions.RESPONSE_CREATE),
                apiActionGenerator(CoreActions.RESPONSE_UPDATE),
                apiActionGenerator(CoreActions.RESPONSE_DELETE)
            ];
    }
}
const [
  queryFetchActions,
  queryCreateActions,
  queryUpdateActions,
  queryDeleteActions,
] = generateActionCreators(GenMode.QUERY);
const [
  commentFetchActions,
  commentCreateActions,
  commentUpdateActions,
  commentDeleteActions,
] = generateActionCreators(GenMode.COMMENT);
const [
  responseFetchActions,
  responseCreateActions,
  responseUpdateActions,
  responseDeleteActions,
] = generateActionCreators(GenMode.RESPONSE);
// const queryFetchActions = apiActionGenerator(CoreActions.QUERY_FETCH);
// const queryCreateActions = apiActionGenerator(CoreActions.QUERY_CREATE);
// const commentCreateActions = apiActionGenerator(CoreActions.COMMENT_CREATE);
// const commentFetchActions = apiActionGenerator(CoreActions.COMMENT_FETCH);


export function fetchQuery(query:RESTObject<IQuery>){
    Reactotron.log!("In query-list thunk",query);
    return async dispatch => {
        dispatch(queryFetchActions.createLoadingAction());
       await query.read()
       .then(() => {
           Reactotron.log!("query-read-successful");
           dispatch(queryFetchActions.createSuccessAction(query))
       }).catch(error => {
        dispatch(queryFetchActions.createFailureAction(error));
       })
    }
}

export function writeQuery(data){
    return async dispatch => {
        dispatch(queryCreateActions.createLoadingAction())
        createQuery(data)
        .then(response => {
            Reactotron.log!("query-create-response",response);
            dispatch(queryCreateActions.createSuccessAction(response))
        }).catch(error => {
            Reactotron.log!("query-creation-failure",error);
            dispatch(queryCreateActions.createFailureAction(error))
        })
    }
}

export function editQuery(query,data){
    return async dispatch => {
        dispatch(queryUpdateActions.createLoadingAction())
        updateQuery(query,data)
        .then(response => {
            Reactotron.log!("query-create-response",response);
            dispatch(queryUpdateActions.createSuccessAction(response))
        }).catch(error => {
            Reactotron.log!("query-creation-failure",error);
            dispatch(queryUpdateActions.createFailureAction(error))
        })
    }
}

export function removeQuery(query){
    return async dispatch => {
        dispatch(queryDeleteActions.createLoadingAction())
        deleteQuery(query)
        .then(response => {
            Reactotron.log!("query-delete-response",response);
            dispatch(queryDeleteActions.createSuccessAction(response))
        }).catch(error => {
            Reactotron.log!("query-delete-failure",error);
            dispatch(queryDeleteActions.createFailureAction(error))
        })
    }
}

export function loadResponses(query,req){
    return async dispatch => {
		dispatch(responseFetchActions.createLoadingAction())
		await getAllResponses(query,req)
		.then(response => {
			Reactotron.log!("query-create-response",response);
            dispatch(responseFetchActions.createSuccessAction(response));
		}).catch(error => {
			dispatch(responseFetchActions.createFailureAction(error));
		})
    }
}

export function writeResponse(query,data){
	return async dispatch => {
		dispatch(responseCreateActions.createLoadingAction());
		await createResponse(query,data)
		.then(response => {
			dispatch(responseCreateActions.createSuccessAction(response));
		}).catch(error => {
			dispatch(responseCreateActions.createFailureAction(error));
		})
	}
}

export function editResponse(response,data){
	return async dispatch => {
		dispatch(responseUpdateActions.createLoadingAction());
		createResponse(response,data)
		.then(response => {
			dispatch(responseUpdateActions.createSuccessAction(response));
		}).catch(error => {
			dispatch(responseUpdateActions.createFailureAction(error));
		})
	}
}

export function removeResponse(response){
    Reactotron.log!("in remove response thunk");
    return async dispatch => {
        dispatch(responseDeleteActions.createLoadingAction());
        Reactotron.log!("dispatched the loading action in remove response thunk");
        deleteResponse(response)
        .then(response => {
            Reactotron.log!("query-create-response",response);
            dispatch(responseDeleteActions.createSuccessAction(response))
        }).catch(error => {
            Reactotron.log!("query-creation-failure",error);
            dispatch(responseDeleteActions.createFailureAction(error))
        })
    }
}



export function writeComment(query,data){
    return async dispatch => {
        dispatch(commentCreateActions.createLoadingAction());
        createComment(query,data)
        .then(response => {
            dispatch(commentCreateActions.createSuccessAction(response));
        }).catch(error => {
            dispatch(commentCreateActions.createFailureAction(error));
        })
    }
}


export function loadComments(query,req){
    return async dispatch => {
        dispatch(commentFetchActions.createLoadingAction());
        getAllComments(query,req)
        .then(response => {
            Reactotron.log!("loading comments successful",response);
            dispatch(commentFetchActions.createSuccessAction(response));
        })
        .catch(error => {
            Reactotron.log!("loading comments error",error);
            dispatch(commentFetchActions.createLoadingAction(error));
        })
    }
}

export function removeComment(comment){
    return async dispatch => {
        dispatch(commentDeleteActions.createLoadingAction());
        deleteComment(comment)
        .then(response => {
            dispatch(commentDeleteActions.createSuccessAction(response));
        }).catch(error => {
            dispatch(commentDeleteActions.createFailureAction(error));
        })
    }
}

export function editComment(comment,data){
    return async dispatch => {
        dispatch(commentUpdateActions.createLoadingAction());
        updateComment(comment,data)
        .then(response => {
            dispatch(commentUpdateActions.createSuccessAction(response));
        }).catch(error => {
            dispatch(commentUpdateActions.createFailureAction(error));
        })
    }
}
