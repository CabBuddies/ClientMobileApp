import { AuthActions, IAuthAction } from "../actions/action-types";
import { initialState, IAuthState } from "../initialState";

export default function authReducer(state: IAuthState = initialState.authState, action: IAuthAction): IAuthState | undefined {

    if (!state) return;

    switch (action.type) {
        case AuthActions.LOGIN:
            return {
                ...state,
                isSignedIn: action.isSignedIn,
                accessToken: action.payload!.acessToken,
                refreshToken: action.payload!.refreshToken,
                isConfirmed: action.payload!.isConfirmed,
                userId: action.payload!.userId,
                profile: action.payload!.profile
            };
        case AuthActions.AUTH_ERROR:
            return { ...state, isSignedIn: action.isSignedIn, error: action.error! };
        case AuthActions.ANONYMOUS:
            return { ...state, isSignedIn: action.isSignedIn, anonymous: action.anonymous! };
        case AuthActions.LOGOUT:
            return {
                ...state,
                isSignedIn: action.isSignedIn,
                anonymous: action.anonymous!,
                accessToken: undefined,
                refreshToken: undefined,
                isConfirmed: undefined,
                userId: undefined
            };
        case AuthActions.SIGN_UP:
            return {
                ...state,
                isSignedIn: action.isSignedIn,
                accessToken: action.payload!.accessToken,
                refreshToken: action.payload!.refreshToken,
                isConfirmed: action.payload!.isConfirmed,
                userId: action.payload!.userId,
                profile: action.payload!.profile
            };
        case AuthActions.CONFIRM:
            return {
                ...state,
                isConfirmed: action.payload!.isConfirmed
            };
        case AuthActions.CONFIRM_FAILURE:
            return {
                ...state
            }
        default:
            return state;
    }
}
