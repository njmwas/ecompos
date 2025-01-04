import * as React from "react";
import { Navigate, Outlet } from "react-router";
import { DataContext } from "../contexts/data.context";

function ProtectedRoute() {
    const { data } = React.useContext(DataContext);
    const path = window.location.pathname;
    const { user } = data || {}
    
    return (<>
        {user ? <Outlet /> : <Navigate to={`/auth?return=${path}`} />}
    </>);
}

export default ProtectedRoute;