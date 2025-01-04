import * as React from "react";
import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Layout from "./components/layout";
import SignIn from "./pages/auth/Signin";
import SignUp from "./pages/auth/Signup";
import Kuhusu from "./pages/Kuhusu";
import AdminDashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./components/protected";
import Categories from "./pages/admin/categories/Index";
import SubCategories from "./pages/admin/sub_categories/Index";

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
                path:"/admin",
                element: <ProtectedRoute />,
                children:[
                    {
                        path:"/admin/dashboard",
                        element: <AdminDashboard />
                    },
                    {
                        path:"/admin/categories",
                        element: <Categories />
                    },
                    {
                        path:"/admin/categories/:action",
                        element: <Categories />
                    },
                    {
                        path:"/admin/subcategories",
                        element: <SubCategories />
                    },
                    {
                        path:"/admin/subcategories/:action",
                        element: <SubCategories />
                    }
                ]
            },
            {
                path: "*",
                element: <>Not Found</>
            }
        ]
    }
]);

export default router;