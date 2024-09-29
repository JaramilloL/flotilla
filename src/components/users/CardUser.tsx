import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2,
  Typography,
} from "@mui/material";
import { UserFlotilla } from "../../interfaces/globalTypes";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import FormUpdate from "./FormUpdate";

interface DataUser {
  dataUser: UserFlotilla[] | undefined;
}

//creamos el acceso a la base de datos de usuer para mostrar informacion
const supabase = createClient(
  import.meta.env.VITE_APP_URL || "",
  import.meta.env.VITE_APP_KEY || ""
);

const CardUser = ({ dataUser }: DataUser) => {
  const [users, setUsers] = useState(dataUser);
  //formulario de edicion
  const [editUser, setEditUser] = useState<UserFlotilla | null>(null);

  //crearemos una funcion de eliminar datos mediante e metodo delete de supabase
  const deleteUser = async (id_users: number): Promise<void> => {
    console.log("Intentando eliminar usuario con ID:", id_users);
    try {
      const { data, error } = await supabase
        .from("users")
        .delete()
        .eq("id_users", id_users);

      if (error) {
        console.log(error.message);
      } else {
        // Filtramos el usuario eliminado del estado de `users`
        console.log("Usuario eliminado:", data);
        setUsers((prevUsers) =>
          prevUsers?.filter((user) => user.id_users !== id_users)
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  // Función para actualizar usuario
  const updateUser = async () => {
    if (editUser) {
      try {
        console.log("Actualizando usuario con ID:", editUser.id_users);
        const { data, error } = await supabase
          .from("users")
          .update({
            name: editUser.name,
            email: editUser.email,
            phone_number: editUser.phone_number,
            role: editUser.role,
          })
          .eq("id_users", editUser.id_users);

        if (error) {
          console.log(error.message);
        } else {
          console.log("Usuario actualizado:", data);
          setUsers((prevUsers) =>
            prevUsers?.map((user) =>
              user.id_users === editUser.id_users ? editUser : user
            )
          );
          setEditUser(null); // Cerrar el formulario de edición
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
  };

  return (
    <Grid2 container spacing={2}>
      {users &&
        users.map((item) => (
          <Card sx={{ maxWidth: 250 }} key={item.id_users}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign="center"
              >
                {item.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <strong>Email: </strong>
                {item.email}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <strong>Phoen_Number: </strong>
                {item.phone_number}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <strong>Role: </strong>
                {item.role}
              </Typography>
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="space-evenly" width="100%">
                <Button
                  size="small"
                  color="error"
                  onClick={() => {
                    console.log("Eliminando usuario con ID:", item.id_users);
                    deleteUser(item.id_users);
                  }}
                >
                  Delete
                </Button>
                <Button
                  size="small"
                  color="info"
                  onClick={() => setEditUser(item)}
                >
                  Update
                </Button>
              </Box>
            </CardActions>
          </Card>
        ))}

      {editUser && (
        <FormUpdate
          editUser={editUser}
          setEditUser={setEditUser}
          updateUser={updateUser}
        />
      )}
    </Grid2>
  );
};

export default CardUser;
