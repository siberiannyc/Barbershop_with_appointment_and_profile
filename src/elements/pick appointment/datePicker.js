import { useDispatch } from "react-redux";
import { customDateChoice } from "../../store/dateSlice";
import Calendar from 'react-calendar'

// MUI imports
import { TextField, Dialog, DialogActions } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import Selectors from "../../store/selectors";
import { isNotRandom, isRandom } from "../../store/barberSlice";
import Loader from "../misc/loader";
import { loader } from "../../store/loginSlice";
import { CalendarPicker } from "@mui/x-date-pickers";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";

const DateNew = ({ open, setOpen, setOpenTime }) => {
  const dispatch = useDispatch();
  const selector = Selectors();

  const today = new Date();

  // Close modal
  const handleClose = () => {
    setOpen(false);
    dispatch(isRandom(false));
    dispatch(isNotRandom(false));
  };


  // Set date to redux + open time picker
  const dateSet = (newValue) => {
    dispatch(customDateChoice(newValue.toDateString().slice(4)));
    setOpenTime(true);
    setOpen(false);
  };

  // Enable 30 days from today in datepicker
  const month = () => {
    let start = today.getTime();
    let date = start;
    let finish = new Date(start + 60000 * 1440 * 30);
    let month = [];
    while (date <= finish) {
      month.push(new Date(date).toDateString().slice(4));
      date = date + 60000 * 1440;
    }
    return month;
  };

  // Available dates highlight
  let barberTimes = Object.keys(selector.barber.availableTime);
  let avDates = month().filter((dates) => !barberTimes.includes(dates));

  const dateHighlights = (date) => {
    let dates = avDates
      .map((myDate) => new Date(myDate).getTime())
      .includes(date.getTime());
    return dates;
  };

  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#D65032",
      },
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <StaticDatePicker
          allowSameDateSelection
          minDate={today}
          maxDate={new Date().setDate(today.getDate() + 30)}
          displayStaticWrapperAs="desktop"
          openTo="day"
          onChange={(newValue) => dateSet(newValue)}
          shouldDisableDate={dateHighlights}
          renderInput={(params) => <TextField {...params} />}
          // orientation="landscape"
          sx={{ p: 5 }}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
};
export default DateNew;
