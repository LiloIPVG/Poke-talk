import {createBrowserRouter} from "react-router";
import List from "./pages/list.jsx"
import Chat from "./pages/chat.jsx";
import NotFound from "./pages/notFound.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: List
    },
    {
        path: "/chat/:pokemonID",
        Component: Chat
    },
    {
        path: '*',
        Component: NotFound
    }
])