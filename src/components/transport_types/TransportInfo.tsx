import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react"
import { Transport } from "../../interfaces/globalTypes";
import TrasportList from "./TrasportList";
import { Typography } from "@mui/material";


//creamos el acceso a la base de datos de usuer para mostrar informacion
const supabase = createClient(
    import.meta.env.VITE_APP_URL || "",
    import.meta.env.VITE_APP_KEY || ""
  );

const TransportInfo = () => {
    const [dataTrasnports, setDataTrasnports] = useState<Transport[]>([])
    //vamos a traer la informacion existente de la labla

    useEffect(()=>{
        try {
            (async()=>{
                const { data, error } = await supabase.from('transport_types').select('*')
    
                if(error) {
                    console.log(error.message)
                }else{
                    console.log(data)
                    setDataTrasnports(data)
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
        <Typography variant="h5" textAlign='center'>Types of Trasnports</Typography>
        <TrasportList dataTrasnports={ dataTrasnports } /> 
    </div>
  )
}

export default TransportInfo