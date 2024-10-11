import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Box,
  Grid2,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { Transport } from "../../interfaces/globalTypes";
import { deepOrange } from "@mui/material/colors";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
interface dataInfo {
  dataTrasnports: Transport[] | undefined;
  deleteTransport: (value: number) => void;
  loadingDelete: boolean;
  loadingData: boolean;
}

const TrasportList = ({
  dataTrasnports: ts,
  deleteTransport,
  loadingDelete,
  loadingData
}: dataInfo) => {
  if(loadingData) return  (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress color="secondary" size="50px" />
    </Box>
  );
  return (
    <Box>
      <Button variant="contained" color="secondary" sx={{ m: 1 }}>
        <Link
          to="/transportForm"
          style={{ textDecoration: "none", color: "white" }}
        >
          Form
        </Link>
      </Button>
      <Grid2 container gap={2}>
        {ts &&
          ts.map((item) => (
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                border: 1,
                borderColor: "orange",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              key={item.id_tranport}
            >
              <ListItem key={item.id_tranport}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Name: ${item.name}`}
                  secondary={`Desc: ${item.description}`}
                />
                <ListItemText
                  primary={`Type: ${item.id_type}`}
                  key={item.id_type}
                />
              </ListItem>
                <Box display='flex' justifyContent='center' width='100%'>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => deleteTransport(item.id_tranport)}
                    disabled={loadingDelete}
                  >
                    {loadingDelete ? "Deleting..." : "Delete"}
                  </Button>
                </Box>
            </List>
          ))}
      </Grid2>
    </Box>
  );
};

export default TrasportList;
