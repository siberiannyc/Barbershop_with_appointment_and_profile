import React from "react";
import { Box, Card, Typography, Button } from "@mui/material";
import BoxesStyles from "../styles/styleBoxes";
import SummaryCard from "./summaryCard";
import { Link } from "react-router-dom";
import Selectors from "../store/selectors";



export default function ChosenServices() {
  const boxes = BoxesStyles();
  const selector = Selectors();
  return (
    <Card raised sx={{ height: "95%", width: "95%" }}>
      <Box
        sx={{ height: "10vh", justifyContent: "center" }}
        className={boxes.row}
      >
        <Typography variant="h3">Services:</Typography>
      </Box>
      <Box
        className={boxes.column}
        sx={{ height: "65vh", overflow: "scroll", position: "relative" }}
      >
        {selector.services.map((service) => {
          return <SummaryCard header={service.name} key={service.id} />;
        })}
      </Box>
      <Box
        sx={{ height: "10vh", justifyContent: "center" }}
        className={boxes.row}
      >
        <Link
          to="/book-barbers"
          className={selector.services.length ? "link-button" : "link-button-dis"}
        >
          <Button
            color="error"
            disabled={selector.services.length ? false : true}
            variant="contained"
            sx={{ width: "70%", height: "50px", borderRadius: 8 }}
          >
            Next
          </Button>
        </Link>
      </Box>
    </Card>
  );
}
