import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Trips } from "../../interfaces/globalTypes";

interface TripsFormUIProps {
  onSubmit: (event: React.FormEvent) => void;
  register: UseFormRegister<Trips>;
  errors: FieldErrors<Trips>;
  dataVehicle: { id_vehicle: number }[];
  dataDrivers: { id_drivers: number }[];
  dataTransport: { id_tranport: number }[];
  loading: boolean;
}

const TripsFormUI = ({
  onSubmit,
  register,
  errors,
  dataVehicle,
  dataDrivers,
  dataTransport,
  loading,
}: TripsFormUIProps) => {
  return (
    <Box component="form" width="75%" m="0 auto" onSubmit={onSubmit}>
      <Button variant="contained" color="secondary">
        <Link style={{ textDecoration: "none", color: "white" }} to="/trips">
          Form
        </Link>
      </Button>
      <ToastContainer />
      <TextField
        id="origin"
        label="origin"
        fullWidth
        error={!!errors?.origin}
        helperText={errors?.origin?.message}
        margin="normal"
        autoComplete="off"
        {...register("origin", {
          required: {
            value: true,
            message: "Please enter a valid origin",
          },
        })}
      />

      <TextField
        id="destination"
        label="destination"
        fullWidth
        error={!!errors?.destination}
        helperText={errors?.destination?.message}
        margin="normal"
        autoComplete="off"
        {...register("destination", {
          required: {
            value: true,
            message: "Please enter a valid destination",
          },
        })}
      />

      <TextField
        id="distance"
        label="distance"
        fullWidth
        error={!!errors?.distance}
        helperText={errors?.distance?.message}
        margin="normal"
        type="number"
        {...register("distance", {
          required: {
            value: true,
            message: "Please enter a valid distance",
          },
        })}
      />

      <TextField
        id="fuel_consumed"
        label="fuel_consumed"
        fullWidth
        error={!!errors?.fuel_consumed}
        helperText={errors?.fuel_consumed?.message}
        margin="normal"
        type="number"
        {...register("fuel_consumed", {
          required: {
            value: true,
            message: "Please enter a valid fuel_consumed",
          },
        })}
      />

      <TextField
        id="notes"
        label="notes"
        fullWidth
        error={!!errors?.notes}
        helperText={errors?.notes?.message}
        margin="normal"
        autoComplete="off"
        {...register("notes", {
          required: {
            value: true,
            message: "Please enter a valid notes",
          },
        })}
      />

      <TextField
        id="status"
        label="status"
        fullWidth
        error={!!errors?.status}
        helperText={errors?.status?.message}
        margin="normal"
        autoComplete="off"
        {...register("status", {
          required: {
            value: true,
            message: "Please enter a valid status",
          },
        })}
      />

      <TextField
        id="trip_date"
        fullWidth
        error={!!errors?.trip_date}
        helperText={errors?.trip_date?.message}
        margin="normal"
        type="date"
        {...register("trip_date", {
          required: {
            value: true,
            message: "Please enter a valid trip_date",
          },
        })}
      />

      {/**creacion del select para vehicles */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="vehicle-label">Vehicle</InputLabel>
        <Select
          labelId="vehicle-label"
          id="vehicle_id"
          {...register("vehicle_id", { required: true })}
          error={!!errors?.vehicle_id}
          defaultValue=""
        >
          {dataVehicle.map((vehicle) => (
            <MenuItem key={vehicle.id_vehicle} value={vehicle.id_vehicle}>
              {vehicle.id_vehicle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/**creacion del select para drivers */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="driver-label">Driver</InputLabel>
        <Select
          labelId="driver-label"
          id="driver_id"
          {...register("driver_id", { required: true })}
          error={!!errors?.driver_id}
          defaultValue=""
        >
          {dataDrivers.map((driver) => (
            <MenuItem key={driver.id_drivers} value={driver.id_drivers}>
              {driver.id_drivers}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/**creacion del select para transport */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="transport-label">Transport</InputLabel>
        <Select
          labelId="transport-label"
          id="transport_id"
          {...register("transport_id", { required: true })}
          error={!!errors?.transport_id}
          defaultValue=""
        >
          {dataTransport.map((tranport) => (
            <MenuItem key={tranport.id_tranport} value={tranport.id_tranport}>
              {tranport.id_tranport}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Add Trip"}
        </Button>
      </Box>
    </Box>
  );
};

export default TripsFormUI;
