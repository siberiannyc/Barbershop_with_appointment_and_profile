import { makeStyles } from "@mui/styles";

const Grids = makeStyles(() => ({
  banner: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridTemplateRows: "repeat(10, 1fr)",
    borderRadius: 0,
    height: { xs: "100vh", sm: "100vh", md: "100vh" },
  },
  bannerMedia: {
    gridColumn: "1/13",
    gridRow: "1/11",
  },
}));

export default Grids;
