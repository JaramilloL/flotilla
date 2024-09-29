import { createClient } from "@supabase/supabase-js";
import { useContext, useEffect, useState } from "react";
import { Vehicles } from "../../interfaces/globalTypes";
import TableVehicles from "./TableVehicles";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

//creamos el acceso a la base de datos de usuer para mostrar informacion
const supabase = createClient(
    import.meta.env.VITE_APP_URL || "",
    import.meta.env.VITE_APP_KEY || ""
  );
  
const VehiclesInfo = () => {
    //tramos el contexto de la aplicacion para verificar el acceso a la pagina
    const context = useContext(UserContext)

    if(!context) {
        throw new Error("no context")
    }
    const { user } = context || {};
    //creamos un estdo para almacenar la informacion de los vehiculos
    const [dataVehicle, setDataVehicle] = useState<Vehicles[]>([])

    //creamos la conexion con la tabla de datos
    useEffect(()=>{
        const getVehicles = async(): Promise<void>=>{
            try {
                const { data, error } = await supabase.from('vehicles').select('*');

                if(error){
                    console.log(error.message)
                }else{
                    console.log(data)
                    setDataVehicle(data)
                }
            } catch (error) {
                if(error instanceof Error) {
                    console.log(error.message)
                }
            }
        }

        getVehicles();
    },[])

    if(!user) return <Navigate to='/'/>

  return (
    <div>
        <TableVehicles dataVehicle={ dataVehicle } />
    </div>
  )
}

export default VehiclesInfo