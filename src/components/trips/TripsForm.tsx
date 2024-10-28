import { SubmitHandler, useForm } from "react-hook-form";
import { Trips } from "../../interfaces/globalTypes";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../../utils/supabaseAccess";
import { id } from "../../utils/GenerateId";
import TripsFormUI from "./TripsFormUI";

interface Id_vehicle {
  id_vehicle: number;
}
interface Id_driver {
  id_drivers: number;
}
interface Id_transport {
  id_tranport: number;
}

const TripsForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Trips>();

  //creamos un estado para almacenar los id de los vehiculos
  const [dataVehicle, setDataVehicle] = useState<Id_vehicle[]>([]);
  const [dataDrivers, setDataDrivers] = useState<Id_driver[]>([]);
  const [dataTransport, setDataTransport] = useState<Id_transport[]>([]);

  //creamos un estado de carga
  const [loading, setLoading] = useState<boolean>(false);

  //vamos a traer la informacion de vehicles
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data: dataVehicles, error: errorVehicle } = await supabase
          .from("vehicles")
          .select("id_vehicle");
        const { data: dataDrivers, error: errorDrivers } = await supabase
          .from("drivers")
          .select("id_drivers");
        const { data: dataTransport, error: errorTransport } = await supabase
          .from("transport_types")
          .select("id_tranport");

        if (errorVehicle) {
          console.log(errorVehicle.message);
        } else {
          setDataVehicle(dataVehicles || []);
        }

        if (errorDrivers) {
          console.log(errorDrivers.message);
        } else {
          setDataDrivers(dataDrivers || []);
        }

        if (errorTransport) {
          console.log(errorTransport.message);
        } else {
          setDataTransport(dataTransport || []);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onSubmit: SubmitHandler<Trips> = async (dataTrip) => {
    try {
      setLoading(true)
      reset();
      console.log(dataTrip);
      const { data, error } = await supabase.from("trips").insert({
        id_trips: id,
        origin: dataTrip.origin,
        destination: dataTrip.destination,
        distance: dataTrip.distance,
        trip_date: dataTrip.trip_date,
        status: dataTrip.status,
        fuel_consumed: dataTrip.fuel_consumed,
        notes: dataTrip.notes,
        vehicle_id: dataTrip.vehicle_id,
        driver_id: dataTrip.driver_id,
        transport_id: dataTrip.transport_id,
      });

      if (error) {
        console.log(error.message);
        toast.error(error.message);
      } else {
        console.log(data);
        toast.success("Agree succefully");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }finally{
      setLoading(false)
    }
  };
  return (
    <TripsFormUI
    onSubmit={handleSubmit(onSubmit)}
    register={register}
    errors={errors}
    dataVehicle={dataVehicle}
    dataDrivers={dataDrivers}
    dataTransport={dataTransport}
    loading={loading}
    />
  );
};

export default TripsForm;
