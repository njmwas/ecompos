import * as React from "react";
import { createContext, ReactNode } from "react";
import { IndexedDBLibrary } from "../lib/idb";

declare global {
    interface Window { appData: any; }
}

// const IDB = new IndexedDBLibrary("ecommposDB");

export const DataContext = createContext(null);
interface ContextProviderProps {
    children: ReactNode
}
function DataContextProvider({ children }: ContextProviderProps) {
    const [data, setData] = React.useState(window.appData);

    React.useEffect(() => {
        if (data) {
            Object.keys(data).forEach((k: string) => {
                const d = data[k];
                // if(Array.isArray(d)) d.forEach(dt=>IDB.upsert(k, dt));
                // else IDB.upsert(k, d)
            });
        }
    }, [data]);

    function upSert(resources: any) {
        const dt = { ...data }
        Object.keys(resources).forEach((k: string) => {
            const record = resources[k];
            if ("id" in record && record.id) {
                const indx = dt[k].findIndex((rcd: any) => rcd.id === record.id);
                if (indx > -1) dt[k][indx] = record;
                return
            }
            dt[k].push(record);
        })
        setData({ ...dt });
    }

    return (<DataContext.Provider value={{ data, upSert }}>
        {children}
    </DataContext.Provider>);
}

export default DataContextProvider;