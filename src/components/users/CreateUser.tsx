import { Box, TextField, Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserFlotilla } from "../../interfaces/globalTypes";
// import { createClient } from "@supabase/supabase-js";

//en este componente vamos a crear el formulario para agregar usuarios mediante insert
// const supabase = createClient(
//     import.meta.env.VITE_APP_URL || "",
//     import.meta.env.VITE_APP_KEY || ""
//   );
const CreateUser = () => {
    //usamos react-hook-form para el registro de datos y el envio
    const { handleSubmit, register, reset, formState: { errors } } = useForm<UserFlotilla>()

    const onSubmit: SubmitHandler<UserFlotilla> = (data) => {
        try {
            console.log(data)
            reset()
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
        }
    }
  return (
    <Box component='form' m='0 auto' width='70%' onSubmit={ handleSubmit(onSubmit) }>
        <TextField
          id="name"
          label="name"
          margin="normal"
          error={ !!errors?.name }
          helperText={ errors?.name?.message }
          type="text"
          autoComplete="off"
          fullWidth
          {
            ...register('name', {
                required: {
                    value: true,
                    message: 'name is required'
                }
            })
          }
        />

        <Box display='flex' justifyContent='center' width='100%'>
            <Button variant="contained" color="secondary" type="submit">
              Add User
            </Button>
        </Box>
    </Box>
  )
}

export default CreateUser