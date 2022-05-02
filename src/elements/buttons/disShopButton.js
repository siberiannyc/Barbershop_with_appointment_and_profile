import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { barberId, filterSlots, resetBarberChoice } from "../../store/barberSlice";
import { customDateChoice } from "../../store/dateSlice";

export default function DisShopButton({ disableBtn }) {
  const dispatch = useDispatch();
  return (
    <Link
      to="/book-services/services"
      className="enabled-link"
      id="link"
      style={{ textDecoration: "none" }}
    >
      <Button
        color="accentSecondary"
        variant="contained"
        disabled={disableBtn}
        onClick={() => {
          dispatch(resetBarberChoice);
          dispatch(barberId(""));
          dispatch(filterSlots(false));
          dispatch(customDateChoice(""));
        }}
        sx={{
          width: "12vw",
          height: "45px",
          borderRadius: 8,
        }}
      >
        NEXT
      </Button>
    </Link>
  );
}
