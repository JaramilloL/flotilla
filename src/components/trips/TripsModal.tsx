import { Box, Modal, Typography } from "@mui/material";
import { Trips } from "../../interfaces/globalTypes";

interface tripsInfo {
  dataTrips: Trips[] | undefined;
  handleClose: (value: boolean) => void;
  open: boolean;
}
const TripsModal = ({ dataTrips, handleClose, open }: tripsInfo) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 2,
    p: 4,
  };

  return (
    <div>
      {dataTrips?.map((item) => (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ color: 'orange' }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <strong>Distance: </strong>
              {item.distance}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <strong>Trip date: </strong>
              {item.trip_date}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <strong>Status: </strong>
              {item.status}
            </Typography>
          </Box>
        </Modal>
      ))}
    </div>
  );
};

export default TripsModal;
