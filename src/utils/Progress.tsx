import { Box } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress";

const Progress = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="secondary" size="50px" />
      </Box>
  )
}

export default Progress