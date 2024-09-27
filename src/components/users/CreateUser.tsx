import { Box, TextField, Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserFlotilla } from "../../interfaces/globalTypes";
import { createClient } from "@supabase/supabase-js";
import ShortUniqueId from 'short-unique-id';

//en este componente vamos a crear el formulario para agregar usuarios mediante insert
const supabase = createClient(
    import.meta.env.VITE_APP_URL || "",
    import.meta.env.VITE_APP_KEY || ""
  );
const CreateUser = () => {
    const uid = new ShortUniqueId({ length: 10, dictionary: 'number' });
    const id =  uid.randomUUID();

  //usamos react-hook-form para el registro de datos y el envio
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<UserFlotilla>();

  const onSubmit: SubmitHandler<UserFlotilla> = async(dataInfo): Promise<void> => {
    try {
        //creamos la insercion de datos en supabase
        const { data, error } = await supabase.from("users").insert([
            { 
                name: dataInfo.name,
                email: dataInfo.email,
                password: dataInfo.password,
                phone_number: dataInfo.phone_number,
                role: dataInfo.role,
                id_users: id
            }
        ])
        if(error) {
            console.log(error.message)
        }else{
            console.log(data)
        }
      console.log(dataInfo);
      reset();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  return (
    <Box
      component="form"
      m="0 auto"
      width="70%"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        id="name"
        label="name"
        margin="normal"
        error={!!errors?.name}
        helperText={errors?.name?.message}
        type="text"
        autoComplete="off"
        fullWidth
        {...register("name", {
          required: {
            value: true,
            message: "name is required",
          },
        })}
      />

      <TextField
        id="email"
        label="email"
        margin="normal"
        error={!!errors?.email}
        helperText={errors?.email?.message}
        type="email"
        autoComplete="off"
        fullWidth
        {...register("email", {
          required: {
            value: true,
            message: "Email is required",
          },
        })}
      />

      <TextField
        id="password"
        label="password"
        margin="normal"
        error={!!errors?.password}
        helperText={errors?.password?.message}
        type="password"
        autoComplete="off"
        fullWidth
        {...register("password", {
          required: {
            value: true,
            message: "password is required",
          },
        })}
      />

      <TextField
        id="phone_number"
        label="phone_number"
        margin="normal"
        error={!!errors?.phone_number}
        helperText={errors?.phone_number?.message}
        type="tel"
        autoComplete="off"
        fullWidth
        {...register("phone_number", {
          required: {
            value: true,
            message: "phone_number is required",
          },
        })}
      />

      <TextField
        id="role"
        label="role"
        margin="normal"
        error={!!errors?.role}
        helperText={errors?.role?.message}
        type="text"
        autoComplete="off"
        fullWidth
        {...register("role", {
          required: {
            value: true,
            message: "role is required",
          },
        })}
      />

      <Box display="flex" justifyContent="center" width="100%">
        <Button variant="contained" color="secondary" type="submit">
          Add User
        </Button>
      </Box>
    </Box>
  );
};

export default CreateUser;
