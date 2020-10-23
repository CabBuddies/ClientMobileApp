import React from "react";
interface ContextProps{
    [val:string]:any
}
export const AuthContext = React.createContext<Partial<ContextProps>>({});