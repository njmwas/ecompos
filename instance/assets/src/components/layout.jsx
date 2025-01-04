import * as React from "react";
import { Navigate, Outlet } from "react-router";
import useQueryParams from "../hooks/useQueryParams";

function Layout() {
    const qparams = useQueryParams();

    return (<>
        <div className="container m-auto flex flex-col border-b-2 border-rose-300 p-3">
            <h3 className="text-2xl font-black">
                e-comm-pos
            </h3>
        </div>
        <main className="container m-auto min-h-96">
            {"after" in qparams ? <Navigate to={qparams.after} /> : <Outlet />}
        </main>
    </>);
}

export default Layout;