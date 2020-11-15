import { IQuery } from "node-rest-objects/dist/data/queries";
import { IUser } from "node-rest-objects/dist/data/user-management";
import RESTObject from "node-rest-objects/dist/rest/rest.object";
import { IQueryStats } from "../../definitions/query-definitions";
import { Common } from "./common-types";


export interface IAuthAction extends Common{
    type: AuthActions;
    isSignedIn:boolean;
    anonymous?:boolean;
    payload?:any;
} 
export interface IQueryListAction{
    type:QueryListActions;
    loading:boolean;
    payload?:any;
    error?:string;

}

export interface IUserAction{
    type: UserActions;
    loading:boolean;
    payload?:any;
    error?:string;
}

export interface IQueryAction{
    type:QueryActions;
    loading:boolean;
    error?:string;
    payload?:any;
}

// --------------------------------------------------

export enum UserActions{
    FETCH_BEGIN = "user-fetch-begin",
    FETCH_SUCCESS = "user-fetch-success",
    FETCH_ERROR = "user-fetch-failure",
    SETTINGS = "user-settings",
    DEFAULT_SCREEN = "default-screen",
    PROFILE = "my-profile",
    FOLLOWERS = "my-followers",
    VIEW_USER = "view-user",
    QUERY_PROFILE = "query-profile",
    GUILD_PROFILE ="guild-profile",
    PD_PROFILE = "package-delivery-profile",
    RIDES_PROFILE = "rides-profile",
    FOLLOW = "follow-user",
    ACCEPT_REQUEST ="accept-follow-request",
    REJECT_REQUEST = "reject-follow-request",
    ACCEPT_INVITE = "accept-guild-invite",
    REJECT_INVITE = "reject-guild-invite",
    BLOCK_USER = "block-user",
    UN_FOLLOW_USER = "un-follow-user" 
}

export enum FetchActions{
    BEGIN = "begin",
    SUCCESS = "success",
    FAILURE = "failure"
}
export enum AuthActions{
    LOGIN = "login",
    AUTH_ERROR = "auth-error",
    SIGN_UP = "sign-up",
    ANONYMOUS = "anonymous",
    REFRESH = "refresh-token",
    LOGOUT = "logout"

}

export enum QueryListActions{
    FETCH_LOADING = "fetch-loading",
    FETCH_SUCCESS = "fetch-success",
    FETCH_ERROR = "fetch-error",
    VIEW = "view"
}

export enum QueryActions{
    LOADING = "loading",
    FETCH_SUCCESS = "fetch-query-success",
    FETCH_ERROR = "fetch-query-error",
    DRAFT = "draft",
    PUBLISH = "publish",
    OPINION = "opinion",
    RESPONSE = "response",
    VIEW = "view",
    CREATE = "create",
    FAILURE = "query-action-failure",
    UPDATE = "update",
    DELETE = "delete",
    UP_VOTE = "up-vote",
    DOWN_VOTE = "down-vote"
}

export enum OpinionActions{
    UP_VOTE = "up-vote",
    DOWN_VOTE = "down-vote",
    COMMENT = "comment",
    SPAM_REPORT = "spam-report",
}
