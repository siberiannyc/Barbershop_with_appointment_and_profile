import { makeStyles } from "@mui/styles";
import { theme } from "./mainTheme";

const ElementsStyles = makeStyles(() => ({
  close: {
    "&:hover": {
      color: "#FF0000",
      cursor: "pointer",
    },
  },
  active: {
    backgroundColor: "#D65032",
    color: "#fffcfa",
    transform: "scale(1.02)",
    cursor: "pointer",
  },
  nonActive: {
    backgroundColor: "#E3EEFF",
    color: "#2C394B",
    "&:hover": {
      color: "#D65032",
    },
  },
  cardActive: {
    // backgroundColor: "#E3EEFF",
    transform: "scale(1.02)",
    cursor: "pointer",
  },
  card: {
    backgroundColor: "none",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.02)",
      transition: "all 0.2s ease-in-out",
    },
  },
  hidden: {
    display: "none",
  },
  buttonStyle: {
    width: "12vw",
    height: "45px",
  },
  timeCard: {
    "&:hover": {
      transform: "scale(1.02)",
      transition: "all 0.1s ease-in-out",
      backgroundColor: "#403A99",
      color: "#fff",
    },
  },
}));

export default ElementsStyles;
