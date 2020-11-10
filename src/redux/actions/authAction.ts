import { AuthActions, IAuthAction }  from './actionTypes';
import { signInApp,signUpApp } from "../../api/auth-api";
import Reactotron from "../../../dev/ReactotronConfig";


export function loginSuccess(data){
   return {
       type: AuthActions.LOGIN,
       isSignedIn:true,
       anonymous:false,
       payload:data
   }
}

export function signUpSuccess(data){
    return {
        type: AuthActions.SIGN_UP,
        isSignedIn:true,
        anonymous:false,
        payload:data
    }
 }

export function authFailure(error){
    return {
        type: AuthActions.AUTH_ERROR,
        isSignedIn:false,
        anonymous:false,
        error:error
    }
}

// thunk
export function login(data) {

    return (dispatch) => {
        signInApp(data)
        .then(response => {
            Reactotron.log!("sign-in response",response);
            dispatch(loginSuccess(data));
        }).catch(error => {
            Reactotron.log!("error logging in",error);
            dispatch(authFailure(error));
        })
    }
}

export function guestUser():IAuthAction {
    return { type: AuthActions.ANONYMOUS, isSignedIn: true,anonymous:true };
}