import { IQuery, ITQOpinion } from "node-rest-objects/dist/data/queries";
import { IUser, User } from "node-rest-objects/dist/data/user-management";
import RESTObject from "node-rest-objects/dist/rest/rest.object";
import { defaultRequest, IQueryStats, IRequest } from "../definitions/query-definitions";
import { Navs, Screens } from "../definitions/screen-definitions";
import { CoreActions } from "./actions/action-types";

export enum ErrorType {
    QUERY = "query-error",
    COMMENT = "comment-error",
    RESPONSE = "response-error",
    USER = "user-error",

}
interface CommonStates {
    loading?: boolean;
    error?: any;
    errorType?: string;
}

export interface IAppState{
    authState:IAuthState;
    userState:IUserState;
    queryListState:IQueryListState;
    queryState:IQueryState;
    queryOpinionState:IQueryOpinionState;
    requestState:IRequestState;
}
export interface IQueryOpinionState extends CommonStates{
    opinionList:Record<string,string>;
}

export interface IAuthState extends CommonStates {
    isSignedIn: boolean;
    anonymous: boolean;
    accessToken?: any;
    refreshToken?: any;
    isConfirmed?: boolean;
    userId?: string;
    profile?: IUser;
    [key: string]: any;
}

export interface IUserState extends CommonStates {
    user: User | undefined;
    currentScreen?: Navs;
    followers?: User[];
    following?: User[];
}

export interface IProfileState extends CommonStates, IUser {
}

export interface IQueryListState extends CommonStates {
    queries: RESTObject<IQuery>[] | undefined;
}

export enum QueryStatus {
    PUBLISHED = "published",
    DRAFT = "draft"
}
export interface IQueryState extends CommonStates {
    query: RESTObject<IQuery> | undefined;
    currentUserOpinion?: string;
    response?: any;
    comment?: any;
}
export interface IRequestState extends CommonStates {
    query?: object;
    sort?: Record<string, any>;
    pageSize?: number;
    pageNum?: number;
}

// export interface IRideState{

// }

// export interface IPackageState{

// }
const defaultAuthState: IAuthState = {
    isSignedIn: false,
    anonymous: false,
    loading: false
}
const defaultQueryListState: IQueryListState = {
    queries: undefined
}
const defaultUserState: IUserState = {
    user: undefined,
    loading: false,
    currentScreen: Navs.APP
}
const defaultQueryState: IQueryState = {
    query: undefined
}
const defaultQueryOpinionState:IQueryOpinionState ={
    opinionList:{}
}
// const queryState:IQueryState={

// }
export const initialState: IAppState = {
    authState: defaultAuthState,
    queryListState: defaultQueryListState,
    queryState:defaultQueryState,
    queryOpinionState:defaultQueryOpinionState,
    userState:defaultUserState,
    requestState:defaultRequest
}
