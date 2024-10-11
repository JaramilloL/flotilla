import {
    Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Trips } from "../../interfaces/globalTypes";
import { useState } from "react";
import TripsModal from "./TripsModal";
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface tripsInfo {
  dataTrips: Trips[] | undefined;
}

const TripsCard = ({ dataTrips }: tripsInfo) => {

    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <div>
      {dataTrips &&
        dataTrips.map((trips) => (    
      <Card sx={{ maxWidth: 300 }} key={trips.id_trip}>
        <IconButton aria-label="settings">
            <MoreVertIcon onClick={handleOpen}/>
          </IconButton>
        <CardHeader title={`Destination: ${trips.destination}`} />
        <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
          />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <strong>Origin: </strong>{trips.origin}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Notes: {trips?.notes}
          </Typography>
        </CardContent>
        <CardActions>
          <Box display='flex' justifyContent='space-evenly' width='100%'>
          <Button size="small">Agree</Button>
          <Button size="small" color="error">Delete</Button>
          <Button size="small" color="secondary">Update</Button>
          </Box>
        </CardActions>
      </Card>
        ))}

        {
            open ? 
            <TripsModal dataTrips={dataTrips} handleClose={handleClose} open={open} /> : null}
    </div>
  );
};

export default TripsCard;
