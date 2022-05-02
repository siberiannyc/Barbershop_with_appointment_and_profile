import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Redux imports
import { useDispatch } from "react-redux";
import { customDateChoice } from "../../store/dateSlice";
import { barbFetched, isNotRandom, isRandom } from "../../store/barberSlice";
import Selectors from "../../store/selectors";
import { Box, Typography } from "@mui/material";

// Firebase imports
import { useBarbUpload } from "../../firebase/barberConfigs";
import { useTimeFilter } from "../../hooks/useTimeFilter";
import { useTimeChoice } from "../../hooks/useTimeChoice";
// MUI imports
import { Dialog, DialogActions, DialogTitle, Card } from "@mui/material";
import TypoStyles from "../../styles/styleTypo";
import NoInfoBox from "../../components/noInfoBox";
import TimePickerCard from "./timePickerCard";

import empty from "../../media/svg/empty.svg";
import { useRandomBarber, useSlots } from "../../hooks/useSlots.js";
import Loader from "../misc/loader";
import BoxesStyles from "../../styles/styleBoxes";

const TimeNew = ({ setOpen }) => {
  const dispatch = useDispatch();
  const boxes = BoxesStyles();
  const typo = TypoStyles();
  const selector = Selectors();
  const [pickedTime, setPickedTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selector.barberId !== "") {
      dispatch(barbFetched(true));
    }
  }, [selector.barberId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handlers
  const handleClose = () => {
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
      < >
        Ooops, looks like this date is fully booked. Please,{" "}
        <span onClick={handleClose} className={typo.spanLink}>
          choose{" "}
        </span>
        another date or barber.
      </>
    );
  };

  return (
    <Box
      sx={{
        width: "100vw",
        maxHeight: "85vh",
        minHeight: "45vh",
        p: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
      }}
    >
      {!selector.USSlots.length ? (
        <NoInfoBox image={empty} text={text()} />
      ) : (
        <Box
          className={boxes.column}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            mb: 5,

            height: "85vh",
          }}
        >
          <Typography sx={{ mt: 2, mb: 2 }} variant="h6" color="accent.main">
            Press a barber icon to choose another date
          </Typography>
          <Box
            className={boxes.row}
            sx={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            {selector.USSlots.map((time) => {
              return (
                <Link
                  to="/finish-booking"
                  key={time}
                  style={{ textDecoration: "none" }}
                >
                  <TimePickerCard data={time} setData={setPickedTime} />
                </Link>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default TimeNew;
