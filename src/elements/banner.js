import React from "react";
import { Card, CardMedia, Box, Typography } from "@mui/material";
import Grids from "../styles/grids";
import BannerCard from "./bannerCard";

export default function Banner({
  text,
  title,
  link,
  w,
  h,
  bgColor,
  typoColor,
  btnColor,
  img,
  column,
  row,
}) {
  const grids = Grids();
  return (
    <Card className={grids.banner}>
      <CardMedia
        className={grids.bannerMedia}
        component="img"
        image={img}
        alt="Barbershop"
      />
      <Box
        sx={{
          gridColumn: column,
          gridRow: row,
        }}
      >
        <BannerCard
          text={text}
          title={title}
          link={link}
          w={w}
          h={h}
          bgColor={bgColor}
          typoColor={typoColor}
          btnColor={btnColor}
        />
      </Box>
    </Card>
  );
}
