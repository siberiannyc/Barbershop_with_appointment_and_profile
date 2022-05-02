import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import BarberCard from "../components/barberCard";
import DatePicker from "../elements/pick appointment/datePicker";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import TimePicker from "../elements/pick appointment/timePicker";
import { useBarbUpload } from "../firebase/barberConfigs";
import { barbFetched } from "../store/barberSlice";
import Selectors from "../store/selectors";
import { Link } from "react-router-dom";
import GraphicsBanner from "../elements/banner/graphicsBanner";
import { Header } from "../elements/banner/bookElements";
import chooseBarber from "../media/svg/chooseBarber.svg";
import BoxesStyles from "../styles/styleBoxes";
import DateNew from "../elements/pick appointment/datePicker";
import TimeNew from "../elements/pick appointment/timePicker";
import SummaryBox from "../elements/profile/summaryBox";
import BarbrContainer from "../components/barbrContainer";
import { Outlet } from "react-router-dom";

const BarbersNew = () => {
  const [value, setValue] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [random, setRandom] = useState(false);

  const dispatch = useDispatch();
  const selector = Selectors();
  const boxes = BoxesStyles();

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
    <Box
      className={boxes.row}
      sx={{ mt: "10vh", width: "100%", border: 1, justifyContent: "start" }}
    >
      <GraphicsBanner
        bgColor="info.main"
        boxColor="primary.dark"
        box1W="30%"
        box1H="100vh"
        box2W="70%"
        content1={
          <Header
            header="choose your barber"
            subheader={`Click on "ANY BARBER" for the first available date`}
            headerColor="info.main"
            subheaderColor="accent.main"
          />
        }
        content2={
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              mt: 2,
            }}
          >
            <BarberCard
              caseToHandle="customerChoice"
              setOpen={setOpen}
              setTimeOpen={setOpenTime}
              setRandom={setRandom}
              w="120px"
              h="120px"
              aw="70%"
              ah="70%"
            />
          </Box>
        }
        content3={
          <Box
            className={boxes.row}
            sx={{ justifyContent: "center", height: "100vh" }}
          >
            {open ? (
              <DateNew
                setValue={setValue}
                value={value}
                // open={open}
                setOpen={setOpen}
                setOpenTime={setOpenTime}
              />
            ) : null}
            {openTime ? <TimeNew setOpen={setOpenTime} /> : null}
          </Box>
        }
        content4={
          <Typography variant="h6">
            Choose one of our heroes or press ANY BARBER to see the first
            available appointment
          </Typography>
        }
        img={chooseBarber}
        variant="left"
        caseToOpen="datePicker"
        open={open}
        openTime={openTime}
      />
    </Box>
  );
};

export default BarbersNew;
