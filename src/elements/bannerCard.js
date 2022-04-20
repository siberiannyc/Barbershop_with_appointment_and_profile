import React from "react";
import { Card, Typography } from "@mui/material";
import BoxesStyles from "../styles/styleBoxes";
import StyledButton from "./styledButton";

export default function BannerCard({
  text,
  title,
  link,
  w,
  h,
  bgColor,
  typoColor,
  btnColor,
}) {
  const boxes = BoxesStyles();
  return (
    <Card
      raised
      sx={{
        width: w,
        height:h,
        bgcolor: bgColor,
        borderRadius: 10,
        p: 2,
      }}
      className={boxes.bannerCard}
    >
      <Typography
        variant="h4"
        sx={{ color: typoColor, fontWeight: "700", lineHeight: "1.5" }}
      >
        {text.toUpperCase()}
      </Typography>
      <StyledButton title={title} link={link} color={btnColor} />
    </Card>
  );
}
