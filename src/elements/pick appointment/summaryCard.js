import React from "react";
import { Card } from "@mui/material";
import BoxesStyles from "../../styles/styleBoxes";

export default function SummaryCard({ header }) {
  const boxes = BoxesStyles();
  return (
    <Card
      className={boxes.rowRaw}
      sx={{
        justifyContent: "center",
        alignItems:"center",
        width: "90%",
        minHeight: "80px",
        mt: 1,
        // backgroundColor: "accentSecondary.main",
        border: 1,
        borderColor: "accent.main",
        // color: "info.main",
      }}
    >
      {header}
    </Card>
  );
}
