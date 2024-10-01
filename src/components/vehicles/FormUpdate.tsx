import { Box, Button, TextField } from "@mui/material"
import { Vehicles } from "../../interfaces/globalTypes"
import { FormEvent } from "react";

interface dataInfo {
    vehicleUpdate: Vehicles;
    setVehicleUpdate: (value: Vehicles | null) => void;
    updateVehicle: (value: Vehicles) => void;
}

const FormUpdate = ({ vehicleUpdate, setVehicleUpdate, updateVehicle }: dataInfo) => {

    const onSubmit =(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        updateVehicle(vehicleUpdate)
    }
  return (
    <Box
    component="form"
    m="0 auto"
    width="70%"
    onSubmit={onSubmit}
  >
    <TextField
      id="model"
      label="model"
      margin="normal"
      type="text"
      fullWidth
      value={vehicleUpdate?.model}
      onChange={(e) => setVehicleUpdate({ ...vehicleUpdate, model: e.target.value })}
      
    />

    <TextField
      id="brand"
      label="brand"
      margin="normal"
      type="text"
      fullWidth
      value={vehicleUpdate?.brand}
      onChange={(e) => setVehicleUpdate({ ...vehicleUpdate, brand: e.target.value })}
    />

    <TextField
      id="capacity"
      label="capacity"
      margin="normal"
      type="number"
      fullWidth
      value={vehicleUpdate?.capacity}
      onChange={(e) => setVehicleUpdate({ ...vehicleUpdate, capacity: parseInt(e.target.value) })}
    />

    <TextField
      id="mileage"
      label="mileage"
      margin="normal"
      type="number"
      fullWidth
      value={vehicleUpdate?.mileage}
      onChange={(e) => setVehicleUpdate({ ...vehicleUpdate, mileage: parseInt(e.target.value) })}
    />

    <TextField
      id="plate_number"
      label="plate_number"
      margin="normal"
      type="text"
      fullWidth
      value={vehicleUpdate?.plate_number}
      onChange={(e) => setVehicleUpdate({ ...vehicleUpdate, plate_number: e.target.value })}
    />

    <TextField
      id="status"
      label="status"
      margin="normal"
      type="text"
      fullWidth
      value={vehicleUpdate?.status}
      onChange={(e) => setVehicleUpdate({ ...vehicleUpdate, status: e.target.value })}
    />

    <TextField
      id="type"
      label="type"
      margin="normal"
      type="text"
      fullWidth
      value={vehicleUpdate?.type}
      onChange={(e) => setVehicleUpdate({ ...vehicleUpdate, type: e.target.value })}
    />

    <Box display="flex" justifyContent="center">
      <Button variant="contained" color="secondary" type="submit">
        Update Vehicle
      </Button>
    </Box>
  </Box>
  )
}

export default FormUpdate