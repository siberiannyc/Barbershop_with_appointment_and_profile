import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import logo from "../media/LEDO 3.png";
import { Link } from "react-router-dom";
import { footerLinks } from "../data/miscList";
import BoxesStyles from "../styles/styleBoxes";

const Footer = () => {
  const fbIcon = <FontAwesomeIcon icon={faFacebook} size="2x" color="white" />;
  const instaIcon = (
    <FontAwesomeIcon icon={faInstagram} size="2x" color="white" />
  );
  const twitterIcon = (
    <FontAwesomeIcon icon={faTwitter} size="2x" color="white" />
  );
  let boxes = BoxesStyles();

  return (
    <>
      <Box
        bgcolor="primary.main"
        sx={{
          height: { xs: "70vh", sm: "70vh", md: "55vh", lg: "30vh" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 1,
        }}
      >
        <Box
          className={boxes.row}
          sx={{
            textAlign: "left",
          }}
        >
          <img src={logo} alt="barbershop LEDO" className="logoImg"></img>
          <Typography variant="subtitle2" sx={{ ml: 2, mr: 2, color: "white" }}>
            LEDO is the grooming experience every man deserves - where
            traditional barbering and modern spa services meet your favorite
            watering hole. Sit back, relax, get groomed, then enjoy a cocktail,
            coffee, or cold one in our private lounge.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Box className={boxes.rowRaw} sx={{ width: "65%" }}>
            <Box className={boxes.rowRaw} sx={{ alignItems: "start" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  color: "white",
                  ml: 2,
                  mr: 7,
                }}
              >
                <Typography variant="h6">ACCOUNT</Typography>
                {footerLinks
                  .filter((link) => link.category === "ACCOUNT")
                  .map((link) => {
                    return (
                      <Link to={link.link} className="link">
                        <Typography variant="subtitle1" color="white">
                          {link.name}
                        </Typography>
                      </Link>
                    );
                  })}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  color: "white",
                }}
              >
                <Typography variant="h6">COMPANY</Typography>
                {footerLinks
                  .filter((link) => link.category === "COMPANY")
                  .map((link) => {
                    return (
                      <Link to={link.link} className="link">
                        <Typography variant="subtitle1" color="white">
                          {link.name}
                        </Typography>
                      </Link>
                    );
                  })}
              </Box>
            </Box>
          </Box>
          <Box
            className={boxes.columnAdjust}
            sx={{
              width: "35%",
              justifyContent: "end",
              alignItems: "end",
            }}
          >
            <Box
              sx={{
                width: { xs: "40%", sm: "25%", md: "40%" },
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                color: "white",
                mr: 2,
                mb:2

              }}
            >
              <a href="https://www.facebook.com/" className="link">
                {fbIcon}
              </a>
              <a href="https://www.instagram.com/" className="link">
                {instaIcon}
              </a>
              <a href="https://www.twitter.com/" className="link">
                {twitterIcon}
              </a>
            </Box>
            <Box
              sx={{
                mr: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "end",
                width: "100%",

              }}
            >
              <Typography variant="caption" sx={{ color: "white" }}>
                ©{new Date().getFullYear()}. LEDO. All rights reserved.
              </Typography>
              <Link to="/barber-schedule" className="link">
                <Typography variant="caption" sx={{ color: "white" }}>
                  {" "}
                  Terms.
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Footer;
