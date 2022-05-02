import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { serviceCategory } from "../store/servSlice";
import BoxesStyles from "../styles/styleBoxes";
import { Outlet, NavLink } from "react-router-dom";
import ElementsStyles from "../styles/styleElements";
import { servicesGroup } from "../data/servicesList";
import ChosenServices from "../components/chosenServices";
import { useEffect } from "react";

import Selectors from "../store/selectors";

const BookServices = () => {
  const elements = ElementsStyles();
  const dispatch = useDispatch();
  const boxes = BoxesStyles();
  const selector = Selectors();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: { xs: "100%", md: "90vh" },
        width: "98%",
        mt: "10vh",
        p: 1,
        bgcolor: "info.main",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pt: 1,
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{ height: "15%", width: "100%", justifyContent: "space-evenly" }}
          className={boxes.row}
        >
          {servicesGroup.map((service) => {
            return (
              <NavLink to="services" className="link" key={service.id}>
                <Box
                  // raised
                  sx={{
                    width: 300,
                    height: 150,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className={
                    service.name === selector.sCategory
                      ? elements.active
                      : elements.nonActive
                  }
                  onClick={() => dispatch(serviceCategory(service.name))}
                >
                  <Typography variant="h6">{service.name}</Typography>
                  <Typography variant="body1">{service.description}</Typography>
                </Box>
              </NavLink>
            );
          })}
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            overflow: "scroll",
            mt: 3,
          }}
          className={boxes.row}
        >
          <Outlet />
        </Box>
      </Box>
      <Box
        raised
        sx={{
          width: "35%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <ChosenServices />
      </Box>
    </Box>
  );
};

export default BookServices;
