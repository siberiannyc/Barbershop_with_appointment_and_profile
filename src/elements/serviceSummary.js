import React from "react";
import {
  Typography,
  Card,
  Button,
  TextField,
  CardContent,
  Box,
  Tooltip,
} from "@mui/material";
import Selectors from "../store/selectors";
import BoxesStyles from "../styles/styleBoxes";

export default function ServiceSummary({
  summary,
  customerHandler,
  submitHandler,
  buttonDisabled,
}) {
  const selector = Selectors();
  const boxes = BoxesStyles();
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
            console.log(title);
            return (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  width: "100%",
                  mb: 2,
                }}
                key={Math.random()}
              >
                {selector.authorized &&
                !Object.keys(selector.customer.appointments.visited).length &&
                !Object.keys(selector.customer.appointments.confirmed).length ? (
                  <>
                    {title !== "Total:" ? (
                      <Box
                        className={boxes.rowRaw}
                        sx={{
                          justifyContent: "space-between",

                          width: "100%",
                        }}
                      >
                        <Typography variant="button">{title}</Typography>
                        <Typography
                          variant="button"
                          sx={{ fontWeight: "bold" }}
                        >
                          {value}
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        className={boxes.rowRaw}
                        sx={{
                          justifyContent: "space-between",

                          width: "100%",
                        }}
                      >
                        <Typography>TOTAL:</Typography>
                        <Tooltip
                          title="Price with a 10% discount"
                          placement="left"
                        >
                          <Typography
                            variant="button"
                            sx={{
                              fontWeight: "bold",
                              color: "red",
                              fontSize: "1.2rem",
                            }}
                          >
                            {value}
                          </Typography>
                        </Tooltip>
                      </Box>
                    )}
                  </>
                ) : (
                  <>
                    {title !== "Discount:" && (
                      <Box
                        className={boxes.rowRaw}
                        sx={{
                          justifyContent: "space-between",

                          width: "100%",
                        }}
                      >
                        <Typography variant="button">{title}</Typography>
                        <Typography
                          variant="button"
                          sx={{ fontWeight: "bold" }}
                        >
                          {value}
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
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
