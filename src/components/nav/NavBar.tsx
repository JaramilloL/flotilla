import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import NavList from "./NavList";
import { useState } from "react";
import { Link } from "react-router-dom";
import { listOfLinks } from "../../utils/listLinks";

const NavBar = () => {

    const [open, setOpen] = useState(false)
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setOpen(true)}
          sx={{ display: { xs: "block", sm: "none" }, mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Flotilla
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" }, mr: 2 }}>
        {
            listOfLinks.map((list, index) => (
                <Button key={index} color="inherit">
                    <Link style={{ textDecoration: 'none', color: 'white' }} to={list.link}>{list.name}</Link>
                </Button>

            ))
        }
        </Box>
      </Toolbar>
    </AppBar>
    <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <NavList onClick={() => setOpen(false)} />
      </Drawer>
  </Box>
  )
}

export default NavBar