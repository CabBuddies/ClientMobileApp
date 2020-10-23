import AsyncStorage from '@react-native-community/async-storage';
import { filterPassword } from '../utils';


// export const persistItem = (key,value,dependency) => {

//     if(typeof value === 'object')
//     {
//         value = JSON.stringify(value);
//     }
//     const[item,setItem] = useState('')
//     useEffect(() => {
        

//     },[dependency])
// }

export const storeItem = async (key,value,isObject=false) => {
    try{
        if(isObject)
        {
            value = JSON.stringify(value,filterPassword);
        }
        await AsyncStorage.setItem(key,value);
        console.log(`Data persisted locally`);
    }
    catch(err)
    {
        console.error(`failed to store ${key}:${item}, error: ${err.message}`);
    }
}

export const retrieveItem = async (key) => {

    try{
        const value= await AsyncStorage.getItem(key);
        if(value !== null || value!== undefined){
            return value;
        }
        return "NOT FOUND";
    }
    catch(err)
    {
        console.error(`failed to retrieve value for ${key}, error: ${err.message}`);
    }
}

export const deleteItem = async (key) => {
    try{
        const value =  await AsyncStorage.removeItem(key);
        console.log(`item with key: ${key}, removed successfully`);
        return value;
    }
    catch(err)
    {
        console.error(`failed to remove value for ${key}, error: ${err.message}`);
    }
}

