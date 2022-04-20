import React from "react";
import { Box, Card, Typography } from "@mui/material";
import BoxesStyles from "../styles/styleBoxes";
import Selectors from "../store/selectors";
import ShopDropdown from "./shopDropdown";

export default function ShopCard() {
  const boxes = BoxesStyles();
  const selector = Selectors();
  return (
    <Box className={boxes.shopCard}>
      <Card
        raised
        sx={{
          p: 2,
          mb: 5,
          mt: 5,
          borderRadius: 10,
          bgcolor: "primary.main",
        }}
        className={boxes.shopCardCard}
      >
        {selector.authorized ? (
          <ShopDropdown fs="2rem" situation="setup" shopColor="info.main" />
        ) : (
          <ShopDropdown fs="2rem" situation="mainPage" shopColor="info.main" />
        )}
        {Object.entries(selector.shop.activeShop)
          .filter(
            ([key, value]) =>
              key == "address" || key == "hours" || key == "phone"
          )
          .map(([key, value]) => {
            return (
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  color: "info.main",
                  textAlign: "start",
                }}
                key={key}
              >
                {value}
              </Typography>
            );
          })}
      </Card>
    </Box>
  );
}
