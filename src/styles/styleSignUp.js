import { makeStyles } from "@mui/styles";

const SignUpStyles = makeStyles(() => ({
  dialog: {
    height: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  mainCard: {
    mt: 5,
    ml: 3,
    borderRadius: 15,
    width: "60%",
    height: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardHalf: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  motions: {
    width: "100vw",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  field: {
    width: "83%",
  },
  text: {
    color: "white",
  },
  signBtn: {
    color: "white",
    borderColor: "white",
    fontWeight: "bold",
    width: "130px",
    height: "40px",
  },
  signBox: {
    width: "75%",
    height: "75%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    color: "white",
  },
  header: {
    color: "black",
    fontWeight: "bold",
    fontSize: "2rem",
  },
}));

export default SignUpStyles;
