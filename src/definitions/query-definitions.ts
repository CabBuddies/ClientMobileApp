import { IComment, IQuery } from "node-rest-objects/dist/data/queries";
import { Content, Stats } from "node-rest-objects/dist/data/queries/schemas";
import RESTObject from "node-rest-objects/dist/rest/rest.object";


export interface IQueryStats extends Stats{}
export interface IQueryContent extends Content{}
export interface ICommentData extends IComment{}
export interface IQueryListResponse{
    query?: object;
    sort: object;
    attributes?: object;
    pageSize: number;
    pageNum: number;
    result:any;
    resultSize: number;
};
export interface IRequest{
    query?:object;
    sort?:Record<string,any>;
    pageSize?:number;
    pageNum?:number;
}

export const defaultRequest:IRequest = {
    sort:{
        "createdAt":-1
    },
    pageNum:1
}