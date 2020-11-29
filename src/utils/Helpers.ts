export const filterPassword = (key:string,value:any) => {
    if(key === "password" || key === "confirmPassword"){
        return null;
    }
    return value;
}
export function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
export const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});