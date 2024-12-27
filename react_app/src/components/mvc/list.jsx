import * as React from "react";
import { useEffect } from "react";
function List() {

    useEffect(()=>{
        fetch("/users").then(r=>r.text())
        .then(console.log);
        console.log(window.data)
    }, []);

    return ( <>
        List
    </> );
}

export default List;