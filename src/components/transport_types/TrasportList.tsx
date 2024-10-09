import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { Transport } from "../../interfaces/globalTypes";
import { deepOrange } from "@mui/material/colors";

interface dataInfo {
  dataTrasnports: Transport[] | undefined;
}

const TrasportList = ({ dataTrasnports: ts }: dataInfo) => {
  return (
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          border: 1,
          borderColor: "orange",
        }}
      >
        {ts &&
          ts.map((item) => (
            <ListItem key={item.id_transport}>
              <ListItemAvatar >
                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Name: ${item.name}`}
                secondary={`Desc: ${item.description}`}
              />
              <ListItemText primary={`Type: ${item.id_type}`} key={item.id_type}/>
            </ListItem>
          ))}
      </List>
  );
};

export default TrasportList;
