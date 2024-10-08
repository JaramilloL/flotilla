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
import { Maintenance } from "../../interfaces/globalTypes";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

interface maintenanceInfo {
  dataMaintenance: Maintenance[] | undefined;
  loadingData: boolean;
  deleteMaintenance: (value: number) => void;
  loadindDelete: boolean;

}

const MaintenanceTable = ({
  dataMaintenance,
  loadingData,
  deleteMaintenance,
  loadindDelete
}: maintenanceInfo) => {


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
          <Link to="/maintenanceForm" style={{ textDecoration: 'none', color: "white"}}>Form</Link>
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
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Cost</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Notes</TableCell>
                <TableCell align="right">Vehicle ID</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataMaintenance &&
                dataMaintenance.map((item) => (
                  <TableRow
                    key={item.id_maintenance}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.id_maintenance}
                    </TableCell>
                    <TableCell align="right">{item.cost}</TableCell>
                    <TableCell align="right">{item.maintenance_type}</TableCell>
                    <TableCell align="right">{item.notes}</TableCell>
                    <TableCell align="right">{item.vehicle_id}</TableCell>
                    <TableCell align="right">{item.date}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => deleteMaintenance(item.id_maintenance)}
                        disabled={loadindDelete}
                      >
                        Delete
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

export default MaintenanceTable;
