import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { Link, NavLink } from "react-router-dom"
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LogoutIcon from '@mui/icons-material/Logout';
import { listOfLinks } from "../../utils/listLinks";

interface ShowList{
    onClick: () => void;
}

const NavList = ({ onClick }: ShowList) => {
    const context = useContext(UserContext)

    if(!context){
        throw new Error("no context")
    }

    const { user, signOutUser } = context || {};

  return (
    <Box sx={{ width: 250 }} onClick={onClick}>
    <List>
      <Box component={"div"} sx={{ display: { xs: "block", sm: "none" } }}>
        <ListItem disablePadding sx={{ display: "block" }}>
        {
          user ? (
            <>
            <ListItemButton>
              <ListItemIcon onClick={signOutUser}>
                  <LogoutIcon/>
                <ListItemText>LogOut</ListItemText>
              </ListItemIcon>
            </ListItemButton>
            {listOfLinks.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemText>
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={item.link}
                        >
                          {item.name}
                        </Link>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
            </>
            
          ):(
            <>
              <ListItemButton>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <NavLink to="/" style={{ textDecoration: 'none', color: '#111' }}><ListItemText primary="Login" /></NavLink>
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <HowToRegIcon />
            </ListItemIcon>
            <NavLink to="/register" style={{ textDecoration: 'none', color: '#111' }}><ListItemText primary="Register" /></NavLink>
          </ListItemButton>
            </>
          )
        }
          
        </ListItem>
      </Box>
    </List>
  </Box>
  )
}

export default NavList