import { createClient } from "@supabase/supabase-js";
import { useContext, useEffect, useState } from "react";
import { Drivers } from "../../interfaces/globalTypes";
import DriverTable from "./DriverTable";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

//creamos el acceso a la base de datos de usuer para mostrar informacion
const supabase = createClient(
    import.meta.env.VITE_APP_URL || "",
    import.meta.env.VITE_APP_KEY || ""
  );


const DriverInfo = () => {
    //creamos un estado para almacenar los datos
    const [dataDrivers, setDataDrivers] = useState<Drivers[]>([])
    const [loadinData, setLoadinData] = useState<boolean>(false)
    useEffect(() =>{
        (async()=>{
            try {
                setLoadinData(true)
                const { data, error } = await supabase.from('drivers').select('*')

                if(error) {
                    console.log(error.message)
                }else{
                    console.log('mostrando data')
                    setDataDrivers(data)
                }

            } catch (error) {
                if(error instanceof Error) {
                    console.log(error.message)
                }
            }finally{
                setLoadinData(false)
            }

        })()
    },[])

    //vamos a evaluar el contexto de la app para realizar la vista
    const context = useContext(UserContext)

    if(!context){
        throw new Error("no context")
    }

    const { loadingAuth, user } = context || {}

    if(loadingAuth) return <h1>Loading.....</h1>

    if(!user) return <Navigate to="/" />
  return (
    <div>
        <DriverTable dataDrivers={dataDrivers} loadingData={ loadinData }/>
    </div>
  )
}

export default DriverInfo