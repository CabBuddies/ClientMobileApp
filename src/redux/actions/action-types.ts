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
export interface IQueryListAction extends Common{
    type:QueryListActions;
    payload?:any;
    error?:string;

}

export interface IUserAction extends Common{
    type: UserActions;
    payload?:any;
    error?:string;
}

export interface IQueryAction extends Common{
    type:QueryActions | CommentActions;
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
    SIGN_UP = "sign-up",
    AUTH_ERROR="auth-error",
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

export enum CoreActions{
    QUERY = "query",
    QUERY_FETCH = "query-fetch",
    QUERY_CREATE = "query-create",
    QUERY_UPDATE = "query-update",
    QUERY_DELETE = "query-delete",
    RESPONSE ="response",
    RESPONSE_FETCH="response-fetch",
    QUERY_LIST = "query-list-fetch",
    RESPONSE_LIST = "response-list",
    RESPONSE_CREATE="response-create",
    RESPONSE_UPDATE="response-update",
    RESPONSE_DELETE="response-delete",
    USER = "user",
    USER_FETCH = "user-fetch",
    AUTH = "auth",
    COMMENT = "comment",
    COMMENT_FETCH="comment-fetch",
    COMMENT_CREATE="comment-create",
    COMMENT_DELETE="comment-delete",
    COMMENT_UPDATE="comment-update",
    GROUP_LIST = "group-list",
    GROUP = "group",
    POST_LIST = "post-list",
    POST = "post",
    REPLY_LIST="reply-list",
    REPLY = "reply",
    RIDE = "ride",
    REQUEST_SORT="request-sort",
    REQUEST_PAGE_NUM = "request-page-num",
    REQUEST_PAGE_SIZE = "request-page-size",
    REQUEST_QUERY = "request-query"
}

export enum QueryActions{
    LOADING = "query-action-loading",
    FETCH_SUCCESS = "query-fetch-success",
    FETCH_ERROR = "query-fetch-failure",
    DRAFT = "draft",
    PUBLISH = "publish",
    LOAD_COMMENTS = "load-comments",
    LOAD_RESPONSES = "load-responses",
    COMMENT = "add-comment",
    OPINION = "opinion",
    RESPONSE = "add-response",
    VIEW = "view",
    CREATE = "create",
    FAILURE = "query-action-failure",
    UPDATE = "update",
    DELETE = "delete",
    UP_VOTE = "up-vote",
    DOWN_VOTE = "down-vote"
}

export enum CommentActions{

    CREATE_SUCCESS = "comment-create-success",
    CREATE_FAILURE = "comment-create-failure",
    UPDATE_SUCCESS = "comment-update-success",
    UPDATE_FAILURE = "comment-update-failure",
    DELETE_SUCCESS = "comment-delete-success",
    DELETE_FAILURE = "comment-delete-failure",
    FETCH_SUCCESS = "comment-fetch-success",
    FETCH_FAILURE = "comment-fetch-failure"
}

export enum OpinionActions{
    UP_VOTE = "up-vote",
    DOWN_VOTE = "down-vote",
    COMMENT = "comment",
    SPAM_REPORT = "spam-report",
}

// export enum RequestActions{

// }
