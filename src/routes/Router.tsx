import { createBrowserRouter, Navigate } from "react-router-dom";
import Index from "../layout/Index";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import UserPage from "../pages/users/UserPage";
import FormPage from "../pages/users/FormPage";

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
            },
            { 
                path: '/users',
                element: <UserPage/>
            },
            { 
                path: '/formUser',
                element: <FormPage/>
            }
        ]
    },
    { 
        path: '*',
        element: <Navigate to="/"/>
    }
])