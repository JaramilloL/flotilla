import { Box, Button, TextField, Typography } from "@mui/material";
import { UserFlotilla } from "../../interfaces/globalTypes";

interface functionUpdate {
  editUser: UserFlotilla;
  setEditUser: (value: UserFlotilla | null) => void;
  updateUser: (value: UserFlotilla) => void;
}

const FormUpdate = ({ editUser, setEditUser, updateUser }: functionUpdate) => {
  return (
    <Box
      sx={{
        padding: 3,
        border: "1px solid gray",
        borderRadius: 2,
        width: 300,
        marginTop: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Editar Usuario
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Nombre"
        value={editUser.name}
        onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        value={editUser.email}
        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Teléfono"
        value={editUser.phone_number}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            phone_number: parseInt(e.target.value, 10),
          })
        }
      />
      <TextField
        fullWidth
        margin="normal"
        label="Rol"
        value={editUser.role}
        onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => updateUser(editUser)}
      >
        Guardar Cambios
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => setEditUser(null)}
      >
        Cancelar
      </Button>
    </Box>
  );
};

export default FormUpdate;
