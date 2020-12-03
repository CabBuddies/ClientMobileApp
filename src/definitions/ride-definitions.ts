import { Stats } from "node-rest-objects/dist/data/groups/schemas";

export type loc = { lat: number | null, lng: number | null, raw: any };

export interface IGroupStats extends Stats { };
