import React from "react";
import { Box, Card, Typography, Button } from "@mui/material";
import BoxesStyles from "../styles/styleBoxes";
import SummaryCard from "../elements/pick appointment/summaryCard";
import { Link } from "react-router-dom";
import Selectors from "../store/selectors";
import StyledButton from "../elements/buttons/styledButton";
import services from "../media/svg/services.svg";

export default function ChosenServices() {
  const boxes = BoxesStyles();
  const selector = Selectors();
  return (
    <Box sx={{ height: "95%", width: "100%" }}>
      <Box
        className={boxes.column}
        sx={{
          height: "74vh",
          overflow: "scroll",
          // position: "relative",
          justifyContent: "end",
        }}
      >
        {!selector.services.length && (
          <img
            src={services}
            alt="svg"
            style={{ width: "400px", height: "600px" }}
          />
        )}

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
          className={
            selector.services.length ? "link-button" : "link-button-dis"
          }
        >
          <Button
            color="accentSecondary"
            disabled={selector.services.length ? false : true}
            variant="contained"
            sx={{
              width: "12vw",
              height: "45px",
              borderRadius: 8,
            }}
          >
            Next
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
