import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BoxesStyles from "../styles/styleBoxes";
import CareerCard from "../elements/careers/careerCard";
import { useCareersGet } from "../firebase/carrers";
import Selectors from "../store/selectors";
import Career from "../media/svg/career.svg";
import TypoStyles from "../styles/styleTypo";

export default function Careers() {
  const selector = Selectors();
  const [fetch, setFetch] = useState(false);
  const [careerObj, setCareerObj] = useState(null);
  useCareersGet(fetch, setFetch);
  useEffect(() => {
    setFetch(true);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selector.careers !== null) {
      setCareerObj(selector.careers);
    }
  }, [selector.careers]);

  const boxes = BoxesStyles();
  return (
    <Box
      sx={{
        // overflow: "scroll",
        height: "100%",
        width: "100%",
        mt: "11vh",
      }}
    >
      <Box className={boxes.row} sx={{ justifyContent: "space-evenly" }}>
        <img
          src={Career}
          alt="svg"
          style={{ width: "400px", height: "500px" }}
        />
        <Typography variant="h1" sx={{ fontSize: "7rem" }}>
          {" "}
          CAREERS
        </Typography>
      </Box>
      <Box
        className={boxes.columnAdjust}
        sx={{
          width: "100%",
          justifyContent: "center",
          // alignItems: "center",
          ml: 3,
        }}
      >
        {careerObj !== null &&
          Object.entries(careerObj).map(([key, value]) => {
            return <CareerCard key={key} data={value}></CareerCard>;
          })}
      </Box>
    </Box>
  );
}
