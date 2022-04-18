import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Redux imports
import { useDispatch } from "react-redux";
import { customDateChoice } from "../store/dateSlice";
import { barbFetched, isNotRandom, isRandom } from "../store/barberSlice";
import Selectors from "../store/selectors";

// Firebase imports
import { useBarbUpload } from "../firebase/barberConfigs";
import { useTimeFilter } from "../hooks/useTimeFilter";
import { useTimeChoice } from "../hooks/useTimeChoice";
// MUI imports
import { Dialog, DialogActions, DialogTitle, Card } from "@mui/material";
import TypoStyles from "../styles/styleTypo";
import NoInfoBox from "./noInfoBox";
import TimePickerCard from "./timePickerCard";

import fullyBooked from "../media/svg/fullyBooked.svg";
import { useRandomBarber, useSlots } from "../hooks/useSlots.js";
import Loader from "./loader";

const TimePicker = ({ open, setOpen }) => {

  const dispatch = useDispatch();
  const typo = TypoStyles();
  const selector = Selectors();
  const [pickedTime, setPickedTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selector.barberId !== "") {
      dispatch(barbFetched(true));
    }
  }, [selector.barberId]);

  // Handlers
  const handleClose = () => {
    dispatch(customDateChoice(""));
    setOpen(false);
  };


  // Picking up time
  useSlots(selector.nonrandom, selector.appointmentDate, setLoading);
  useTimeFilter(selector.slots, selector.schedule, setLoading);
  // Time confirmation && random barber choice
  useTimeChoice(selector.timeConfirmed, pickedTime, setLoading);
  // Available barbers time calculation
  useRandomBarber(selector.random, selector.appointmentDate, setLoading);
  // Upload barber
  useBarbUpload(selector.fetchBarber, selector.barberId);

  const text = () => {
    return (
      <>
        Ooops, looks like this date is fully booked. Please,{" "}
        <span onClick={handleClose} className={typo.spanLink}>
          choose{" "}
        </span>
        another date or barber.
      </>
    );
  };

  return (
    <>
      {loading ? (
        <Loader text="Loading available time..." />
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="lg"
        >
          <DialogTitle>Choose Time</DialogTitle>
          <DialogActions>
            <Card
              sx={{
                width: "100vw",
                height: "100%",
                p: 1,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: { xs: "space-evenly", lg: "start" },
                gap: 1,
              }}
            >
              {!selector.USSlots.length ? (
                <NoInfoBox image={fullyBooked} text={text()} />
              ) : (
                selector.USSlots.map((time) => {
                  return (
                    <Link
                      to="/finish-booking"
                      key={time}
                      style={{ textDecoration: "none" }}
                    >
                      <TimePickerCard data={time} setData={setPickedTime} />
                    </Link>
                  );
                })
              )}
            </Card>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
export default TimePicker;
