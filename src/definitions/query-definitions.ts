import { IQuery } from "node-rest-objects/dist/data/queries";
import { Content, Stats } from "node-rest-objects/dist/data/queries/schemas";
import RESTObject from "node-rest-objects/dist/rest/rest.object";


export interface IQueryStats extends Stats{}
export interface IQueryContent extends Content{}
export interface IQueryListResponse{
    query: object;
    sort: object;
    attributes: object;
    pageSize: number;
    pageNum: number;
    resultSize: number;
    resultTotalSize: number;
    result: RESTObject<IQuery>[];
};