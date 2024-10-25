import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Trips } from "../../interfaces/globalTypes";
import { useEffect, useState } from "react";
import ShortUniqueId from "short-unique-id";
import { toast, ToastContainer } from "react-toastify";
import { supabase } from "../../utils/supabaseAccess";

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

  //creamos el id del id_trips
  const id_tri = new ShortUniqueId({ length: 10, dictionary: "number" });
  const id = id_tri.randomUUID();

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
    <Box
      component="form"
      width="75%"
      m="0 auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ToastContainer />
      <TextField
        id="origin"
        label="origin"
        fullWidth
        error={!!errors?.origin}
        helperText={errors?.origin?.message}
        margin="normal"
        {...register("origin", {
          required: {
            value: true,
            message: "Please enter a valid origin",
          },
        })}
      />

      <TextField
        id="destination"
        label="destination"
        fullWidth
        error={!!errors?.destination}
        helperText={errors?.destination?.message}
        margin="normal"
        {...register("destination", {
          required: {
            value: true,
            message: "Please enter a valid destination",
          },
        })}
      />

      <TextField
        id="distance"
        label="distance"
        fullWidth
        error={!!errors?.distance}
        helperText={errors?.distance?.message}
        margin="normal"
        type="number"
        {...register("distance", {
          required: {
            value: true,
            message: "Please enter a valid distance",
          },
        })}
      />

      <TextField
        id="fuel_consumed"
        label="fuel_consumed"
        fullWidth
        error={!!errors?.fuel_consumed}
        helperText={errors?.fuel_consumed?.message}
        margin="normal"
        type="number"
        {...register("fuel_consumed", {
          required: {
            value: true,
            message: "Please enter a valid fuel_consumed",
          },
        })}
      />

      <TextField
        id="notes"
        label="notes"
        fullWidth
        error={!!errors?.notes}
        helperText={errors?.notes?.message}
        margin="normal"
        {...register("notes", {
          required: {
            value: true,
            message: "Please enter a valid notes",
          },
        })}
      />

      <TextField
        id="status"
        label="status"
        fullWidth
        error={!!errors?.status}
        helperText={errors?.status?.message}
        margin="normal"
        {...register("status", {
          required: {
            value: true,
            message: "Please enter a valid status",
          },
        })}
      />

      <TextField
        id="trip_date"
        fullWidth
        error={!!errors?.trip_date}
        helperText={errors?.trip_date?.message}
        margin="normal"
        type="date"
        {...register("trip_date", {
          required: {
            value: true,
            message: "Please enter a valid trip_date",
          },
        })}
      />

      {/**creacion del select para vehicles */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="vehicle-label">Vehicle</InputLabel>
        <Select
          labelId="vehicle-label"
          id="vehicle_id"
          {...register("vehicle_id", { required: true })}
          error={!!errors?.vehicle_id}
          defaultValue=""
        >
          {dataVehicle.map((vehicle) => (
            <MenuItem key={vehicle.id_vehicle} value={vehicle.id_vehicle}>
              {vehicle.id_vehicle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/**creacion del select para drivers */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="driver-label">Driver</InputLabel>
        <Select
          labelId="driver-label"
          id="driver_id"
          {...register("driver_id", { required: true })}
          error={!!errors?.driver_id}
          defaultValue=""
        >
          {dataDrivers.map((driver) => (
            <MenuItem key={driver.id_drivers} value={driver.id_drivers}>
              {driver.id_drivers}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/**creacion del select para transport */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="transport-label">Transport</InputLabel>
        <Select
          labelId="transport-label"
          id="transport_id"
          {...register("transport_id", { required: true })}
          error={!!errors?.transport_id}
          defaultValue=""
        >
          {dataTransport.map((tranport) => (
            <MenuItem key={tranport.id_tranport} value={tranport.id_tranport}>
              {tranport.id_tranport}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Add Trip"}
        </Button>
      </Box>
    </Box>
  );
};

export default TripsForm;
