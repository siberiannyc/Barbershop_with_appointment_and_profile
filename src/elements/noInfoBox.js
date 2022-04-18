import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import BoxesStyles from "../styles/styleBoxes";

export default function NoInfoBox({ image, text }) {
  let boxes = BoxesStyles();
  return (
    <Box
      className={boxes.column}
      sx={{
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "100%",
      }}
    >
      <img
        src={image}
        alt="SVG"
        style={{ height: "400px", width: "600px", mb: 5 }}
      />
      <Typography
        variant="h6"
        sx={{ fontFamily: "Cairo", textAlign: "center" }}
      >
        {text}
      </Typography>
    </Box>
  );
}
