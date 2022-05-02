import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

function Loader({ text }) {
  return (
    <Box sx={{ width: "100%", height: "100%"}}>
      <div className="loader-wrap">
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Typography variant="h6" sx={{ fontFamily: "Cairo", color: "white" }}>
          {text}
        </Typography>
      </div>
    </Box>
  );
}
export default Loader;
