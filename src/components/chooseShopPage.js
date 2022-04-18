import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import ShopDropdown from "../elements/shopDropdown";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { barberId, filterSlots, resetBarberChoice } from "../store/barberSlice";
import { customDateChoice } from "../store/dateSlice";
import Loader from "../elements/loader";

import Selectors from "../store/selectors";
import { loader } from "../store/loginSlice";

const BookShop = () => {
  const [shopName, setShopName] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const dispatch = useDispatch();
  const selector = Selectors();
  const chooseShop = selector.shop.activeShop.name;

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

  return (
    <>
      {!selector.loader ? (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "88vh",
            mt: "12vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h5">SELECT YOUR PREFERRED SHOP </Typography>
            <Typography variant="h5" sx={{ color: "gray" }}>
              You can easily change it later
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "30vh",
            }}
          >
            <ShopDropdown
              setShopName={setShopName}
              setButton={setDisableBtn}
              shopName={shopName}
              situation="book"
              fs="2rem"
            />
            <Link
              to="/book-services/services"
              className="enabled-link"
              id="link"
              style={{ textDecoration: "none" }}
            >
              <Button
                color="error"
                variant="contained"
                disabled={disableBtn}
                onClick={() => {
                  dispatch(resetBarberChoice);
                  dispatch(barberId(""));
                  dispatch(filterSlots(false));
                  dispatch(customDateChoice(""));
                }}
                sx={{ width: "100%", height: "50px", borderRadius: 8, mr: 9 }}
              >
                BOOK NOW
              </Button>
            </Link>
          </Box>
          {!selector.authorized && (
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link to="../authenticate" className="link">
                <span className="signUp">Sign up</span>
              </Link>
            </Typography>
          )}
        </Container>
      ) : (
        <Loader text="Opening shop" />
      )}
    </>
  );
};

export default BookShop;
