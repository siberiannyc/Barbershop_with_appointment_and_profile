import { makeStyles } from "@mui/styles";

const ElementsStyles = makeStyles(() => ({
  close: {
    "&:hover": {
      color: "#FF0000",
      cursor: "pointer",
    },
  },
  active: {
    backgroundColor: "#93B6C2",
    color: "white",
    transform: "scale(1.02)",
    cursor: "pointer",
  },
  nonActive: {
    backgroundColor: "none",
    "&:hover": {
      backgroundColor: "#93B6C2",
    },
  },
  cardActive: {
    backgroundColor: "#93B6C2",
    color: "white",
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
}));

export default ElementsStyles;
