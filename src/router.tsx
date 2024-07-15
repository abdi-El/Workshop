import React from "react";
import {
    createBrowserRouter
} from "react-router-dom";
import BaseLayout, { pathConstants } from "./components/Layout";
import Estimates from "./pages/Estimates";

const Home = React.lazy(() => import("./pages/Home"))
 

const router = createBrowserRouter([
    {
        element: <BaseLayout />,
        children: [
            {
                path: pathConstants.HOMEPAGE.key,
                element: <Home />,
            },
            {
                path: pathConstants.ESTIMATES.key,
                element: <Estimates/>
            }
        ],
    },
]);

export { router };
