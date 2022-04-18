import React from "react";
import { Card, Box, Typography, Tooltip } from "@mui/material";
import BoxesStyles from "../styles/styleBoxes";
import ElementsStyles from "../styles/styleElements";
import Selectors from "../store/selectors";

export default function ServiceCard({
  data,
  serviceIdArr,
  serviceId,
  cardHandler,
}) {
  let boxes = BoxesStyles();
  let elements = ElementsStyles();
  const selector = Selectors();
  return (
    <Card
      className={
        selector.sCategory !== "HAIRCUT" && serviceIdArr.includes(data.id)
          ? elements.cardActive
          : selector.sCategory === "HAIRCUT" && serviceId === data.id
          ? elements.cardActive
          : elements.card
      }
      raised
      // key={data.name}
      label={data.group}
      sx={{
        width: 700,
        height: 150,
        borderRadius: { xs: 3, md: 3 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        mt: 1,
        mr: 1,
        mb: 0,
        ml: 1,
        p: 2,
      }}
      onClick={() => cardHandler(data)}
    >
      <Box
        className={boxes.rowRaw}
        sx={{
          alignItems: "start",
          justifyContent: "center",
          height: 60,
          width: "80%",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">{data.name}</Typography>
        <Typography
          variant="overline"
          sx={{ fontWeight: "bold", fontSize: "1rem" }}
          color="error"
        >
          {data.time} min | {data.price}
        </Typography>
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
      </Box>
      {(data.id === serviceId || serviceIdArr.includes(data.id)) && (
        <Typography variant="caption" color="#07272f">
          Press this card again if you changed your mind.
        </Typography>
      )}
    </Card>
  );
}
