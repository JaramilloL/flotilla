import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, Navigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { UserFlotilla } from "../../interfaces/globalTypes";
import CardUser from "./CardUser";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

//creamos el acceso a la base de datos de usuer para mostrar informacion
const supabase = createClient(
  import.meta.env.VITE_APP_URL || "",
  import.meta.env.VITE_APP_KEY || ""
);

const UserInfo = () => {
  //creamos otro estado para la carga de datos
  const [loadingData, setLoadingData] = useState<boolean>(false);
  //creamos un estdo para almacenar los datos obenidos
  const [dataUser, setDataUser] = useState<UserFlotilla[]>([]);
  //creamos un useEffect ara manejar la peticion de get para obtener los datos
  useEffect(() => {
    const getUser = async () => {
      setLoadingData(true);
      try {
        const { data, error } = await supabase.from("users").select("*");
        if (data) {
          setDataUser(data);
          console.log(`mostrando los datos de user: ${data}`);
        } else {
          setDataUser([]);
        }
        if (error) {
          console.log(error.message);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setLoadingData(false);
      }
    };

    getUser();
  }, []);
  //creamos la navegacion a inicio o login
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("a fallado");
  }
  const { signOutUser, user } = context || {};

  //creamos una funcion para cerrar ecion
  const closeseccion = () => {
    try {
      if (signOutUser) {
        signOutUser();
      }
      //   navigate('/')
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  console.log(user);
  if (!user) return <Navigate to="/" />;
  if (loadingData)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="secondary" size="50px" />
      </Box>
    );

  return (
    <div>
      <Box width="100%" display="flex" justifyContent="space-evenly">
        <Button variant="contained" color="primary" onClick={closeseccion}>
          LogOut
        </Button>
        <Button variant="contained" color="secondary">
          <Link
            to="/formUser"
            style={{ textDecoration: "none", color: "white" }}
          >
            Form
          </Link>
        </Button>
      </Box>

      <CardUser dataUser={dataUser} />
    </div>
  );
};

export default UserInfo;
