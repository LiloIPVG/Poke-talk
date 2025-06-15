import {createBrowserRouter} from "react-router";
import List from "./pages/list.jsx"
export const router = createBrowserRouter([
    {
        path: "/",
        Component: List
    },
    /*{
        path: "/chat/:pokemonID",
        Component:
    }*/
])