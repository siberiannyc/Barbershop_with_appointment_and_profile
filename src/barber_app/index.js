// Imports
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { barberId, barbFetched, barbUpdate } from "../store/barberSlice";
import { shift as shiftProp } from "../store/shiftSlice";
import { useBarbUpdate, useBarbUpload } from "../firebase/barberConfigs";
import SwitchShift from "../data/shiftSelector";
import ShiftsList from "../data/shiftsList";
import BarbersList from "../data/barbersList";
import BarberCard from "../elements/barberCard";
import Selectors from "../store/selectors";
// MUI Imports
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {
  Typography,
  Container,
  Card,
  Stack,
  Button,
  TextField,
  Box,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CareersForm from "../elements/careersForm";

// --------------------

const BarberSchedule = () => {
  const [value, setValue] = useState(new Date());
  const [date, setDate] = useState(new Date().toDateString().slice(4));
  const [addShift, setAddShift] = useState({});

  const dispatch = useDispatch();

  const today = new Date();
  const shift = SwitchShift();
  const selector = Selectors();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Setting Date
  const dateSetClear = (newValue) => {
    setValue(newValue.toDateString());
    setDate(newValue.toDateString().slice(4));
  };

  // Uploading Barber Info
  const barberFetchHandler = (e) => {
    dispatch(barberId(e.target.value));
    dispatch(barbFetched(true));
  };

  // Adding new shift to barber's schedule
  const shiftHandler = () => {
    setAddShift({
      availableTime: {
        ...selector.barber.availableTime,
        [date]: Object.entries(shift)
          .filter(([key, value]) => {
            return value === true;
          })
          .map(([key, value]) => {
            return key;
          }),
      },
      freeSlots: {
        ...selector.barber.freeSlots,
        [date]: Object.entries(shift)
          .filter(([key, value]) => {
            return value === true;
          })
          .map(([key, value]) => {
            return key;
          }),
      },
    });
    dispatch(barbUpdate(true));
  };

  // Delete Shift
  const deleteHandler = (date) => {
    // Filtering dates list
    let datesList = selector.barber.availableTime;
    let slotsList = selector.barber.freeSlots;

    const filteredDates = Object.keys(datesList)
      .filter((dates) => dates !== date)
      .map((dates) => ({ [dates]: datesList[dates] }));
    const filteredSlots = Object.keys(slotsList)
      .filter((dates) => dates !== date)
      .map((dates) => ({ [dates]: slotsList[dates] }));

    const filtSlotsObj = filteredSlots.reduce(function (res, item) {
      let key = Object.keys(item)[0];
      res[key] = item[key];
      return res;
    }, {});

    const filtDatesObj = filteredDates.reduce(function (res, item) {
      let key = Object.keys(item)[0];
      res[key] = item[key];
      return res;
    }, {});

    setAddShift({
      availableTime: filtDatesObj,
      freeSlots: filtSlotsObj,
    });

    dispatch(barbUpdate(true));
  };

  //   Extracting date and shift for a shift card
  let obj = {};
  let resSched = [];

  const dates = Object.entries(selector.barber.availableTime).map((date) => {
    return date;
  });

  for (const [key, value] of dates) {
    obj = {
      date: key,
      start: value[0],
      finish: value[value.length - 1],
    };
    resSched.push(obj);
  }
  useBarbUpload(selector.fetchBarber, selector.barberId);
  useBarbUpdate(selector.update, addShift, selector.barberId);
  return (
    <div>
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
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-select"
            select
            label="Select Barber"
            helperText="Please select a barber"
            variant="filled"
            defaultValue={""}
            onChange={(e) => barberFetchHandler(e)}
          >
            {BarbersList.filter((barber) => barber.name !== "ANY BARBER").map(
              (barber) => (
                <MenuItem key={barber.id} value={barber.dbId}>
                  {barber.name}
                </MenuItem>
              )
            )}
          </TextField>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              allowSameDateSelection
              minDate={today}
              displayStaticWrapperAs="desktop"
              openTo="day"
              value={value}
              onChange={(newValue) => dateSetClear(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <Card>
            <Stack>
              {ShiftsList.map((shift) => {
                return (
                  <Button
                    key={shift.id}
                    value={shift.shift}
                    onClick={shiftHandler}
                    onMouseDown={(e) => dispatch(shiftProp(e.target.value))}
                  >
                    {shift.shift} ({shift.time})
                  </Button>
                );
              })}
            </Stack>
          </Card>
        </Box>
        <Box
          sx={{
            width: "100%",
            maxHeight: "50%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "50%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              pl: 1,
            }}
          >
            <BarberCard
              caseToHandle="barberShift"
              w="250px"
              h="250px"
              aw="70%"
              ah="70%"
            />
          </Box>
          <Box
            sx={{
              width: "30%",
              height: "100%",
              overflow: "scroll",
              // pt: 1
              position: "relative",
            }}
          >
            {selector.update && (
              <CircularProgress
                id="loader"
                sx={{
                  position: "absolute",
                  top: "45%",
                  left: "40%",
                }}
              />
            )}

            {resSched
              .sort(function (a, b) {
                return Date.parse(a.date) - Date.parse(b.date);
              })
              .filter(
                (shift) =>
                  new Date(shift.date).getTime() >=
                  new Date().setHours(0, 0, 0, 0)
              )
              .map((data) => {
                return (
                  <Card
                    key={data.date}
                    raised
                    sx={{
                      width: "90%",
                      height: "20%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                      ml: 1,
                    }}
                  >
                    <Typography variant="h6" color="green" sx={{ ml: 3 }}>
                      {data.date}
                    </Typography>
                    <Typography variant="h6" color="secondary"></Typography>
                    {data.start} - {data.finish}
                    <IconButton
                      onClick={() => deleteHandler(data.date)}
                      sx={{ mr: 3 }}
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </Card>
                );
              })}
          </Box>
          <Box>{/* <Card></Card> */}</Box>
        </Box>
        <CareersForm />
      </Container>
    </div>
  );
};

export default BarberSchedule;
