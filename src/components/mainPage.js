import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faGlassCheers } from "@fortawesome/free-solid-svg-icons";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import ImgBp from "../media/lists/imagesList";
import BookButton from "../elements/bookButton";
import ShopDropdown from "../elements/shopDropdown";
import Selectors from "../store/selectors";
import { useEffect, useState } from "react";
import BoxesStyles from "../styles/styleBoxes";
import { Link } from "react-router-dom";
import ElementsStyles from "../styles/styleElements";

const MainPage = () => {
  const dollarIcon = <FontAwesomeIcon icon={faDollarSign} size="4x" />;
  const eventIcon = <FontAwesomeIcon icon={faGlassCheers} size="4x" />;
  const tagIcon = <FontAwesomeIcon icon={faTags} size="4x" />;
  const selector = Selectors();
  const boxes = BoxesStyles();
  const elements = ElementsStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Card
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "repeat(10, 1fr)",
          borderRadius: 0,
          height: { xs: "100vh", sm: "100vh", md: "100vh" },
        }}
      >
        <CardMedia
          sx={{
            gridColumn: "1/13",
            gridRow: "1/11",
          }}
          component="img"
          image={ImgBp(1)}
          alt="LEDO"
        ></CardMedia>

        <Box
          sx={{
            gridColumn: { xs: "2/11", sm: "7/12", md: "8/11" },
            gridRow: { xs: "4/8", sm: "5/9", md: "4/8" },
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "100%",
              width: "100%",
              p: 2,
            }}
            className="card-background"
          >
            <Typography variant="h4" sx={{ color: "white", fontWeight: "700" }}>
              LET US TAKE CARE <br /> OF YOUR STYLE
            </Typography>
            <BookButton color="error" />
          </Box>
        </Box>
      </Card>
      <Card
        sx={{
          borderRadius: 0,
          height: "100vh",
          justifyContent: "space-around",
        }}
        className={boxes.columnAdjust}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "700",
            m: 1,
            display: { xs: "block", sm: "none" },
          }}
        >
          DO YOURSELF A FAVOR
        </Typography>
        <Typography
          variant="h1"
          sx={{ fontWeight: "700", display: { xs: "none", sm: "block" } }}
        >
          DO <br />
          YOURSELF <br />A FAVOR
        </Typography>
        <Typography variant="h5" color="light" sx={{ p: 2 }}>
          LEDO barber is the grooming experience every man deserves - where
          traditional barbering and modern spa services meet your favorite
          watering hole. <br />
          Sit back, relax, get groomed - then enjoy a cocktail, coffee, or cold
          one in our private lounge.
        </Typography>
        <Box className={boxes.columnAdjust} sx={{ alignItems: "center" }}>
          {selector.authorized ? (
            <ShopDropdown fs="3rem" situation="setup" />
          ) : (
            <ShopDropdown fs="3rem" situation="mainPage" />
          )}
          {Object.entries(selector.shop.activeShop)
            .filter(
              ([key, value]) =>
                key == "address" || key == "hours" || key == "phone"
            )
            .map(([key, value]) => {
              return (
                <Typography
                  variant="h4"
                  sx={{ mb: 3, color: "gray" }}
                  key={key}
                >
                  {value}
                </Typography>
              );
            })}
        </Box>
      </Card>
      <Card
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "repeat(15, 1fr)",
          borderRadius: 0,
          height: { xs: "70vh", sm: "70vh", md: "90vh" },
        }}
      >
        <CardMedia
          sx={{
            gridColumn: "1/13",
            gridRow: "1/16",
          }}
          component="img"
          image={ImgBp(2)}
          alt="LEDO"
        ></CardMedia>

        <Box
          sx={{
            gridColumn: { xs: "2/11", sm: "2/7", md: "2/6" },
            gridRow: { xs: "8/13", sm: "2/6", md: "2/7" },
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "100%",
              width: "100%",
              p: 2,
            }}
            className="card-background"
          >
            <Typography variant="h4" sx={{ color: "white", fontWeight: "700" }}>
              LOOK GOOD, FEEL GREAT
            </Typography>
            <Link to="/services/services" className="link">
              <Button
                variant="contained"
                color="error"
                sx={{ width: "12vw", height: "45px", borderRadius: 8 }}
              >
                OUR SERVICES
              </Button>
            </Link>
          </Box>
        </Box>
      </Card>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: 0,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "700",
            m: 1,
            display: { xs: "block", sm: "none" },
          }}
        >
          WE ARE EXCLUSI-
          <br />
          VELY INCLUSIVE
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontWeight: "700",
            display: { xs: "none", sm: "block" },
          }}
        >
          WE ARE <br />
          EXCLUSIVELY <br />
          INCLUSIVE
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pr: 2,
            pl: 2,
            pt: 2,
          }}
        >
          <Typography variant="h6" color="light">
            You don't need a membership to experience LEDO Barber, but our
            packages allow you to save while also enjoying plenty of perks.
            Benefits include special discounts, guest passes, member-only events
            and unlimited booze. <br />
            (...okay not the last one, but we got your attention, right?)
          </Typography>

          <Typography
            variant="h6"
            color="secondary"
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              width: { xs: "70%", sm: "100%", md: "80%" },
              height: { xs: "65vh", sm: "100%" },
              mt: 5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {dollarIcon}
              FREE UPKEEPS
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {eventIcon}
              MEMBER EVENTS
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {tagIcon}
              SPECIAL DISCOUNTS
            </Box>
          </Typography>
          <Button
            variant="contained"
            color="success"
            sx={{ width: "12vw", height: "45px", borderRadius: 8 }}
          >
            GET ME IN
          </Button>
        </Box>
      </Card>
      <Card
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "repeat(15, 1fr)",
          borderRadius: 0,
          height: { xs: "63vh", sm: "75vh", md: "95vh" },
        }}
      >
        <CardMedia
          sx={{
            gridColumn: "1/13",
            gridRow: "1/16",
          }}
          component="img"
          image={ImgBp(3)}
          alt="LEDO"
        ></CardMedia>

        <Box
          sx={{
            gridColumn: { xs: "2/11", sm: "2/9", md: "2/6" },
            gridRow: { xs: "2/9", sm: "2/8", md: "2/7" },
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "100%",
              width: "100%",
              p: 2,
            }}
            className="card-background"
          >
            <Typography variant="h4" sx={{ color: "white", fontWeight: "700" }}>
              SEE WHAT YOU'VE BEEN MISSING
            </Typography>
            <BookButton />
          </Box>
        </Box>
      </Card>
      <Card
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(6, 1fr)",
            sm: "repeat(12, 1fr)",
          },
          gridTemplateRows: { xs: "repeat(7, 1fr)", sm: "repeat(15, 1fr)" },
          borderRadius: 0,
          height: { xs: "69vh", sm: "85vh", md: "90vh" },
        }}
      >
        <CardMedia
          sx={{
            gridColumn: "1/13",
            gridRow: "1/16",
          }}
          component="img"
          image={ImgBp(4)}
          alt="LEDO"
        ></CardMedia>

        <Box
          sx={{
            gridColumn: { xs: "1/7", sm: "7/12", md: "8/12" },
            gridRow: { xs: "1/8", sm: "3/12", md: "2/9" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
          className="info-background"
        >
          <Typography variant="body1" sx={{ fontWeight: "700", pl: 4, pr: 4 }}>
            We’ve built a business and a culture that prioritizes people,
            <br />
            because solid relationships with our customers <br /> and employees
            will always be what matters most.
          </Typography>
          <Link to="/careers" className="link">
            <Button
              variant="contained"
              color="error"
              sx={{ width: "12vw", height: "45px", borderRadius: 8 }}
            >
              JOIN OUR TEAM
            </Button>
          </Link>
        </Box>
      </Card>
      <Card
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "repeat(15, 1fr)",
          borderRadius: 0,
          height: { xs: "65vh", sm: "90vh", md: "90vh" },
        }}
      >
        <CardMedia
          sx={{
            gridColumn: "1/13",
            gridRow: "1/16",
          }}
          component="img"
          image={ImgBp(5)}
          alt="LEDO"
        ></CardMedia>

        <Box
          sx={{
            gridColumn: { xs: "2/12", sm: "2/12", md: "2/12" },
            gridRow: { xs: "2/5", sm: "3/4", md: "2/3" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Typography color="white" variant="h4">
            {selector.shop.activeShop.phone}
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default MainPage;
