import { User } from "node-rest-objects/dist/data/user-management";
import Reactotron from "../../../dev/ReactotronConfig";
import { IUserAction, UserActions } from "./action-types";
import { ApiError } from "./common-types";


function getUserLoading(){
    return {
        type:UserActions.FETCH_BEGIN,
        loading:true,
        payload:undefined
    }
}

function getUserFailure(error:ApiError){
    return {
        type:UserActions.FETCH_ERROR,
        loading:false,
        payload:undefined,
        error:error.message
    }
}
function getUserSuccess(data){
    return {
        type:UserActions.FETCH_SUCCESS,
        loading:false,
        payload:data
    }
}

export function getUser(){
    const user:User =  new User();
    return async dispatch => {
        dispatch(getUserLoading());
        Reactotron.log!(`user(before API call) in thunk: `, user);
        user.getMe()
        .then(() => {
            Reactotron.log!(`user(after API call) data in thunk: `, user.data);
            dispatch(getUserSuccess(user.data));
        }).catch(error => {
            Reactotron.log!(`user(after API call) data in thunk: `, error);
            dispatch(getUserFailure(error));
        });
    }
}