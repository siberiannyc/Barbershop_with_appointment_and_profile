import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";


const SwitchCard = ({
  style,
  handleClose,
  switchHandler,
  header,
  text,
  textStyle,
  switcher,
}) => {
  return (
    <Box className={style} sx={{ position: "relative" }}>
      <Button
        sx={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          color: "white",
        }}
        onClick={handleClose}
      >
        Close
      </Button>

      <Typography
        className={textStyle}
        sx={{
          fontSize: "3rem",
          fontWeight: "900",
        }}
        variant="cairo"
      >
        {header}
      </Typography>
      <Typography className={textStyle} sx={{ fontSize: "1.5rem" }}>
        {text}
      </Typography>

      <Button
        sx={{
          color: "white",
          borderColor: "white",
          fontWeight: "bold",
          borderRadius: 20,
          width: "130px",
          height: "40px",
        }}
        variant="outlined"
        onClick={switchHandler}
      >
        {switcher}
      </Button>
    </Box>
  );
};

export default SwitchCard;
