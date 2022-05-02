import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { resetServices } from "../../store/servSlice";
import { resetBarber } from "../../store/barberSlice";

export default function BookButton({ color }) {
  const dispatch = useDispatch();
  const statesResetHandler = () => {
    dispatch(resetServices());
    dispatch(resetBarber());
  };
  return (
    <Link to="/book-shop" className="link">
      <Button
        variant="contained"
        color={color}
        onClick={statesResetHandler}
        sx={{ width: "12vw", height: "45px", borderRadius: 8 }}
      >
        Book Now
      </Button>
    </Link>
  );
}
