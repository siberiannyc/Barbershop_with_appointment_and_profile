import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ElementsStyles from "../styles/styleElements";

export default function StyledButton({ title, link, color }) {
  const elements = ElementsStyles();
  return (
    <Link to={link} className="link">
      <Button
        variant="contained"
        color={color}
        className={elements.buttonStyle}
        sx={{ borderRadius: 8 }}
      >
        {title}
      </Button>
    </Link>
  );
}
