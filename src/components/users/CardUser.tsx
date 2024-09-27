import {
    Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { UserFlotilla } from "../../interfaces/globalTypes";

interface DataUser {
  dataUser: UserFlotilla[] | undefined;
}

const CardUser = ({ dataUser }: DataUser) => {
  return (
    <div>
      {dataUser &&
        dataUser.map((item) => (
          <Card sx={{ maxWidth: 300 }} key={item.id_users}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                {item.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <strong>Email: </strong>{item.email}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <strong>Phoen_Number: </strong>{item.phone_number}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <strong>Role: </strong>{item.role}
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

export default CardUser;
