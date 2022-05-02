import React from "react";
import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ExpandLessTwoToneIcon from "@mui/icons-material/ExpandLessTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import BoxesStyles from "../../styles/styleBoxes";

export default function AppointmentServices({ data, openHandler, open }) {
  const boxes = BoxesStyles();

  return (
    <Box className={boxes.rowRaw} sx={{ alignItems: "center" }}>
      <Typography variant="h6">
        {Object.keys(data.services).length > 1
          ? `${Object.keys(data.services).length} SERVICES`
          : Object.keys(data.services)}
      </Typography>
      {Object.keys(data.services).length > 1 && (
        <IconButton onClick={() => openHandler()}>
          {open ? <ExpandLessTwoToneIcon /> : <ExpandMoreTwoToneIcon />}
        </IconButton>
      )}
    </Box>
  );
}

export function AppointmentServicesExt({ data }) {
  const boxes = BoxesStyles();
  return (
    <>
      {data !== undefined ? (
        <Box className={boxes.column} sx={{ pl: 4 }}>
          {Object.keys(data.services).length > 1 &&
            Object.keys(data.services).map((service) => {
              return (
                <Typography variant="h6" key={service}>
                  {service}
                </Typography>
              );
            })}
        </Box>
      ) : (
        <Typography>No Services</Typography>
      )}
    </>
  );
}

export function Services({ data }) {
  const boxes = BoxesStyles();
  return (
    <Box className={boxes.column} sx={{ pl: 4 }}>
      {Object.keys(data.services).map((service) => {
        return (
          <Typography variant="h6" key={service}>
            {service}
          </Typography>
        );
      })}
    </Box>
  );
}
