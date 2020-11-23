import { User } from "node-rest-objects/dist/data/user-management";
import { IUserAction, UserActions } from "./action-types";
import { ApiError } from "./common-types";
import { typeGenerator } from "../generators";
import { apiActionGenerator } from "./common-types";
import { CoreActions } from "./action-types";

const userFetchActions:any = apiActionGenerator(CoreActions.USER_FETCH);

export function getUser(){
    const user:User =  new User();
    return async dispatch => {
        dispatch(userFetchActions.createLoadingAction());
        await user.getMe()
        .then(() => {
            dispatch(userFetchActions.createSuccessAction(user.data));
        }).catch(error => {
            dispatch(userFetchActions.createFailureAction(error));
        });
    }
}