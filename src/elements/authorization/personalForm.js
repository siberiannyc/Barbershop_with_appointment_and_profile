import {
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Box,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import BoxesStyles from "../../styles/styleBoxes";
import Selectors from "../../store/selectors";


export default function PersonalForm({ header, data, setInfo, info, handler }) {
  const boxes = BoxesStyles();
  const selector = Selectors();

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
                sx={{ width: "60%", mr: 3, textTransform: "uppercase" }}
                defaultValue={value.data}
                error={selector.errors[key]}
                onChange={(e) =>
                  setInfo({ ...info, [key]: e.target.value.toUpperCase() })
                }
              />
            </Box>
          );
        })}
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
