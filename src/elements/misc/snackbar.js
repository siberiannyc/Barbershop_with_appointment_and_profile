import React from "react";
import { Snackbar, Alert } from "@mui/material";
import Selectors from "../../store/selectors";

export default function SnackbarAlert() {
  const selector = Selectors();
  return (
    <>
      <Snackbar
        open={selector.snackbar}
        autoHideDuration={10000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{ mb: 13 }}
      >
        <Alert
          // onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {selector.sysMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={selector.success}
        autoHideDuration={10000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{ mb: 13 }}
      >
        <Alert
          // onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Your information has successfully been changed!
        </Alert>
      </Snackbar>
    </>
  );
}
