import { makeStyles } from "@mui/styles";

const BoxesStyles = makeStyles(() => ({
  summaryBox: {
    width: "90%",
    height: "90%",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "88vh",
  },
  base: {
    width: "100vw",
    height: "100vh",
    display: "flex",
  },
  avatarSection: {
    width: "100%",
    height: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    // background: "red",
  },
  summarySection: {
    width: "85%",
    height: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "start",
    // background: "red",
  },
  groupBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    // background: "red",
  },
  rowRaw: {
    display: "flex",
    flexDirection: "row",
    // background: "red",
  },
  rowBorders: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // width: "100%",

    // background: "red",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  columnAdjust: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "90%",
  },
  card: {
    // width: "100%",
    // height: "60%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  statCard: {
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.02)",
      transition: "all 0.2s ease-in-out",
    },
  },
  noScroll: {
    "*::-webkit-scrollbar": {
      display: "none",
    },
  },
  finalPageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  rowHover: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.02)",
      transition: "all 0.2s ease-in-out",
      background: "#93B6C2",
    },
  },
}));

export default BoxesStyles;
