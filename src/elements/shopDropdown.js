import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Typography, Menu, Button, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import BoxesStyles from "../styles/styleBoxes";
import { useUpdate } from "../firebase/auth";
import Shops from "../data/shopsList";
import { initShop, mainPage } from "../store/shopSlice";
import { isUpdated } from "../store/customerSlice";
import Selectors from "../store/selectors";
import { loader } from "../store/loginSlice";

const ShopDropdown = ({
  setShopName,
  setButton,
  shopName,
  situation,
  setUser,
  user,
  fs,
}) => {
  const [address, setAddress] = useState({});
  const [autoHandling, setAutoHandling] = useState(true);
  const [update, setUpdate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const boxes = BoxesStyles();
  const selector = Selectors();

  // Checks on BOOK NOW if authorized user already has the preferred shop
  useEffect(() => {
    if (selector.authorized && situation === "book") {
      setAutoHandling(true);
      shopHandle();
    } else {
      setAutoHandling(false);
    }
  }, []);

  // Sets chosen shop to Redux
  useEffect(() => {
    if (Object.keys(address).length) {
      dispatch(initShop(address));
    }
  }, [address]);

  useEffect(() => {
    setUpdate(false);
  }, [selector.customer]);

  // Sets chosen shop
  const shopHandle = (e) => {
    let myValue = "";
    if (autoHandling && situation === "book") {
      myValue = selector.customer.activeShop.name;
      setAutoHandling(false);
    } else {
      myValue = e.currentTarget.dataset.myValue;
    }

    for (let shop of Shops) {
      if (shop.name === myValue) {
        // setShopName(shop.name);
        setAddress({
          activeShop: {
            address: shop.address,
            city: shop.city,
            name: shop.name,
            phone: shop.phone,
            id: shop.id,
            hours: "Mon-Sun 10:00 A.M. - 8:00 P.M.",
          },
        });
      }
    }

    if (situation === "book") {
      if (selector.authorized) {
        setUpdate(true);
      }
      handleClose();
      setButton(!myValue);
    } else if (situation === "setup") {
      setUpdate(true);
      handleClose();
    } else if (situation === "mainPage") {
      handleClose();
    }
  };

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  useUpdate(update, address);

  return (
    <>
      <Box className={boxes.row} sx={{ justifyContent: "center" }}>
        {!selector.authorized && (
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(e) => openMenu(e)}
            sx={{ fontSize: fs }}
          >
            {selector.shop.activeShop.name !== ""
              ? ` ${selector.shop.activeShop.name}, ${selector.shop.activeShop.city}`
              : "Choose your shop"}
          </Button>
        )}
        {selector.authorized && (
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(e) => openMenu(e)}
            sx={{ fontSize: fs }}
          >
            {selector.customer.activeShop.name !== ""
              ? ` ${selector.customer.activeShop.name}, ${selector.customer.activeShop.city}`
              : "Choose your shop"}
          </Button>
        )}

        {/* <IconButton onClick={(e) => openMenu(e)}> */}
        <LocationOnRoundedIcon
          color="error"
          sx={{ fontSize: "1rem" }}
          onClick={(e) => openMenu(e)}
        />
        {/* </IconButton> */}
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {Shops.map((shop) => (
          <MenuItem
            data-my-value={shop.name}
            key={shop.id}
            value={shop.name}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "space-between",
            }}
            onClick={(e) => shopHandle(e)}
          >
            <Typography variant="h6" data-my-value={shop.name}>
              {shop.city} {shop.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "gray" }}
              data-my-value={shop.name}
            >
              {shop.address}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
export default ShopDropdown;
