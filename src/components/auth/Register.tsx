import { Box, TextField, Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Auth } from "../../interfaces/globalTypes";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  //llamamos el estado creado para asignarle el usuario creado
  const context = useContext(UserContext);
  // Verificar si el contexto existe
  if (!context) {
    throw new Error("UserContext debe estar dentro de un StateContext");
  }
  //desestructuramos el context
  const { signUpUser } = context || {};

  //usamos el hook de react-router-dom usenavigate para redireccionar al usuario
  const navigate = useNavigate();
  //usaremos la libreria de react-hook-form para registrar los datos del usuario
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<Auth>(); //le pasamos los parametros a esperar

  //creamos la funcion de envio de datos del usuario
  const onSubmit: SubmitHandler<Auth> = (data) => {
    try {
      console.log(data);
      signUpUser(data.email, data.password);
      reset();
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  return (
    <Box
      component="form"
      width="70%"
      m="0 auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        id="username"
        label="username"
        margin="normal"
        type="text"
        error={!!errors?.username}
        helperText={errors?.username?.message}
        fullWidth
        {...register("username", {
          required: {
            value: true,
            message: "Username is required",
          },
        })}
      />

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

      <Box display="flex" justifyContent="space-between">
        <Button variant="contained" color="secondary" type="submit">
          Register User
        </Button>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "darkorange",
            fontSize: "20px",
          }}
        >
          Login
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
