import { IUser, User } from "node-rest-objects/dist/data/user-management";
import { apiActionGenerator } from "./common-types";
import { CoreActions } from "./action-types";

const userFetchActions: any = apiActionGenerator(CoreActions.USER_FETCH);

export function getUser() {
    const user: User = new User();
    return async dispatch => {
        dispatch(userFetchActions.createLoadingAction());
        await user.getMe()
            .then(() => {
                dispatch(userFetchActions.createSuccessAction(user));
            }).catch(error => {
                dispatch(userFetchActions.createFailureAction(error));
            });
    }
}

const saveUserActions: any = apiActionGenerator(CoreActions.USER_SAVE);

export function saveUser(user: User, data: { firstName: string, lastName: string, displayPicture: string }) {
    return async dispatch => {
        dispatch(saveUserActions.createLoadingAction());
        user.data.firstName = data.firstName;
        user.data.lastName = data.lastName;
        user.data.displayPicture = data.displayPicture;
        await user.update()
            .then(async () => {
                await user.getMe()
                    .then(() => {
                        dispatch(saveUserActions.createSuccessAction(user));
                    }).catch(error => {
                        dispatch(saveUserActions.createFailureAction(error));
                    })
            }).catch(error => {
                dispatch(saveUserActions.createFailureAction(error));
            });
    }
}