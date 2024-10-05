import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Drivers } from "../../interfaces/globalTypes";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

interface tableInfo {
  dataDrivers: Drivers[] | undefined;
  loadingData: boolean;
}

const DriverTable = ({ dataDrivers, loadingData }: tableInfo) => {
  if (loadingData)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="secondary" size="50px" />
      </Box>
    );
  return (
    <Box>
      <Box>
        <Button variant="contained" color="secondary">
          <Link to="/driverForm" style={{ textDecoration: 'none', color: "white"}}>Form</Link>
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
                <TableCell align="right">Experience years</TableCell>
                <TableCell align="right">Licence number</TableCell>
                <TableCell align="right">Licende type</TableCell>
                <TableCell align="right">User</TableCell>
                <TableCell align="right">Vehicle</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataDrivers &&
                dataDrivers.map((item) => (
                  <TableRow
                    key={item.id_drivers}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.experience_years}
                    </TableCell>
                    <TableCell align="right">{item.license_number}</TableCell>
                    <TableCell align="right">{item.license_type}</TableCell>
                    <TableCell align="right">{item.user_id}</TableCell>
                    <TableCell align="right">{item.vehicle_id}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        // onClick={() => deleteVehicle(item.id_vehicle)}
                        // disabled={loadinDelete}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        color="info"
                        size="small"
                        sx={{ml: 1}}
                        // onClick={() => handleEditClick(item)}
                      >
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

export default DriverTable;
