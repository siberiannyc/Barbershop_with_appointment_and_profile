import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import BarberCard from "../elements/barberCard";
import DatePicker from "../elements/datePicker";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import TimePicker from "../elements/timePicker";
import { useBarbUpload } from "../firebase/barberConfigs";
import { barbFetched } from "../store/barberSlice";
import Selectors from "../store/selectors";
import { Link } from "react-router-dom";

const Barbers = () => {
  const [value, setValue] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [random, setRandom] = useState(false);

  const dispatch = useDispatch();
  const selector = Selectors();

  useBarbUpload(selector.fetchBarber, selector.barberId);

  useEffect(() => {
    if (selector.barberId !== "" && !selector.fetchBarber) {
      dispatch(barbFetched(true));
      setOpen(true);
    }
  }, [selector.barberId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <DatePicker
        setValue={setValue}
        value={value}
        open={open}
        setOpen={setOpen}
        setOpenTime={setOpenTime}
      />
      <TimePicker
        open={openTime}
        setOpen={setOpenTime}
        random={random}
        setRandom={setRandom}
      />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          mt: "13vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            height: { xs: "25%" },
          }}
        >
          <Typography variant="h5">CHOOSE YOUR BARBER?</Typography>
          <Typography variant="h5" sx={{ color: "gray" }}>
            Click on ANY BARBER for the first available date
          </Typography>
        </Box>
        <Box
          sx={{
            width: "70%",
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            mt: 2,
          }}
        >
          <BarberCard
            caseToHandle="customerChoice"
            setOpen={setOpen}
            setRandom={setRandom}
            w="200px"
            h="200px"
            aw="70%"
            ah="70%"
          />
        </Box>

        <Typography variant="body1" color="gray">
          Booking at {selector.shop.activeShop.name},{" "}
          {selector.shop.activeShop.city}
        </Typography>
        <Link to="/book-shop" className="link">
          <Typography variant="body1" color="error" sx={{ mb: 2 }}>
            switch shop
          </Typography>
        </Link>
      </Container>
    </>
  );
};

export default Barbers;
