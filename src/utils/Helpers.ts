export const filterPassword = (key,value) => {
    if(key === "password" || key === "confirmPassword"){
        return null;
    }
    return value;
}