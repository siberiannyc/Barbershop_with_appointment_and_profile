import React from "react";
import { Box, Typography, Card } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DeleteCardButton from "../buttons/deleteCardButton";
import { useState } from "react";
import BoxesStyles from "../../styles/styleBoxes";

export default function UserServiceCard({
  deleteHandler,
  deletedCards,
  service,
  serviceName,
}) {
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const boxes = BoxesStyles();

  return (
    <Card
      raised
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        pr: 1,
        width: "95%",
        height: "15vh",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "95%",
          ml: 3,
          mr: 3,

        }}
      >
        <CheckCircleOutlineRoundedIcon color="success" fontSize="large" />
        <Box
          className={boxes.rowRaw}
          sx={{ width: "90%", justifyContent: "space-between" }}
        >
          <Typography variant="h6" value={serviceName}>
            {serviceName}
          </Typography>

          {!deleteTrigger && (
            <>
              <Typography variant="h6" value={serviceName} color="gray">
                {service.time} min
              </Typography>
              <Typography variant="h6" value={service}>
                {service.price}
              </Typography>{" "}
            </>
          )}

          <DeleteCardButton
            data={serviceName}
            deleteTrigger={deleteTrigger}
            setDeleteTrigger={setDeleteTrigger}
            deleteHandler={deleteHandler}
            label="DELETE SERVICE?"
          />
        </Box>
      </Box>
    </Card>
  );
}
