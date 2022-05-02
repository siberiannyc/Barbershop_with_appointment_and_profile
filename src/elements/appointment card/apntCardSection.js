import React from "react";
import { Box } from "@mui/system";
import { Card, Typography } from "@mui/material";
import BoxesStyles from "../../styles/styleBoxes";
import Selectors from "../../store/selectors";

export default function ApntCardSection({ data, title, icon, h, raised }) {
  const boxes = BoxesStyles();
  const selector = Selectors();
  return (
    <Card
      raised={raised}
      className={boxes.row}
      sx={{
        justifyContent: "space-between",
        height: h,
        m: 1,
        mb: 0,
      }}
    >
      <Box
        className={boxes.rowBorders}
        sx={{ width: "25%", color: selector.color }}
      >
        {icon}
      </Box>
      <Box className={boxes.columnAdjust} sx={{ width: "75%", height: "100%" }}>
        <Box
          className={boxes.rowRaw}
          sx={{
            width: "100%",
            height: "40%",
            alignItems: "flex-end",
            justifyContent: "start",
          }}
        >
          <Typography variant="overline">{title}</Typography>
        </Box>
        <Box
          className={boxes.rowRaw}
          color={
            (title === "Status" && data === "Confirmed") ||
            (title === "Status" && data === "Visited")
              ? "green"
              : title === "Status" && data === "Cancelled" && "red"
          }
          sx={{
            width: "100%",
            height: "60%",
            alignItems: "flex-start",
            justifyContent: "start",
            fontSize: "1.3rem",
            fontWeight: "bold",
            overflow: "scroll",
          }}
        >
          {data}
        </Box>
      </Box>
    </Card>
  );
}
