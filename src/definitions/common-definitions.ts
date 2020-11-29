import { IUser } from "node-rest-objects/dist/data/user-management";

export enum MenuModes{
    CRUD = "crud",
    TEXT = "text"
}

export enum FullViewType{
    QUERY="query",
    RESPONSE="response",
    POST="group-post"
}

export enum PlaceholderSize{
    LONG = "long",
    SHORT = "short",
    MEDIUM = "medium"
}

export enum QueryFormType{
    QUERY="query",
    RESPONSE="response"
}
export enum OpinionType{
    FOLLOW = 'follow',
    UPVOTE = 'upvote',
    DOWNVOTE = 'downvote',
    REPORT = 'spamreport'
}

export interface IUserDetails extends IUser{}