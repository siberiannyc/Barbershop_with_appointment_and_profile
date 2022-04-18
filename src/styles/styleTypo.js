import { makeStyles } from "@mui/styles";

const TypoStyles = makeStyles(() => ({
  summaryText: {
    color: "#85919e",
    "&:hover": {
      color: "#FF0000",
      cursor: "pointer",
    },
    "&.active": {
      color: "#FF0000",
    },
  },
  spanLink: {
    color: "#FF0000",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

export default TypoStyles;
