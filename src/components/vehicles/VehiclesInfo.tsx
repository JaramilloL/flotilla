import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Vehicles } from "../../interfaces/globalTypes";

//creamos el acceso a la base de datos de usuer para mostrar informacion
const supabase = createClient(
    import.meta.env.VITE_APP_URL || "",
    import.meta.env.VITE_APP_KEY || ""
  );
  
const VehiclesInfo = () => {
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

  return (
    <div>
        {
            dataVehicle && dataVehicle.map(item => (
                <div key={item.id_vehicle}>
                    <p>{item.model}</p>
                </div>
            ))
        }
    </div>
  )
}

export default VehiclesInfo