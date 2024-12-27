import React from "react";
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router";
import "./index.css";
import router from "./routes";
import DataContextProvider from "./contexts/data.context";

const root = createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
    <DataContextProvider>
        <RouterProvider router={router} />
    </DataContextProvider>
</React.StrictMode>)
