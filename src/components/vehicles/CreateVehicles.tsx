import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { Vehicles } from "../../interfaces/globalTypes";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Progress from "../../utils/Progress";
import { supabase } from "../../utils/supabaseAccess";
import { id } from "../../utils/GenerateId";

const CreateVehicles = () => {
  const context = useContext(UserContext);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Vehicles>();

  const onSubmit: SubmitHandler<Vehicles> = async (dataV): Promise<void> => {
    try {
      const { data, error } = await supabase.from("vehicles").insert([
        {
          id_vehicle: id,
          plate_number: dataV.plate_number,
          model: dataV.model,
          brand: dataV.brand,
          capacity: dataV.capacity,
          type: dataV.type,
          status: dataV.status,
          mileage: dataV.mileage,
          created_at: new Date().toISOString(),
        },
      ]);
      if (error) {
        toast.error(`Error al insertar vehículo: ${error.message}`);
      } else {
        toast.success("Vehículo insertado con éxito");
        console.log(data);
      }
      console.log(dataV);
      reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  if (!context) {
    throw new Error("no context");
  }

  const { user, loadingAuth } = context || {};
  if (loadingAuth)
    return (
      <Progress/>
    );

  if (!user) return <Navigate to="/" />;

  return (
    <Box
      component="form"
      m="0 auto"
      width="70%"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box display="block">
        <Button variant="contained" color="secondary">
          <Link
            to="/vehicles"
            style={{ textDecoration: "none", color: "white" }}
          >
            Table
          </Link>
        </Button>
      </Box>
      <TextField
        id="model"
        label="model"
        margin="normal"
        type="text"
        error={!!errors?.model}
        helperText={errors?.model?.message}
        fullWidth
        {...register("model", {
          required: {
            value: true,
            message: "model is required",
          },
        })}
      />

      <TextField
        id="brand"
        label="brand"
        margin="normal"
        type="text"
        error={!!errors?.brand}
        helperText={errors?.brand?.message}
        fullWidth
        {...register("brand", {
          required: {
            value: true,
            message: "brand is required",
          },
        })}
      />

      <TextField
        id="capacity"
        label="capacity"
        margin="normal"
        type="number"
        error={!!errors?.capacity}
        helperText={errors?.capacity?.message}
        fullWidth
        {...register("capacity", {
          required: {
            value: true,
            message: "capacity is required",
          },
        })}
      />

      <TextField
        id="mileage"
        label="mileage"
        margin="normal"
        type="number"
        error={!!errors?.mileage}
        helperText={errors?.mileage?.message}
        fullWidth
        {...register("mileage", {
          required: {
            value: true,
            message: "mileage is required",
          },
        })}
      />

      <TextField
        id="plate_number"
        label="plate_number"
        margin="normal"
        type="text"
        error={!!errors?.plate_number}
        helperText={errors?.plate_number?.message}
        fullWidth
        {...register("plate_number", {
          required: {
            value: true,
            message: "plate_number is required",
          },
        })}
      />

      <TextField
        id="status"
        label="status"
        margin="normal"
        type="text"
        error={!!errors?.status}
        helperText={errors?.status?.message}
        fullWidth
        {...register("status", {
          required: {
            value: true,
            message: "status is required",
          },
        })}
      />

      <TextField
        id="type"
        label="type"
        margin="normal"
        type="text"
        error={!!errors?.type}
        helperText={errors?.type?.message}
        fullWidth
        {...register("type", {
          required: {
            value: true,
            message: "type is required",
          },
        })}
      />

      <Box display="flex" justifyContent="center">
        <Button variant="contained" color="secondary" type="submit">
          Create Vehicle
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default CreateVehicles;
