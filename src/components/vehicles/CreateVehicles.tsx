import { Box, Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Vehicles } from '../../interfaces/globalTypes'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import CircularProgress from "@mui/material/CircularProgress";
import { Navigate } from 'react-router-dom'

const CreateVehicles = () => {
    const context = useContext(UserContext)

    const { handleSubmit, register, reset, formState: { errors } } = useForm<Vehicles>()

    const onSubmit: SubmitHandler<Vehicles> = (data) => {
        try {
            console.log(data)
            reset()
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
        }
    }

    if(!context){
        throw new Error("no context")
    }

    const { user, loadingAuth } = context || {};
    if(loadingAuth) return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress color="secondary" size="50px" />
        </Box>
      );

      if(!user) return <Navigate to='/' />

  return (
    <Box component='form' m='0 auto' width='70%' onSubmit={ handleSubmit(onSubmit) }>
        <TextField
          id="model"
          label="model"
          margin='normal'
          type='text'
          error={ !!errors?.model }
          helperText={ errors?.model?.message }
          fullWidth
          {
            ...register('model', {
                required: {
                    value: true,
                    message: 'model is required'
                }
            })
          }
        />

        <Box display='flex' justifyContent='center'>
            <Button variant="contained" color="secondary" type='submit'>
              Create Vehicle
            </Button>
        </Box>
    </Box>
  )
}

export default CreateVehicles