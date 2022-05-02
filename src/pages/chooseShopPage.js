import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import { Link } from "react-router-dom";
import ShopDropdown from "../elements/shop card/shopDropdown";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../elements/misc/loader";
import GraphicsBanner from "../elements/banner/graphicsBanner";
import chooseShopSvg from "../media/svg/chooseShop.svg";
import BoxesStyles from "../styles/styleBoxes";
import { Header } from "../elements/banner/bookElements";
import DisShopButton from "../elements/buttons/disShopButton";

import Selectors from "../store/selectors";

const BookShop = () => {
  const [shopName, setShopName] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const selector = Selectors();
  const chooseShop = selector.shop.activeShop.name;
  const boxes = BoxesStyles();

  useEffect(() => {
    if (chooseShop === "") {
      setDisableBtn(true);
      document.getElementById("link").classList.remove("enabled-link");
      document.getElementById("link").classList.add("disabled-link");
    } else {
      setDisableBtn(false);
      document.getElementById("link").classList.remove("disabled-link");
      document.getElementById("link").classList.add("enabled-link");
    }
  }, [chooseShop]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dropDown = () => {
    return (
      <Box
        sx={{
          height: "60vh",
        }}
        className={boxes.card}
      >
        <ShopDropdown
          setShopName={setShopName}
          setButton={setDisableBtn}
          shopName={shopName}
          situation="book"
          fs="2rem"
          shopColor="info.main"
          pinColor="accentSecondary"
          pinSize="2rem"
        />

        <DisShopButton disableBtn={disableBtn} />
      </Box>
    );
  };

  const signReminder = () => {
    return (
      <>
        {!selector.authorized && (
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link to="../authenticate" className="link">
              <span className="signUp">Sign up</span>
            </Link>
          </Typography>
        )}
      </>
    );
  };

  return (
    <>
      {!selector.loader ? (
        <>
          <GraphicsBanner
            bgColor="info.main"
            boxColor="accent.main"
            box1W="50%"
            box1H="70vh"
            box2W="50%"
            content1={
              <Header
                header="select your preferred shop"
                subheader="You can easily change it later"
                headerColor="primary.main"
                subheaderColor="info.main"
              />
            }
            content2={dropDown()}
            content3={signReminder()}
            img={chooseShopSvg}
            variant="right"
          />
        </>
      ) : (
        <Loader text="Opening shop" />
      )}
    </>
  );
};

export default BookShop;
