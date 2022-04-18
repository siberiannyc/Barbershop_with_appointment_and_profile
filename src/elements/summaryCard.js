import React from "react";
import { Card} from "@mui/material";
import BoxesStyles from "../styles/styleBoxes";

export default function SummaryCard({header }) {
  const boxes = BoxesStyles();
  return (
    <Card

      className={boxes.row}
      sx={{ justifyContent: "center", minHeight: "80px", mt: 1 }}
    >
      {header}
    </Card>
  );
}
