import {
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
          <Card sx={{ maxWidth: 345 }} key={item.id_users}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {item.email}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {item.phone_number}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {item.role}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
    </div>
  );
};

export default CardUser;
