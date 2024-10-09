import {
  Avatar,
  Box,
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

const TrasportList = ({ dataTrasnports }: dataInfo) => {
  return (
    <Box>
      {dataTrasnports &&
        dataTrasnports.map((item) => (
          <List
            key={item.id_transport}
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              border: 1,
              borderColor: "orange",
            }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Name: ${item.name}`}
                secondary={`Desc: ${item.description}`}
              />
              <ListItemText primary={`Type: ${item.id_type}`} />
            </ListItem>
          </List>
        ))}
    </Box>
  );
};

export default TrasportList;
