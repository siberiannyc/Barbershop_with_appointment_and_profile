import React from "react";
import { Box } from "@mui/material";
import { useState } from "react";
import DateNew from "./dateNew";
import BoxesStyles from "../styles/styleBoxes";
import TimeNew from "../elements/pick appointment/timePicker";

export default function DateTime() {
  const boxes = BoxesStyles();
  const [value, setValue] = useState(new Date());
  const [openTime, setOpenTime] = useState(false);
  return (
    <Box className={boxes.column} sx={{ width: "100%" }}>
      <DateNew
        setValue={setValue}
        value={value}
        setOpenTime={setOpenTime}
      />

      {openTime && <TimeNew />}
    </Box>
  );
}
