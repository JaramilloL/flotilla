import { Box, TextField, Button } from "@mui/material"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { Navigate } from "react-router-dom";

const TrasnportForm = () => {
    //exytaemos el contexto para ver si esta autenticado
    const context = useContext(UserContext);

    if(!context) {
        throw new Error("no context")
    }

    const { user, loadingAuth } = context || {}
    if(loadingAuth) return <h1>Loading...</h1>
    if(!user) return <Navigate to="/" />
  return (
    <Box component='form' width='90%' m='0 auto'>
        <TextField
          id="name"
          label="name"
          margin='normal'
          autoComplete="off"
          type="text"
          fullWidth
          
        />
        <Box display='flex' justifyContent='center'>
            <Button variant="contained" color="secondary" type="submit">
              Create
            </Button>
        </Box>
    </Box>
  )
}

export default TrasnportForm