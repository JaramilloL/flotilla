import { Box, TextField, Button } from "@mui/material"

const TrasnportForm = () => {
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