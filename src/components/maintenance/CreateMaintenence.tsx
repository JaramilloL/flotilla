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
import { Link } from "react-router-dom";
import { Maintenance } from "../../interfaces/globalTypes";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import ShortUniqueId from "short-unique-id";

//en este componente vamos a crear el formulario para agregar usuarios mediante insert
const supabase = createClient(
  import.meta.env.VITE_APP_URL || "",
  import.meta.env.VITE_APP_KEY || ""
);

interface Id_vehicle {
  id_vehicle: number;
}

const CreateMaintenence = () => {
  //creacion del id
  const uid = new ShortUniqueId({ length: 10, dictionary: "number" });
  const id = uid.randomUUID();
  //extraemos de la tabla de vehiculos para elejir el vehiculo
  const [dataVehicle, setdataVehicle] = useState<Id_vehicle[]>([]);

  //usamos react-hook-form para los datos
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Maintenance>();

  const onSubmit: SubmitHandler<Maintenance> = async (dataM): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from("maintenance_records")
        .insert([
          {
            id_maintenance: id,
            maintenance_type: dataM.maintenance_type,
            date: dataM.date,
            cost: dataM.cost,
            notes: dataM.notes,
            vehicle_id: dataM.vehicle_id,
          },
        ]);

      if (error) {
        console.log(error.message);
      } else {
        console.log("exito al crear", data);
      }
      console.log(dataM);
      reset();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const { data: dataV, error: errorV } = await supabase
        .from("vehicles")
        .select("id_vehicle");

      if (errorV) {
        console.log(errorV.message);
      } else {
        setdataVehicle(dataV || []);
      }
    })();
  }, []);

  return (
    <Box
      component="form"
      m="0 auto"
      width="90%"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box>
        <Button variant="contained" color="secondary">
          <Link
            to="/maintenance"
            style={{ textDecoration: "none", color: "white" }}
          >
            Table
          </Link>
        </Button>
      </Box>
      <TextField
        id="maintenance_type"
        label="maintenance_type"
        margin="normal"
        type="text"
        autoComplete="off"
        error={!!errors?.maintenance_type}
        helperText={errors?.maintenance_type?.message}
        fullWidth
        {...register("maintenance_type", {
          required: {
            value: true,
            message: "Please select the maintenance type",
          },
        })}
      />

      <TextField
        id="cost"
        label="cost"
        margin="normal"
        type="number"
        autoComplete="off"
        error={!!errors?.cost}
        helperText={errors?.cost?.message}
        fullWidth
        {...register("cost", {
          required: {
            value: true,
            message: "Please select the maintenance type",
          },
        })}
      />

      <TextField
        id="notes"
        label="notes"
        margin="normal"
        type="text"
        autoComplete="off"
        error={!!errors?.notes}
        helperText={errors?.notes?.message}
        fullWidth
        {...register("notes", {
          required: {
            value: true,
            message: "Please select the maintenance type",
          },
        })}
      />

      <TextField
        id="date"
        margin="normal"
        type="datetime-local"
        autoComplete="off"
        error={!!errors?.date}
        helperText={errors?.date?.message}
        fullWidth
        {...register("date", {
          required: {
            value: true,
            message: "Please select the maintenance type",
          },
        })}
      />

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

      <Box display="flex" justifyContent="center">
        <Button variant="contained" color="secondary" type="submit">
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default CreateMaintenence;
