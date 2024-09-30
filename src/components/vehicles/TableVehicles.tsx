import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Vehicles } from "../../interfaces/globalTypes";
import CircularProgress from "@mui/material/CircularProgress";

interface vehiclesInfo {
  dataVehicle: Vehicles[] | undefined;
  loading: boolean;
}

const TableVehicles = ({ dataVehicle, loading }: vehiclesInfo) => {
    if(loading) return ( <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="secondary" size="50px" />
      </Box> )
  return (
    <Box
      component="div"
      width="90%"
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
            </TableRow>
          </TableHead>
          <TableBody>
            {dataVehicle &&
              dataVehicle.map((item) => (
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
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableVehicles;
