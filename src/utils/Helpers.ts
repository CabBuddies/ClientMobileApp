import { Toast } from "native-base";

export const filterPassword = (key:string,value:any) => {
    if(key === "password" || key === "confirmPassword"){
        return undefined;
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

export const timeSince = (date:Date)=> {

    var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
    const isPast = seconds>0;

    seconds = (isPast?1:-1)*seconds;

    console.log('nkLogTimeSince',seconds,isPast);

    var interval = seconds / 31536000;
    
    const val = (num:number,suf:string) => {
        return `${num} ${suf}${num>1?'s':''} `+(isPast?'ago':'from now');
    }

    if (interval > 1) {
        return val(Math.floor(interval),'year');
    }

    interval = seconds / 2592000;
    if (interval > 1) {
        return val(Math.floor(interval),'month');
    }
    
    interval = seconds / 86400;
    if (interval > 1) {
        return val(Math.floor(interval),'day');
    }
    
    interval = seconds / 3600;
    if (interval > 1) {
        return val(Math.floor(interval),'hour');
    }
    
    interval = seconds / 60;
    if (interval > 1) {
        return val(Math.floor(interval),'minute');
    }
    
    return val(Math.floor(seconds),'second');
  }

  export function showToast(val:string,duration:number = 3000){
      Toast.show({
          text:val,
          duration:duration,
          position:"bottom",
          style:{
              marginHorizontal:5,
              borderRadius:25
          }
      });
  }
