import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import SummaryBox from "../elements/summaryBox";
import BoxesStyles from "../styles/styleBoxes";

const Profile = () => {
  const boxes = BoxesStyles();

  return (
    <Box className={boxes.base} sx={{ bgcolor: "primary.light" }}>
      <Box className={boxes.container} sx={{ mt: "11vh", width: "25%" }}>
        <SummaryBox />
      </Box>
      <Box sx={{ width: "75%", mt: "11vh" }}>
        <Outlet />
      </Box>
    </Box>
  );
};
export default Profile;
