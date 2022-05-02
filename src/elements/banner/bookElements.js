import React from "react";
import { Box, Typography } from "@mui/material";
import BoxesStyles from "../../styles/styleBoxes";

export function Header({ header, subheader, headerColor, subheaderColor }) {
  const boxes = BoxesStyles();
  return (
    <Box
      sx={{
        alignItems: "center",
        textAlign: "center",
        mt: 3,
      }}
      className={boxes.columnAdjust}
    >
      <Typography variant="h5" color={headerColor}>
        {header.toUpperCase()}{" "}
      </Typography>
      <Typography variant="h5" color={subheaderColor}>
        {subheader}
      </Typography>
    </Box>
  );
}
