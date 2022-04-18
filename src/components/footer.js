import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import logo from "../media/LEDO 3.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const fbIcon = <FontAwesomeIcon icon={faFacebook} size="2x" />;
  const instaIcon = <FontAwesomeIcon icon={faInstagram} size="2x" />;
  const twitterIcon = <FontAwesomeIcon icon={faTwitter} size="2x" />;

  return (
    <>
      <Box
        bgcolor="primary.main"
        sx={{
          height: { xs: "70vh", sm: "70vh", md: "55vh", lg: "45vh" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 1,
        }}
      >
        <Box
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
            <Typography variant="subtitle1">Book Now</Typography>
            <Typography variant="subtitle1">Account</Typography>
            <Typography variant="subtitle1">Appointments</Typography>
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
            <Typography variant="subtitle1">Services</Typography>
            <Typography variant="subtitle1">Membership</Typography>
            <Typography variant="subtitle1">Careers</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "40%", sm: "25%", md: "15%" },
            display: "flex",
            justifyContent: "space-between",
            color: "white",
            ml: 2,
          }}
        >
          {fbIcon}
          {instaIcon}
          {twitterIcon}
        </Box>
        <Box sx={{ ml: 2, mt: 1 }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            ©{new Date().getFullYear()}. LEDO. All rights reserved.
          </Typography>
          <Link to="/barber-schedule" className="link">
            <Typography variant="caption" sx={{ color: "white" }}>
              { " "}Terms.
            </Typography>
          </Link>
        </Box>
      </Box>
    </>
  );
};
export default Footer;
