import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Button,
} from "@mui/material";
import { Vehicles } from "../../interfaces/globalTypes";
import CircularProgress from "@mui/material/CircularProgress";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//creamos el acceso a la base de datos de usuer para mostrar informacion
const supabase = createClient(
    import.meta.env.VITE_APP_URL || "",
    import.meta.env.VITE_APP_KEY || ""
  );
interface vehiclesInfo {
  dataVehicle: Vehicles[] | undefined;
  loading: boolean;
}

const TableVehicles = ({ dataVehicle: initialData, loading }: vehiclesInfo) => {
    //creamos un estado para refrescar la informacion de la tabla
    // Estado para manejar los vehículos que se mostrarán en la tabla
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);

  //creamos un estdo de carga cuando se elimine un elemento
  const [loadinDelete, setLoadinDelete] = useState<boolean>(false)

  // Efecto para inicializar los datos de los vehículos cuando se cargue el componente
  useEffect(() => {
    if (initialData) {
      setVehicles(initialData);
    }
  }, [initialData]);

    //eliminacion de vehiculos
const deleteVehicle = async (id_vehicle: number): Promise<void> => {
    try {
        setLoadinDelete(true)
        const { data, error } = await supabase.from('vehicles').delete().eq('id_vehicle', id_vehicle)

        if(error) {
            console.log(error.message)
        }else{
            console.log(data)
            // Filtrar los vehículos y actualizar el estado local
        setVehicles((prevVehicles) =>
            prevVehicles.filter((vehicle) => vehicle.id_vehicle !== id_vehicle)
          );
        }
    } catch (error) {
        if(error instanceof Error) {
            console.log(error.message)
        }
    }finally{
        setLoadinDelete(false)
    }
}

    if(loading) return ( <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="secondary" size="50px" />
      </Box> )
  return (
    <Box>
        <Box display='block'>
        <Button variant="contained" color="secondary">
        <Link to='/formVehicle' style={{ textDecoration: 'none', color: 'white'}}>Form</Link>
        </Button>
        </Box>
      <Box
      component="div"
      width="95%"
      display="flex"
      justifyContent="center"
      m="0 auto"
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: "gray" }}>
            <TableRow>
              <TableCell>Model</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">plate_number</TableCell>
              <TableCell align="right">type</TableCell>
              <TableCell align="right">capacity</TableCell>
              <TableCell align="right">status</TableCell>
              <TableCell align="right">mileage</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles &&
              vehicles.map((item) => (
                <TableRow
                  key={item.id_vehicle}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.model}
                  </TableCell>
                  <TableCell align="right">{item.brand}</TableCell>
                  <TableCell align="right">{item.plate_number}</TableCell>
                  <TableCell align="right">{item.type}</TableCell>
                  <TableCell align="right">{item.capacity}</TableCell>
                  <TableCell align="right">{item.status}</TableCell>
                  <TableCell align="right">{item.mileage}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="error" size="small" onClick={()=> deleteVehicle(item.id_vehicle)} disabled={loadinDelete}>
                      Delete
                    </Button>
                    <Button variant="contained" color="info" size="small">
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>  
    </Box>
    
  );
};

export default TableVehicles;
