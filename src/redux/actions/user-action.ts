import { User } from "node-rest-objects/dist/data/user-management";
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
        await user.getMe()
        .then(() => {
            dispatch(getUserSuccess(user.data));
        }).catch(error => {
            dispatch(getUserFailure(error));
        });
    }
}