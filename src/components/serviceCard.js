import React from "react";
import { Card, Box, Typography, Tooltip } from "@mui/material";
import BoxesStyles from "../styles/styleBoxes";
import ElementsStyles from "../styles/styleElements";
import Selectors from "../store/selectors";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

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
      raised={
        selector.sCategory !== "HAIRCUT" && serviceIdArr.includes(data.id)
          ? true
          : selector.sCategory === "HAIRCUT" && serviceId === data.id
          ? true
          : false
      }
      className={
        selector.sCategory !== "HAIRCUT" && serviceIdArr.includes(data.id)
          ? elements.cardActive
          : selector.sCategory === "HAIRCUT" && serviceId === data.id
          ? elements.cardActive
          : elements.card
      }
      // key={data.name}
      label={data.group}
      sx={{
        width: 400,
        height: 200,
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
          alignItems: "center",
          height: 60,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          // color="accentSecondary.main"
          sx={{
            fontSize: "1.15rem",
            fontWeight: "bold",
            color: "accentSecondary.main",
          }}
        >
          {data.name}
        </Typography>
        <Typography
          variant="overline"
          sx={{ fontWeight: "bold", fontSize: "1.6rem" }}
          color="accent.main"
        >
          {data.price}
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
        <Typography variant="body1" color="secondary.main" sx={{}}>
          {data.description}
        </Typography>
      </Box>
      <Box
        sx={{ minWidth: "100%", minHeight: "1vh", justifyContent: "end" }}
        className={boxes.rowRaw}
      >
        {(data.id === serviceId || serviceIdArr.includes(data.id)) && (
          <CheckRoundedIcon color="success" />
        )}
      </Box>
    </Card>
  );
}
