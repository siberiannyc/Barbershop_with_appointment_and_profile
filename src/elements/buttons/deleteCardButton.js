import React from "react";
import BoxesStyles from "../../styles/styleBoxes";
import ElementsStyles from "../../styles/styleElements";
import { Box, Chip, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

export default function DeleteCardButton({
  data,
  deleteTrigger,
  setDeleteTrigger,
  deleteHandler,
  label,
}) {
  const boxes = BoxesStyles();
  let elements = ElementsStyles();

  return (
    <Box sx={{ width: "20%", justifyContent: "end" }} className={boxes.rowRaw}>
      {deleteTrigger && (
        <Chip
          label={label}
          color="error"
          onDelete={() => deleteHandler(data)}
          onClick={() => setDeleteTrigger(false)}
          icon={<HighlightOffIcon />}
          deleteIcon={<DoneIcon />}
          clickable
        ></Chip>
      )}
      {!deleteTrigger && (
        <IconButton onClick={() => setDeleteTrigger(true)}>
          <DeleteIcon color="disabled" className={elements.close} />
        </IconButton>
      )}
    </Box>
  );
}
