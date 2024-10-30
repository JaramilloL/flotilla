//vamos a traer la llave pra la conexion a supabase
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Trips } from "../../interfaces/globalTypes";
import TripsCard from "./TripsCard";
import { supabase } from "../../utils/supabaseAccess";
import Progress from "../../utils/Progress";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

const TripsInfo = () => {

  //creamos un estado pra almacenar los datos de supabase
  const [dataTrips, setDataTrips] = useState<Trips[]>([]);
  //creamos el estado de carga de los datos
  const [loadingData, setLoadingData] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoadingData(true);
        const { data, error } = await supabase.from("trips").select("*");

        if (error) {
          toast.error(error.message);
        } else {
          setDataTrips(data || []);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setLoadingData(false);
      }
    })();
  }, []);

  const deleteTrips = async (id_trip: number) => {
    try {
      const { error } = await supabase.from('trips').delete().eq('id_trips', id_trip);

      if(error){
        toast.error(error.message);
      }else{
        setDataTrips((prev) => prev?.filter((data) => data?.id_trips !== id_trip))
      }
    } catch (error) {
      if(error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  //graemos el contexto dela app para ver si el usuario esta autenticado
  const context = useContext(UserContext)
  
  if (loadingData) {
    return (
      <Progress/>
    );
  }
  if(!context){
      throw new Error('no context available')
  }

  const { user, loadingAuth } = context || {};

  if(loadingAuth) return (
      <Progress/>
    );
  if(!user) return <Navigate to='/'/>
  return (
    <div>
      {
        user && user?.role === 'super_admin' ? (<>
          <p>Super Admin</p>
        </>): (
          <>
            <p>no super admin</p>
          </>
        )
      }
      <TripsCard dataTrips={dataTrips} deleteTrips={deleteTrips} />
    </div>
  );
};

export default TripsInfo;
