import * as React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
function List() {
    
    const location = useLocation();
    const qparams = location.search.substring(1).split("&")
                    .reduce((a, b)=>({...a, [b.split("=")[0]]:b.split("=")[1]}), {});

    return ( <>
        List
    </> );
}

export default List;