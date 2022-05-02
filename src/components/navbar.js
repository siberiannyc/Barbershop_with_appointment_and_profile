import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import logo from "../media/LEDO 2.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetServices } from "../store/servSlice";
import { resetBarber } from "../store/barberSlice";
import { Avatar } from "@mui/material";
import BoxesStyles from "../styles/styleBoxes";
import { theme } from "../App";

import { useState } from "react";
import CustomerAvatar from "../elements/misc/avatar";
import { resetDate } from "../store/dateSlice";

import BookButton from "../elements/buttons/bookButton";
import { ThemeProvider } from "@mui/system";

const pages = {
  home: "Home",
  services: "Services",
  careers: "Careers",
};

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [openAuth, setOpenAuth] = useState(true);

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    dispatch(resetServices());
  };

  const dispatch = useDispatch();
  // const boxes = BoxesStyles();
  const customerData = useSelector((state) => state.customer.customerData);

  const avatarHandler = () => {
    dispatch(resetServices());
    dispatch(resetBarber());
    dispatch(resetDate());
    setOpenAuth(true);
  };
  const statesResetHandler = () => {
    dispatch(resetServices());
    dispatch(resetBarber());
  };

  return (
    <>

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: "100",
          backgroundColor: "primary.main",
        }}
      >
        {/* <AppBar color="transparent" sx={{ border: 0 }}> */}
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: 82,
          }}
        >
          <Box sx={{ maxWidth: 50, maxHeight: 50 }}>
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={logo} alt="LEDO logo" className="logo" />
            </Link>
          </Box>
          {/* Mobile */}
          <IconButton
            color="inherit"
            onClick={handleOpenNavMenu}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuRoundedIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
              mt: 3,
            }}
          >
            {Object.entries(pages).map(([key, value]) => (
              <MenuItem
                key={key}
                onClick={handleCloseNavMenu}
                sx={{ width: "100vw", pb: 2 }}
              >
                <Typography textAlign="center" fontSize="2em">
                  {value}
                </Typography>
              </MenuItem>
            ))}
            <Box
              sx={{
                width: "100%",
                height: 80,
                pl: 2,
              }}
            >
              <BookButton color="primary" />
            </Box>
          </Menu>

          {/* Tabs and desktops */}

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
              alignItems: "center",
              ml: 5,
            }}
          >
            <BookButton color="accent" />

            <Box
              sx={{
                width: "40%",
                justifyContent: "space-between",
                alignItems: "center",
                ml: 5,
                display: "flex",
                flexDirection: "row",
              }}
            >
              {Object.entries(pages).map(([key, value]) => {
                let linkAddress = `/${key}`;

                return (
                  <Link
                    to={
                      key === "home"
                        ? "/"
                        : key === "services"
                        ? "services/services"
                        : linkAddress
                    }
                    className="link"
                    key={key}
                  >
                    <Button
                      sx={{
                        width: "10vw",
                        height: "50px",
                        borderRadius: 8,
                        color: "white",
                      }}
                    >
                      {value}
                    </Button>
                  </Link>
                );
              })}

              <Link
                to="/profile/stats"
                className="link"
                onClick={avatarHandler}
              >
                {Object.keys(customerData).length ? (
                  <CustomerAvatar onClick={avatarHandler} />
                ) : (
                  <Avatar onClick={avatarHandler}></Avatar>
                )}
              </Link>
            </Box>
          </Box>
        </Toolbar>
        {/* </AppBar> */}
      </Box>

    </>
  );
};
export default Navbar;
