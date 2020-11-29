export const filterPassword = (key:string,value:any) => {
    if(key === "password" || key === "confirmPassword"){
        return undefined;
    }
    return value;
}