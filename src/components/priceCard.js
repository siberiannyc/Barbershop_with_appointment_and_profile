import React from "react";
import { Card, Box, Typography, Tooltip } from "@mui/material";
import BoxesStyles from "../styles/styleBoxes";
import ElementsStyles from "../styles/styleElements";
import Selectors from "../store/selectors";

export default function PriceCard({ data, serviceIdArr, serviceId }) {
  let boxes = BoxesStyles();
  let elements = ElementsStyles();
  const selector = Selectors();
  return (
    <Card
      //   className={elements.card}
      raised
      label={data.group}
      sx={{
        width: 500,
        height: 200,
        borderRadius: { xs: 3, md: 3 },
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "flex-start",
        mt: 1,
        mr: 1,
        mb: 0,
        ml: 1,
        p: 2,
      }}
    >
      <Box
        className={boxes.column}
        sx={{
          alignItems: "start",
          justifyContent: "center",
          height: 60,
        }}
      >
        <Typography variant="h6">{data.name}</Typography>
      </Box>
      <Box
        className={boxes.column}
        sx={{
          alignItems: "start",
          justifyContent: "space-between",
          height: "70%",
          pt: 1,
        }}
      >
        <Typography variant="body1">{data.description}</Typography>
        <Typography
          variant="overline"
          sx={{ fontWeight: "bold", fontSize: "1rem" }}
          color="error"
        >
          {data.time} min | {data.price}
        </Typography>
      </Box>
      {(data.id === serviceId || serviceIdArr.includes(data.id)) && (
        <Typography variant="caption" color="#07272f">
          Press this card again if you changed your mind.
        </Typography>
      )}
    </Card>
  );
}
