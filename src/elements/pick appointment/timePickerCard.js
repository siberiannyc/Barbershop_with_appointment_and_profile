import React from "react";
import { Card, Box } from "@mui/material";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { timePicker } from "../../store/dateSlice";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { timeConfirm } from "../../store/barberSlice";
import Selectors from "../../store/selectors";
import ElementsStyles from "../../styles/styleElements";

export default function TimePickerCard({ data, setData }) {
  const dispatch = useDispatch();
  const selector = Selectors();
  const elements = ElementsStyles();

  const timeHandler = (data) => {
    setData(data);
    dispatch(timeConfirm(true));
  };
  return (
    <Card
      // raised
      sx={{
        borderRadius: 4,
        width: "200px",
        height: "100%",
        m: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        color: "secondary.main",
        mb: 2,
      }}
      onClick={() => dispatch(timePicker(data))}
      onMouseDown={() => timeHandler(data)}
      className={elements.timeCard}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "80%",
          height:"5vh"
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
        {/* <Typography
          variant="caption"
          color="gray"
          sx={{ fontSize: { xs: "1rem" } }}
        >
          {selector.totalTime} min
        </Typography> */}
      </Box>
      {/* <AccessTimeRoundedIcon color="accentSecondary" /> */}
    </Card>
  );
}
