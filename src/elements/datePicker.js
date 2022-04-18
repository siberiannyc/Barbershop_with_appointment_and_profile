import { useDispatch } from "react-redux";
import { customDateChoice } from "../store/dateSlice";

// MUI imports
import { TextField, Dialog, DialogActions } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import Selectors from "../store/selectors";
import { isNotRandom, isRandom } from "../store/barberSlice";
import Loader from "./loader";
import { loader } from "../store/loginSlice";

const DatePicker = ({ open, setOpen, setOpenTime }) => {
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

  return (
    <>
      {selector.loader ? (
        <Loader text="Loading available dates..." />
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          width="xl"
        >
          <DialogActions sx={{ position: "relative" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                allowSameDateSelection
                minDate={today}
                maxDate={new Date().setDate(today.getDate() + 30)}
                displayStaticWrapperAs="desktop"
                openTo="day"
                onChange={(newValue) => dateSet(newValue)}
                shouldDisableDate={dateHighlights}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
export default DatePicker;
