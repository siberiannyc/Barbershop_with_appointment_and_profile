import React from "react";
import { Box } from "@mui/material";
import BarberCard from "./barberCard";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function BarbrContainer() {
  const [random, setRandom] = useState(false);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        mt: 2,
      }}
    >
      <NavLink to="date-time" style={{ textDecoration: "none" }}>
        <BarberCard
          caseToHandle="customerChoice"
          // setOpen={setOpen}
          // setTimeOpen={setOpenTime}
          setRandom={setRandom}
          w="150px"
          h="150px"
          aw="70%"
          ah="70%"
        />
      </NavLink>
    </Box>
  );
}
