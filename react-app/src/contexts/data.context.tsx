import * as React from "react";
import { createContext, ReactNode } from "react";

declare global {
    interface Window { appData:any; }
}

export const DataContext = createContext(null);
interface ContextProviderProps {
    children: ReactNode
}
function DataContextProvider({ children }: ContextProviderProps) {
    return ( <DataContext.Provider value={{...window.appData}}>
        {children}
    </DataContext.Provider> );
}

export default DataContextProvider;