import React from "react";
import {
  Typography,
  Card,
  Button,
  TextField,
  CardContent,
  Box,
} from "@mui/material";
 import Selectors from "../store/selectors";


export default function ServiceSummary({ summary, customerHandler, submitHandler, buttonDisabled }) {
 const selector = Selectors();
  const summaryArray = [
    ["Total:", `$ ${summary.total}`],
    ["Where:", summary.where],
    ["Date:", summary.date],
    ["Time", summary.time],
    ["Duration:", `${summary.duration} min`],
    ["Your Barber:", summary.barber],
  ];
  return (
    <Card sx={{ width: "32%" }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          SERVICE SUMMARY
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "start",
            width: "100%",
          }}
        >
          {summaryArray.map(([title, value]) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  mb: 2,
                }}
                key={Math.random()}
              >
                <Typography variant="button">{title}</Typography>
                <Typography variant="button" sx={{ fontWeight: "bold" }}>
                  {value}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <hr />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "15vh",
          }}
        >
          {!selector.authorized && (
            <TextField
              placeholder="Your Name"
              variant="outlined"
              onChange={(e) => customerHandler(e)}
              sx={{ width: "100%" }}
            />
          )}

          <Button
            color="error"
            variant="contained"
            onClick={submitHandler}
            disabled={buttonDisabled}
          >
            Complete Booking
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
