import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, Navigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Transport } from "../../interfaces/globalTypes";
import ShortUniqueId from "short-unique-id";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";

//en este componente vamos a crear el formulario para agregar usuarios mediante insert
const supabase = createClient(
  import.meta.env.VITE_APP_URL || "",
  import.meta.env.VITE_APP_KEY || ""
);

interface vehicle {
  id_vehicle: number;
}

const TrasnportForm = () => {
  //creacion del id
  const uid = new ShortUniqueId({ length: 10, dictionary: "number" });
  const id = uid.randomUUID();

  //creamos un estado para lamcenar los id de los vehiculos
  const [dataVehicle, setDataVehicle] = useState<vehicle[]>([]);

  //hacemos uso de react-hook-form para el envio de datos
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Transport>();

  const onSubmit: SubmitHandler<Transport> = async (dataT): Promise<void> => {
    try {
      const { data, error } = await supabase.from("transport_types").insert([
        {
          id_tranport: id,
          name: dataT.name,
          description: dataT.description,
          id_type: dataT.id_type,
        },
      ]);

      if (error) {
        toast.error(error.message);
      } else console.log("exito", data);
      reset();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    try {
      (async () => {
        const { data, error } = await supabase
          .from("vehicles")
          .select("model,id_vehicle");

        if (error) {
          toast.error(error.message);
        } else {
          setDataVehicle(data);
        }
      })();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, []);
  //exytaemos el contexto para ver si esta autenticado
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("no context");
  }

  const { user, loadingAuth } = context || {};
  if (loadingAuth) return <h1>Loading...</h1>;
  if (!user) return <Navigate to="/" />;
  return (
    <Box
      component="form"
      width="90%"
      m="0 auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box>
        <Button variant="contained" color="secondary" sx={{ m: 1 }}>
          <Link
            to="/transport"
            style={{ textDecoration: "none", color: "white" }}
          >
            List
          </Link>
        </Button>
      </Box>
      <TextField
        id="name"
        label="name"
        margin="normal"
        autoComplete="off"
        type="text"
        fullWidth
        error={!!errors?.name}
        helperText={errors?.name?.message}
        {...register("name", {
          required: {
            value: true,
            message: "Please enter a name",
          },
        })}
      />

      <TextField
        id="description"
        label="description"
        margin="normal"
        autoComplete="off"
        type="text"
        fullWidth
        error={!!errors?.description}
        helperText={errors?.description?.message}
        {...register("description", {
          required: {
            value: true,
            message: "Please enter a description",
          },
        })}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="vehicle-label">Vehicle</InputLabel>
        <Select
          labelId="vehicle-label"
          id="vehicle_id"
          {...register("id_type", { required: true })}
          error={!!errors?.id_type}
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

export default TrasnportForm;
