import { useState, useEffect } from "react";
import BarbersList from "../data/barbersList";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  barberId,
  barber,
  multiFetched,
  barbFetched,
  isRandom,
  isNotRandom,
  allBarbersTimes,
} from "../store/barberSlice";
import { initShop } from "../store/shopSlice";
import { Card, Typography, CardHeader, Avatar, Box } from "@mui/material";
import { useBarbUpload } from "../firebase/barberConfigs";
import { useRandomBarb } from "../firebase/barberConfigs";
import Selectors from "../store/selectors";
import { loader } from "../store/loginSlice";
import ShopDropdown from "../elements/shop card/shopDropdown";
import BoxesStyles from "../styles/styleBoxes";
import { Tooltip, Zoom } from "@mui/material";

const BarberCard = ({
  caseToHandle,
  setOpen,
  setRandom,
  w,
  h,
  aw,
  ah,
  setTimeOpen,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selector = Selectors();
  const boxes = BoxesStyles();

  const [defaultBarberId, setDefaultBarberId] = useState("");
  const [address, setAddress] = useState({});

  // Default barber for user
  useEffect(() => {
    if (selector.authorized) {
      let count = 0;
      Object.entries(selector.customer.barbers).forEach(([key, value]) => {
        if (key == selector.customer.activeShop.id) {
          setDefaultBarberId(value);
          count++;
        }
      });
      if (count === 0) {
        setDefaultBarberId("");
      }
      setAddress({
        activeShop: {
          address: selector.customer.activeShop.address,
          city: selector.customer.activeShop.city,
          name: selector.customer.activeShop.name,
          phone: selector.customer.activeShop.phone,
          id: selector.customer.activeShop.id,
        },
      });
    }
  }, [selector.customer]);

  // All barbers in a chosen shop (for ANY BARBER card)
  useEffect(() => {
    let allAvTimes = [];
    let objToDispatch = {
      availableTime: {},
      reservations: {},
    };

    for (let barber of selector.shopBarbers) {
      allAvTimes.push(barber.availableTime);
    }

    for (let time of allAvTimes) {
      Object.entries(time).map(([date, time]) => {
        return (objToDispatch.availableTime[date] = {
          ...objToDispatch.availableTime[date],
          time,
        });
      });
    }
    dispatch(barber(objToDispatch));
    dispatch(loader(false));
  }, [selector.shopBarbers]);

  // Actions on a card press
  const cardHandler = (c, id, name) => {
    if (c === "customerChoice" && name !== "ANY BARBER") {
      setTimeOpen(false);
      dispatch(isNotRandom(true));
      // setRandom(false);
      dispatch(barberId(id));
      dispatch(barbFetched(true));
      // setFetch(true);
      setOpen(true);
    } else if (c === "customerChoice" && name === "ANY BARBER") {
      setTimeOpen(false);
      dispatch(isRandom(true));
      dispatch(multiFetched(true));
      setOpen(true);
    } else if (c === "customerDefaultBarber" && defaultBarberId === "") {
      if (selector.shop.activeShop.name !== "") {
        navigate("/book-services/services");
      } else {
        navigate("/book-shop");
      }
    } else if (c === "customerDefaultBarber" && defaultBarberId !== "") {
      navigate("/book-services/services");
      dispatch(barberId(defaultBarberId));
      dispatch(isNotRandom(true));
      dispatch(initShop(address));
    }
  };

  // Filter barbers according to case
  const barbersFiltered = () => {
    switch (caseToHandle) {
      case "customerChoice":
        let shopBarber = BarbersList.filter(
          (barber) => barber.shop === selector.shop.activeShop.name
        );
        return shopBarber;

      case "barberShift":
        return BarbersList.filter(
          (barber) => barber.dbId === selector.barberId
        );

      default:
        return BarbersList;

      case "customerDefaultBarber":
        if (defaultBarberId !== "") {
          let defaultBarber = BarbersList.filter(
            (barber) => barber.dbId === defaultBarberId
          );
          return defaultBarber;
        }
    }
  };

  useRandomBarb(selector.multi);
  useBarbUpload(selector.fetchBarber, selector.barberId);

  return (
    <>
      {caseToHandle === "customerDefaultBarber" && defaultBarberId === "" ? (
        <Card
          raised
          className="serviceCard"
          sx={{
            width: w,
            height: h,
            borderRadius: { xs: 3, md: 3 },
            display: "flex",
            flexDirection: "column-reverse",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            mb: 2,
            p: 2,
          }}
          onClick={() => cardHandler(caseToHandle)}
        >
          <Typography variant="body1">
            Make your first booking to set your barber.
          </Typography>
          <Typography variant="h3">No One...Yet</Typography>
          <ShopDropdown
            situation={"setup"}
            fs="1rem"
            pinColor="error"
            pinSize="1rem"
          />
          <CardHeader title="YOUR BARBER" />
        </Card>
      ) : (
        barbersFiltered().map((barber) => {
          return (
            <Tooltip
              title={`             
                  Click on this card to make an appointment with ${barber.name}
`}
              TransitionComponent={Zoom}
              placement="bottom"
              key={barber.id}
            >
              <Card
                onClick={() =>
                  cardHandler(caseToHandle, barber.dbId, barber.name)
                }
                className="serviceCard"
                raised
                label={barber.shop}
                sx={{
                  width: w,
                  height: h,
                  borderRadius: { xs: 3, md: 3 },
                  display: "flex",
                  flexDirection: "column-reverse",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  flexWrap: "wrap",
                  mb: 2,
                  p: 2,
                }}
              >
                {caseToHandle === "barberShift" && (
                  <Typography variant="h6">{barber.shop}</Typography>
                )}

                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  {barber.name}
                </Typography>
                {barber.name !== "ANY BARBER" && (
                  <Avatar
                    alt={`LEDO Barbershop. ${barber.name}`}
                    src={barber.pic}
                    sx={{ width: aw, height: ah }}
                  />
                )}

                {caseToHandle === "customerDefaultBarber" && (
                  <Box className={boxes.column} sx={{ alignItems: "center" }}>
                    <CardHeader title="YOUR BARBER" />
                    <ShopDropdown
                      situation={"setup"}
                      fs="0.7rem"
                      pinColor="error"
                      pinSize="1rem"
                    />
                  </Box>
                )}
              </Card>
            </Tooltip>
          );
        })
      )}
    </>
  );
};

export default BarberCard;
