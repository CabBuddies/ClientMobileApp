import { IUserAction,UserActions } from "../actions/action-types";
import { IUserState, initialState } from "../initialState";


export default function userReducer(state:IUserState = initialState.userState,action:IUserAction ):IUserState{

    switch(action.type){
        case UserActions.FETCH_BEGIN:
            return {...state, loading:action.loading };
        case UserActions.FETCH_ERROR:
            return {...state, loading:action.loading, error:action.error};
        case UserActions.FETCH_SUCCESS:
            return {...state, loading:action.loading, profileState:action.payload };
        default:
            return state!;
    }
}