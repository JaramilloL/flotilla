//vamos a traer la llave pra la conexion a supabase
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Trips } from "../../interfaces/globalTypes";
import TripsCard from "./TripsCard";
import { supabase } from "../../utils/supabaseAccess";
import Progress from "../../utils/Progress";

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

  if (loadingData) {
    return (
      <Progress/>
    );
  }
  return (
    <div>
      <TripsCard dataTrips={dataTrips} />
    </div>
  );
};

export default TripsInfo;
