export const typeGenerator = (name,type) => {
    return `${(name!==""?`${name}-`:"")}${type}`;
}

export const actionCreatorGenerator = (name,actionCreators,params)=>{
    return Object.keys(actionCreators).reduce((result,key) => {
        result[key] = actionCreators[key](name,params);
        return result;
    },{});
}

export const actionHandlerGenerator = (name,actionHandler) => {
    return Object.keys(actionHandler).reduce((result,key) => {
        const actionType = typeGenerator(name,key);
        result[actionType] = actionHandler[key];
        return result;
    },{})
}

export const reducerGenerator = (name = "", defaultActionHandler,initialState) => {
    const actionHandler = actionHandlerGenerator(name,defaultActionHandler);
    return (state = initialState, action) => {
        if(actionHandler[action.type]){
            return actionHandler[action.type](state,action);
        }
        else{
            return state;
        }
            
    }
};
