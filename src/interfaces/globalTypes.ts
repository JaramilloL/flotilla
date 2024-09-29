import { User } from "@supabase/supabase-js";
import { ReactNode } from "react";

export interface Auth{
    username?: string;
    email: string;
    password: string;
}

export interface UserFlotilla{
    id_users: number;
    name: string;
    email: string;
    password: string;
    role: string;
    phone_number: number;
}

export interface Divers{
    id_drivers: string;
    user_id: string;
    licence_number: number;
    license_type: string;
    experience_year: number;
    vehicle_id: string;
}

export interface Trips{
    id_trip: string;
    vehicle_id: string;
    driver_id: string;
    transport_id: string;
    origin: string;
    destination: string;
    distance: number;
    trip_date: string;
    status: string;
    fuel_consumed: number;
    notes: string;
}

export interface Vehicles{
    id_vehicle: number;
    plate_number: string;
    model: string;
    brand: string;
    type: string;
    capacity: number;
    status: string;
    mileage: number;
}

export interface Transport{
    id_transport: string;
    name: string;
    description: string;
}

export interface Maintenance{
    id_maintenance: string;
    vehicle_id: string;
    maintenance_type: string;
    date: string;
    cost: number;
    notes: string;
}

export interface StateChildren{
    children: ReactNode
}

export interface StateUser{
    signUpUser: (email: string, password: string) => Promise<void>;
    user: User | null; 
    sigIn: (email: string, password: string) => Promise<void>;
    signOutUser: (()=> Promise<void> | undefined);
}