
export interface ApiError{
    message: string;
    name?: number;
    [key:string] : any;
}

export interface Common{
    loading?:boolean;
    error?:string;
}