import { useContext, useEffect, useState } from "react";
import { Vehicles } from "../../interfaces/globalTypes";
import TableVehicles from "./TableVehicles";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";
import Progress from "../../utils/Progress";
import { supabase } from "../../utils/supabaseAccess";
 
const VehiclesInfo = () => {
    //creamos un estdo para almacenar la informacion de los vehiculos
    const [dataVehicle, setDataVehicle] = useState<Vehicles[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    //creamos la conexion con la tabla de datos
    useEffect(()=>{
        const getVehicles = async(): Promise<void>=>{
            try {
                setLoading(true);
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
            }finally{
                setLoading(false);
            }
        }

        getVehicles();
    },[])

    const context = useContext(UserContext);

    if(!context) {
        throw new Error("no context")
    }

    const { user, loadingAuth } = context;

    if (loadingAuth) return (
        <Progress/>
      );
    if(!user) return <Navigate to='/' />

  return (
    <div>
        <TableVehicles dataVehicle={ dataVehicle } loading={ loading }/>
    </div>
  )
}

export default VehiclesInfo