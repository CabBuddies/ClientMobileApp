import reduceReducers from "reduce-reducers";
import { CoreActions, IUserAction,FetchActions } from "../actions/action-types";
import { actionHandlerGenerator, reducerGenerator } from "../generators";
import { IUserState, initialState } from "../initialState";

const userActionHandler = initialState => ( {
    [FetchActions.BEGIN]: (state,action:IUserAction) => ({
        ...state,
        loading:action.loading,
    }),
    [FetchActions.SUCCESS]:(state,action:IUserAction) => ({
        ...state,
        loading:action.loading,
        user:action.payload
    }),
    [FetchActions.FAILURE]:(state,action:IUserAction) => ({
        ...state,
        loading:action.loading,
        error:action.error,
    }),
})

export const userReducerGenerator = (coreName,screenInitialState?:any) => {
    const guardedState = initialState.userState || initialState;
    return reducerGenerator(
        coreName,
        userActionHandler(guardedState),
        guardedState
    )
}
const userReducers = [userReducerGenerator(CoreActions.USER_SAVE),userReducerGenerator(CoreActions.USER_FETCH)];
const userReducer = reduceReducers(initialState.userState,...userReducers);

export default userReducer;
// export default function userReducer(state:IUserState = initialState.userState,action:IUserAction ):IUserState{

//     switch(action.type){
//         case FetchActions.FETCH_BEGIN:
//             return {...state, loading:action.loading };
//         case FetchActions.FETCH_ERROR:
//             return {...state, loading:action.loading, error:action.error};
//         case FetchActions.FETCH_SUCCESS:
//             return {...state, loading:action.loading, profileState:action.payload };
//         default:
//             return state!;
//     }
// }