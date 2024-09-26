import Button from "@mui/material/Button";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

const UserInfo = () => {
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
  if(!user) return <Navigate to='/'/>

  return (
    <div>
     <Button variant="contained" color="primary" onClick={closeseccion}>
          LogOut
        </Button>
    </div>
  );
};

export default UserInfo;
