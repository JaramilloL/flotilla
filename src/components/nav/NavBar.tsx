import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavList from "./NavList";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { listOfLinks } from "../../utils/listLinks";
import { UserContext } from "../../context/UserContext";

const NavBar = () => {
  //creamos la navegacion a inicio o login
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("a fallado");
  }
  const { signOutUser, user } = context || {};

  //creamos una funcion para cerrar ecion
  const closeseccion = () => {
    try {
      if (signOutUser) {
        signOutUser();
      }
      //   navigate('/')
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ mb: 3 }}>
      {user ? (
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
                {listOfLinks.map((list, index) => (
                  <Button key={index} color="inherit">
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={list.link}
                    >
                      {list.name}
                    </Link>
                  </Button>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={closeseccion}
                >
                  LogOut
                </Button>
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
      ) : null}
    </Box>
  );
};

export default NavBar;
