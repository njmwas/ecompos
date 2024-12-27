import * as React from "react";
import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import MVC from "./components/mvc";
import Layout from "./components/layout";
import SignIn from "./pages/auth/Signin";
import SignUp from "./pages/auth/Signup";
import Kuhusu from "./pages/Kuhusu";

const router = createBrowserRouter([
    {
        path:'',
        element: <Layout />,
        children:[
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/abt",
                element: <Kuhusu />
            },
            {
                path:"/auth",
                children:[
                    {
                        path: "/auth/abt",
                        element: <Kuhusu />
                    },

                    {
                        path: "/auth",
                        element: <SignIn />
                    },
                    {
                        path: "/auth/signup",
                        element: <SignUp />
                    }
                ]
            },
            {
                path: "*",
                element: <MVC />
            }
        ]
    }
]);

export default router;