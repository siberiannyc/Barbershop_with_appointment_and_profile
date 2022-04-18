import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BoxesStyles from "../styles/styleBoxes";
import ShopDropdown from "../elements/shopDropdown";
import { useState, useEffect } from "react";
import { useCareerPost, useCareersGet } from "../firebase/carrers";

const CareersForm = () => {
  const boxes = BoxesStyles();
  const fields = ["Shop", "Position", "Type"];
  const [career, setCareer] = useState(null);
  const [post, setPost] = useState(false);

  const postCareer = () => {
    setPost(true);
  };
  useCareersGet();

  useCareerPost(post, career, setPost);

  return (
    <Box
      className={boxes.columnAdjust}
      sx={{ width: "60%", justifyContent: "space-between", overflow: "scroll" }}
    >
      <Typography variant="overline">Career Form</Typography>
      {fields.map((field) => {
        return (
          <TextField
            label={field}
            sx={{ mb: 2 }}
            key={field}
            onChange={(e) => {
              setCareer({
                ...career,
                [field]: e.target.value,
              });
            }}
          />
        );
      })}

      <Button
        color="error"
        variant="contained"
        sx={{ width: "30%" }}
        onClick={postCareer}
      >
        Submit
      </Button>
    </Box>
  );
};
export default CareersForm;
