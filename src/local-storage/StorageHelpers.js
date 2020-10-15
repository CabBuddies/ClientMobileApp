import AsyncStorage from '@react-native-community/async-storage';


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
            value = JSON.stringify(value);
        }
        await AsyncStorage.setItem(key,value);
        console.log(`Data persisted locally`);
    }
    catch(err)
    {
        console.log(`failed to store ${key}:${item}, error: ${err.message}`);
    }
}

export const retrieveItem = async (key) => {

    try{
        const value= await AsyncStorage.getItem(key);
        return value;
    }
    catch(err)
    {
        console.log(`failed to retrieve value for ${key}, error: ${err.message}`);
    }
}

export const deleteItem = async (key) => {
    try{
        const value =  await AsyncStorage.removeItem(key);
        return value;
    }
    catch(err)
    {
        console.log(`failed to remove value for ${key}, error: ${err.message}`);
    }
}

