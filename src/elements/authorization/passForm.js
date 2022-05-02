import {
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Box,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import BoxesStyles from "../../styles/styleBoxes";
import Selectors from "../../store/selectors";
import { useState } from "react";

export default function PassForm({ header, data, setInfo, info, handler }) {
  const boxes = BoxesStyles();
  const selector = Selectors();

  const changeHandler = (e, key) => {
    setInfo({ ...info, [key]: e.target.value });
  };

  return (
    <>
      <CardHeader title={header} />
      <CardContent className={boxes.column} sx={{ alignItems: "center" }}>
        {Object.entries(data).map(([key, value]) => {
          return (
            <Box
              className={boxes.rowRaw}
              key={key}
              sx={{
                width: "70%",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography sx={{ ml: 3 }}>{value.name}</Typography>
              <TextField
                sx={{ width: "60%", mr: 3 }}
                error={selector.errors[key]}
                type="password"
                onChange={(e) => changeHandler(e, key)}
              />
            </Box>
          );
        })}
        <Box
          className={boxes.column}
          sx={{ width: "100%", alignItems: "center" }}
        >
          <Typography sx={{ ml: 3, fontWeight: "bold" }}>
            Password requirements:
          </Typography>
          <Typography sx={{ ml: 3 }}> Minimum 6 characters long.</Typography>
          <Typography sx={{ ml: 3 }}>
             At least one lowercase character.
          </Typography>
          <Typography sx={{ ml: 3 }}>
             At least one uppercase character.
          </Typography>
          <Typography sx={{ ml: 3 }}> At least one number.</Typography>
        </Box>
      </CardContent>
      <CardActions
        className={boxes.row}
        sx={{ justifyContent: "end", alignItems: "center" }}
      >
        <Button
          variant="contained"
          color="error"
          sx={{ width: "25%", height: "45px", borderRadius: 8, mr: 3 }}
          onClick={handler}
        >
          Save Changes
        </Button>
      </CardActions>
    </>
  );
}
