import * as React from "react";
import { useLocation } from "react-router";
import List from "./list";
import AddUpdate from "./addupdate";

function MVC() {
    
    const location = useLocation();
    const [, resource, action="list", id] = location.pathname.split("/");

    return (<>{action === 'list' ? <List /> : <AddUpdate />}</>);
}

export default MVC;