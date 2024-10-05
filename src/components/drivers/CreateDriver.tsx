import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { Drivers } from "../../interfaces/globalTypes";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import ShortUniqueId from "short-unique-id";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";


//en este componente vamos a crear el formulario para agregar usuarios mediante insert
const supabase = createClient(
    import.meta.env.VITE_APP_URL || "",
    import.meta.env.VITE_APP_KEY || ""
  );

  interface Id_Info {
    id_users?: string;
    id_vehicle?: string;
  }

const CreateDriver = () => {
    const uid = new ShortUniqueId({ length: 10, dictionary: "number" });
    const id = uid.randomUUID();

    //creamos un estado para el envio de datos
    const [loadingCharge, setLoadingCharge] = useState<boolean>(false)

    //vamos a crear dos estado para añmacenar la información sobre el user y el vehicle
    const [dataUser, setDataUser] = useState<Id_Info[]>([])
    const [dataVehicle, setdataVehicle] = useState<Id_Info[]>([])

    useEffect(()=>{
        (async()=>{
            try {
                const { data: dataUsers, error: errorUser } = await supabase.from('users').select('id_users')
                const { data: dataVehicles, error: errorVehicle } = await supabase.from('vehicles').select('id_vehicle')

                if(errorUser){
                    console.log(errorUser?.message)
                    toast.error(errorUser?.message)
                }else{
                    setDataUser(dataUsers || [])
                }

                if(errorVehicle){
                    console.log(errorVehicle?.message)
                    toast.error(errorVehicle?.message)
                }else{
                    setdataVehicle(dataVehicles || [])
                }

            } catch (error) {
                if(error instanceof Error) {
                    console.log(error.message)
                }
            }
        })()
    },[])

  //usamos el hook de react-hook-form
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    // setValue
  } = useForm<Drivers>();

  const onSubmit: SubmitHandler<Drivers> = async(dataDriver): Promise<void> => {
    try {
        setLoadingCharge(true);
        const { data, error } = await supabase.from('drivers').insert({
            id_drivers: id,
            license_number: dataDriver.license_number,
            experience_years: dataDriver.experience_years,
            license_type: dataDriver.license_type,
            vehicle_id: dataDriver.vehicle_id,  // Agregamos vehicle_id
            user_id: dataDriver.user_id  // Agregamos user_id

        })

        if(error) {
            console.log(error.message)
            toast.error(error.message)
        }else{
            console.log(data)
            toast.success('Driver is has been successfully')
        }
      console.log(data);
      reset();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }finally{
        setLoadingCharge(false)
    }
  };

  return (
    <Box
      component="form"
      width="90%"
      m="0 auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box>
        <Button variant="contained" color="secondary">
          <Link
            to="/drivers"
            style={{ textDecoration: "none", color: "white" }}
          >
            Table
          </Link>
        </Button>
      </Box>
      <TextField
        id="license_number"
        label="license_number"
        margin="normal"
        type="text"
        error={!!errors?.license_number}
        helperText={errors?.license_number?.message}
        fullWidth
        {...register("license_number", {
          required: {
            value: true,
            message: "license is required",
          },
        })}
      />

      <TextField
        id="experience_years"
        label="experience_years"
        margin="normal"
        type="number"
        error={!!errors?.experience_years}
        helperText={errors?.experience_years?.message}
        fullWidth
        {...register("experience_years", {
          required: {
            value: true,
            message: "license is required",
          },
        })}
      />

      <TextField
        id="license_type"
        label="license_type"
        margin="normal"
        type="text"
        error={!!errors?.license_type}
        helperText={errors?.license_type?.message}
        fullWidth
        {...register("license_type", {
          required: {
            value: true,
            message: "license is required",
          },
        })}
      />

       {/* Select para Vehicle */}
       <FormControl fullWidth margin="normal">
                <InputLabel id="vehicle-label">Vehicle</InputLabel>
                <Select
                    labelId="vehicle-label"
                    id="vehicle_id"
                    {...register("vehicle_id", { required: true })}
                    error={!!errors?.vehicle_id}
                    defaultValue=""
                >
                    {dataVehicle.map(vehicle => (
                        <MenuItem key={vehicle.id_vehicle} value={vehicle.id_vehicle}>
                            {vehicle.id_vehicle}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Select para User */}
            <FormControl fullWidth margin="normal">
                <InputLabel id="user-label">User</InputLabel>
                <Select
                    labelId="user-label"
                    id="user_id"
                    {...register("user_id", { required: true })}
                    error={!!errors?.user_id}
                    defaultValue=""
                >
                    {dataUser.map(user => (
                        <MenuItem key={user.id_users} value={user.id_users}>
                            {user.id_users}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

      <Box display="flex" justifyContent="center">
        <Button variant="contained" color="primary" type="submit" disabled={loadingCharge}>
          { loadingCharge ? 'Loading...' : 'Create'}
        </Button>
      </Box>
      <ToastContainer/>
    </Box>
  );
};

export default CreateDriver;
