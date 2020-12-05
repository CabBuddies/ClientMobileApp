import { Stats } from "node-rest-objects/dist/data/groups/schemas";

export type loc = { lat: number, lng: number , raw: any };

export interface IGroupStats extends Stats { };
