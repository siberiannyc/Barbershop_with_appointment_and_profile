import React from "react";
import { Card, Typography, CardHeader, Avatar, Box } from "@mui/material";
import BoxesStyles from "../../styles/styleBoxes";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { careerCard, careerId } from "../../store/firebaseSlice";

export default function CareerCard({ data }) {
  const boxes = BoxesStyles();
  const dispatch = useDispatch();
  return (
    <a href="https://www.indeed.com/" target="_blank" className="link">
      <Card
        key={data.id}
        raised
        className={boxes.rowHover}
        sx={{
          height: "20vh",
          width: "90%",
          justifyContent: "space-between",
          alignItems: "center",
          pr: 5,
          pl: 5,
          mb: 3,
          borderRadius: 5,
        }}
        onClick={() => dispatch(careerCard(data))}
      >
        <Typography variant="h6" color="error">
          {data.Position}
        </Typography>
        <Typography variant="h6" color="gray">
          {data.Type}
        </Typography>
        <Typography variant="h6" color="primary">
          {data.Shop}
        </Typography>
      </Card>
    </a>
  );
}
