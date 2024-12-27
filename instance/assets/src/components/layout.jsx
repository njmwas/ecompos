import * as React from "react";
import { Outlet } from "react-router";

function Layout() {
    return (<>
        <div className="border-2 border-rose-300"></div>
        <main className="container m-auto h-96">
            <Outlet />
        </main>
    </>);
}

export default Layout;