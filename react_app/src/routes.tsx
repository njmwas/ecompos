import * as React from "react";
import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import List from "./components/mvc/list.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "*",
        element: <List />
    }
]);

export default router;