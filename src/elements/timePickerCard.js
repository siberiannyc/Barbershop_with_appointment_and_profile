import React from "react";
import { Card, Box } from "@mui/material";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { timePicker } from "../store/dateSlice";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { timeConfirm } from "../store/barberSlice";
 import Selectors from "../store/selectors";

export default function TimePickerCard({ data, setData }) {
  const dispatch = useDispatch();
  const selector = Selectors();
  
  const timeHandler = (data) => {
    setData(data);
    dispatch(timeConfirm(true));
  };
  return (
    <Card
      raised
      sx={{
        borderRadius: 3,
        minWidth: {
          xs: "55vw",
          sm: "30vw",
          md: "20vw",
          lg: "17vw",
        },
        height: "15vh",
        m: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        pr: 2,
      }}
      onClick={() => dispatch(timePicker(data))}
      onMouseDown={() => timeHandler(data)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          ml: 2,
        }}
      >
        <Typography
          variant="button"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.3rem" },
          }}
        >
          {data}
        </Typography>
        <Typography
          variant="caption"
          color="gray"
          sx={{ fontSize: { xs: "1rem" } }}
        >
          {selector.totalTime} min
        </Typography>
      </Box>
      <AccessTimeRoundedIcon color="error" />
    </Card>
  );
}
