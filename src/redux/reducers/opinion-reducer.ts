import reduceReducers from "reduce-reducers";
import { getKeyByValue } from "../../utils";
import { omit } from "../../utils/Helpers";
import { CoreActions, FetchActions } from "../actions/action-types";
import { IFetchAction } from "../actions/common-types";
import { reducerGenerator } from "../generators";
import { initialState, IQueryOpinionState } from "../initialState";

const opinionActionHandler = guardedState => ({
    [FetchActions.BEGIN]: (state:IQueryOpinionState,action:IFetchAction) => ({
        ...state,
        loading:action.loading,
        error:undefined,
        errorType:undefined
    }),
    [FetchActions.SUCCESS]:(state:IQueryOpinionState,action:IFetchAction) => {
        if(action.type.startsWith("opinion-delete")){
            const map = state.opinionList;
            const key = getKeyByValue(map,action.payload);
            const opinions = omit(map,[key]);
            return {
                ...state,
                opinionList:opinions,
                loading:action.loading,
                error:undefined,
                errorType:undefined
            }
        }
        return {
            ...state,
            opinionList:{...action.payload,...state.opinionList},
            loading:action.loading,
            error:undefined,
            errorType:undefined
        }
    },
    [FetchActions.FAILURE]:(state:IQueryOpinionState,action:IFetchAction) => ({
            ...state,
            loading:action.loading,
            error:action.error,
            errorType:action.errorType
        }),
}); 

export const genReducerGenerator = (coreName,actionHandler) => {
    const guardedState = initialState.queryOpinionState|| initialState;
    return reducerGenerator(
        coreName,
        actionHandler(guardedState),
        guardedState
    )
}

const opinionReducers = [
        genReducerGenerator(CoreActions.OPINION_CREATE,opinionActionHandler),
        genReducerGenerator(CoreActions.OPINION_DELETE,opinionActionHandler),
        genReducerGenerator(CoreActions.OPINION_LIST,opinionActionHandler)
    ]

const opinionReducer = reduceReducers(initialState.queryOpinionState,...opinionReducers); 

export default opinionReducer;