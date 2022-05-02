import React from "react";
import { Typography, Card, CardContent } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Selectors from "../../store/selectors";
import { Link } from "react-router-dom";
import TypoStyles from "../../styles/styleTypo";
import { useDispatch } from "react-redux";
import { barberId } from "../../store/barberSlice";

export default function FinishPlate({ data }) {
  const selector = Selectors();
  const typo = TypoStyles();
  const dispatch = useDispatch();

  return (
    <Card id="finishPlate" raised sx={{}}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CheckCircleIcon color="success" sx={{ fontSize: "6rem" }} />
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {data.toUpperCase()}, YOU'RE ALL SET
        </Typography>
        <Typography variant="body1">
          Your appointment has been booked at {selector.shop.activeShop.name},{" "}
          {selector.shop.activeShop.city}.
        </Typography>
        {selector.authorized ? (
          <Typography variant="body1">
            See appointment details in your{" "}
            <Link to="/profile/appointments" className="link">
              <span
                className={typo.spanLink}
                onClick={() => {
                  dispatch(barberId(""));
                }}
              >
                profile
              </span>
            </Link>
          </Typography>
        ) : (
          <Typography variant="body1">
            <Link to="/authenticate" className="link">
              {" "}
              <span className={typo.spanLink}>Sign Up</span>{" "}
            </Link>{" "}
            to save appointments statistics, choose your favorite shop and
            barber and get extra discounts.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
