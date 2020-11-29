import { Dimensions } from "react-native";

export function dh(p:number=1){
    return Dimensions.get('window').height*p;
}
export function dw(p:number=1){
    return Dimensions.get('window').width*p;
}
export function dwh(){
    return Dimensions.get('window');
}