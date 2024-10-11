import {
    Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Trips } from "../../interfaces/globalTypes";

interface tripsInfo {
  dataTrips: Trips[] | undefined;
}

const TripsCard = ({ dataTrips }: tripsInfo) => {
  return (
    <div>
      {dataTrips &&
        dataTrips.map((trips) => (    
      <Card sx={{ maxWidth: 300 }} key={trips.id_trip}>
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
            {trips?.notes}
          </Typography>
        </CardContent>
        <CardActions>
          <Box display='flex' justifyContent='space-evenly' width='100%'>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
          </Box>
        </CardActions>
      </Card>
        ))}

    </div>
  );
};

export default TripsCard;
