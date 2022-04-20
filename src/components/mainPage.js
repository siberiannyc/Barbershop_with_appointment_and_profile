import { Box, Card, CardMedia } from "@mui/material";
import Banner from "../elements/banner";
import GraphicsBanner from "../elements/graphicsBanner";
import ImgBp from "../media/lists/imagesList";
import Selectors from "../store/selectors";
import { useEffect } from "react";
import BoxesStyles from "../styles/styleBoxes";
import barber from "../media/svg/barber.svg";
import saveMoney from "../media/svg/saveMoney.svg";
import { greeting, signUp, signUpTwo, careers } from "../data/texts";
import ShopCard from "../elements/shopCard";
import StyledButton from "../elements/styledButton";

const MainPage = () => {
  const boxes = BoxesStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Banner
        text="Precision above style style above shape"
        title="Book Now"
        link="/book-shop"
        w="30vw"
        h="100%"
        bgColor="secondary.light"
        typoColor="info.light"
        btnColor="accent"
        img={ImgBp(1)}
        column={{ xs: "2/11", sm: "7/12", md: "3/5" }}
        row={{ xs: "4/8", sm: "5/9", md: "5/8" }}
      />
      <GraphicsBanner
        bgColor="info.main"
        boxColor="accent.main"
        box1W="50%"
        box1H="70vh"
        box2W="50%"
        content1={greeting()}
        content2={<ShopCard />}
        content3
        img={barber}
        variant="left"
      />

      <Banner
        text="all you need for a space look"
        title="Our Services"
        link="/services/services"
        w="30vw"
        h="50%"
        bgColor="primary.light"
        typoColor="info.main"
        btnColor="accent"
        img={ImgBp(2)}
        column={{ xs: "2/11", sm: "2/7", md: "2/6" }}
        row={{ xs: "8/13", sm: "2/6", md: "3/8" }}
      />
      <GraphicsBanner
        bgColor="info.main"
        boxColor="secondary.dark"
        box1W="40%"
        box1H="70vh"
        box2W="60%"
        content1={signUp()}
        content2={signUpTwo()}
        content3={
          <StyledButton title="Sign Up" link="/authenticate" color="accent" />
        }
        img={saveMoney}
        variant="right"
      />
      <Banner
        text="see what you've been missing"
        title="Book Now"
        link="/book-shop"
        w="30vw"
        h="50%"
        bgColor="secondary.light"
        typoColor="info.main"
        btnColor="accent"
        img={ImgBp(3)}
        column={{ xs: "2/11", sm: "2/9", md: "2/6" }}
        row={{ xs: "2/9", sm: "2/8", md: "3/" }}
      />
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
          image={ImgBp(4)}
          alt="LEDO"
        ></CardMedia>

        <Box
          sx={{
            bgcolor: "info.main",
            alignItems: "center",
            justifyContent: "space-between",
            gridColumn: "8/12",
            gridRow: "1/10",
            p: 3,
          }}
          className={boxes.columnAdjust}
        >
          {careers()}
          <StyledButton title="Join our team" link="/careers" color="error" />
        </Box>
      </Card>
    </>
  );
};

export default MainPage;
