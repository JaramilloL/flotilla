import { createBrowserRouter, Navigate } from "react-router-dom";
import Index from "../layout/Index";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import UserPage from "../pages/users/UserPage";
import FormPage from "../pages/users/FormPage";
import VehiclesPage from "../pages/vehicles/VehiclesPage";
import FormVehicle from "../pages/vehicles/FormVehicle";
import DriversPage from "../pages/drivers/DriversPage";
import DriverForm from "../pages/drivers/DriverForm";
import MaintenancePage from "../pages/Maintenance/MaintenancePage";
import MaintenanceFormPage from "../pages/Maintenance/MaintenanceFormPage";
import TrasnportPage from "../pages/transport_types/TrasnportPage";
import FormTransport from "../pages/transport_types/FormTransport";

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
            },
            { 
                path: '/vehicles',
                element: <VehiclesPage/>
            },
            {
                path: '/formVehicle',
                element: <FormVehicle/>
            },
            { 
                path: '/drivers',
                element: <DriversPage/>
            },
            { 
                path: '/driverForm',
                element: <DriverForm/>
            },
            { 
                path: '/maintenance',
                element: <MaintenancePage/>
            },
            { 
                path: '/maintenanceForm',
                element: <MaintenanceFormPage/>
            },
            { 
                path: '/transport',
                element: <TrasnportPage/>
            },
            { 
                path: '/transportForm',
                element: <FormTransport/>
            }
        ]
    },
    { 
        path: '*',
        element: <Navigate to="/"/>
    }
])