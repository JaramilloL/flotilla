//vamos a traer la llave pra la conexion a supabase

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Trips } from "../../interfaces/globalTypes";
import TripsCard from "./TripsCard";

//creamos el acceso a la base de datos de usuer para mostrar informacion
const supabase = createClient(
    import.meta.env.VITE_APP_URL || "",
    import.meta.env.VITE_APP_KEY || ""
);

const TripsInfo = () => {
    //creamos un estado pra almacenar los datos de supabase
    const [dataTrips, setDataTrips] = useState<Trips[]>([])
    useEffect(()=>{
        try {
            (async()=>{
                const { data, error } = await supabase.from('trips').select('*')

                if(error) {
                    toast.error(error.message)
                }else{
                    setDataTrips(data)
                }
            })()
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
        }
    },[])

  return (
    <div>
        <TripsCard dataTrips={dataTrips} />
    </div>
  )
}

export default TripsInfo