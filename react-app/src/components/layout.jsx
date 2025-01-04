import * as React from "react";
import { Outlet } from "react-router";

function Layout() {
    return (<>
        <div className="flex flex-col border-2 border-rose-300">
            <h3 className="text-2xl font-black">
                e-comm-pos
            </h3>
        </div>
        <main className="container m-auto h-96">
            <Outlet />
        </main>
    </>);
}

export default Layout;