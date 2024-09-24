import { createBrowserRouter, Navigate } from "react-router-dom";
import Index from "../layout/Index";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

export const router = createBrowserRouter([
    { 
        path: '/',
        element: <Index/>,
        children: [
            { 
                path: '/',
                element: <LoginPage/>
            },
            { 
                path: '/register',
                element: <RegisterPage/>
            }
        ]
    },
    { 
        path: '*',
        element: <Navigate to="/"/>
    }
])