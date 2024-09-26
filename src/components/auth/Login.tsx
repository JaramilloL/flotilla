import { Box, Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Auth } from "../../interfaces/globalTypes";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //usamos el contexto de la app para iniciar secion
  const context = useContext(UserContext)

  if(!context){
    throw new Error("Usuario no logeado correctamente");
  }

  const { sigIn, user } = context || {};

  //usamos la navegacion para la reedireccion
  const navigate = useNavigate()

  //usaremos la libreria de react-hook-form para registrar los datos del usuario
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<Auth>(); //le pasamos los parametros a esperar

  //creamos la funcion de envio de datos del usuario
  const onSubmit: SubmitHandler<Auth> = async(data) => {
    try {
      console.log(data);
      await sigIn(data.email, data.password)
      reset();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  useEffect(()=>{
    if(user){
      navigate('/users')
    }
  },[user, navigate])
  return (
    <Box
      component="form"
      width="70%"
      m="0 auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        id="email"
        label="email"
        margin="normal"
        type="email"
        error={!!errors?.email}
        helperText={errors?.email?.message}
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
        type="password"
        error={!!errors?.password}
        helperText={errors?.password?.message}
        fullWidth
        {...register("password", {
          required: {
            value: true,
            message: "Password is required",
          },
        })}
      />

      <Box display="flex" justifyContent="center">
        <Button variant="contained" color="secondary" type="submit">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
