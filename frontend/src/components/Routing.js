import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useRouting } from "../hooks/useRouting";
import { selectCurrentToken, selectCurrentUser } from "../features/auth/authSlice";


export const Routing = () => {
    const token = useSelector(selectCurrentToken);
    const authenticated = Boolean(token);
    const previousAuthValue = useRef(authenticated); // will be used later for setting location state
    const user = useSelector(selectCurrentUser);

    useEffect(() => {
        previousAuthValue.current = authenticated;
    }, [authenticated]);

    // return useRoutes(useRouting(Boolean(token))); // useRouting used inside <BrowserRouter>
    return <RouterProvider router={createBrowserRouter(useRouting(authenticated, user))} />
};
