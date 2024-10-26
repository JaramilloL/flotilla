import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import { Trips } from "../../interfaces/globalTypes";
import { useState } from "react";
import TripsModal from "./TripsModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface tripsInfo {
  dataTrips: Trips[] | undefined;
  deleteTrips: ( value: number)=> void;
}

const TripsCard = ({ dataTrips, deleteTrips }: tripsInfo) => {
  const [open, setOpen] = useState<boolean>(false);

  //creamos un estado y una funcion para almacenar la informacion de cada trip
  const [selectedTrip, setSelectedTrip] = useState<Trips | null>(null);

  const handleOpen = (trip: Trips) => {
    setSelectedTrip(trip);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTrip(null); // Resetea el viaje seleccionado
  };

  return (
    <Grid2 spacing={1} container>
      {dataTrips &&
        dataTrips.map((trips) => (
          <Card sx={{ maxWidth: 300 }} key={trips?.id_trips}>
            <IconButton aria-label="settings">
              <MoreVertIcon onClick={()=> handleOpen(trips)} />
            </IconButton>
            <CardHeader title={`Destination: ${trips.destination}`} />
            <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <strong>Origin: </strong>
                {trips.origin}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Notes: {trips?.notes}
              </Typography>
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="space-evenly" width="100%">
                <Button size="small">Agree</Button>
                <Button size="small" color="error" onClick={() => trips?.id_trips !== undefined && deleteTrips(trips?.id_trips)}>
                  Delete
                </Button>
                <Button size="small" color="secondary">
                  Update
                </Button>
              </Box>
            </CardActions>
          </Card>
        ))}

      {selectedTrip && (
        <TripsModal
          dataTrips={selectedTrip}
          handleClose={handleClose}
          open={open}
        />
      ) }
    </Grid2>
  );
};

export default TripsCard;
