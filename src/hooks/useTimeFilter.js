import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterSlots, freeSlots, freeSlotsUS } from "../store/barberSlice";
import { totalTime } from "../store/servSlice";
import Selectors from "../store/selectors";
import { months } from "../data/miscList";
import StampConverter from "./stampConverter";

export const useTimeFilter = (fetch, slots, setLoading) => {
  let dispatch = useDispatch();
  const selector = Selectors();

  let year = new Date().getFullYear();
  let monthToDigit = selector.appointmentDate.substring(0, 3);
  let dayToStamp = selector.appointmentDate.substring(4, 7);
  let monthToStamp = Object.entries(months)
    .filter(([key, value]) => monthToDigit === value)
    .map(([key, value]) => {
      return key;
    });
  let now = new window.Date().getTime();

  useEffect(() => {
    if (fetch) {
      let slotsToFilter = [];
      let timeExcRaw = [];
      let availableSlots = [];

      // Total time of services
      const totalServTime = selector.serviceTime.reduce((a, b) => a + b, 0);
      dispatch(totalTime(totalServTime));

      // Refactoring chosen date slots to a timestamp
      for (let slot of slots) {
        let timeStamp = new Date(
          `${year}-${monthToStamp}-${dayToStamp}` + slot
        ).getTime();
        slotsToFilter.push(timeStamp);
      }

      // Filter time slots that > than present time
      let filteredStamps = slotsToFilter.filter((slot) => slot > now);
      let filteredSlots = filteredStamps.map((slot) => {
        return new Date(slot).toTimeString().slice(0, 5);
      });
      // Detecting slots that don't feet service time
      for (let stamp of filteredStamps) {
        let timeToTrue = new Date(stamp).toTimeString().slice(0, 5);
        let finishTime = stamp + 60000 * (totalServTime - 15);
        let fifteenMin = stamp;
        while (fifteenMin < finishTime) {
          fifteenMin = fifteenMin + 60000 * 15;
          let exclTime = new Date(fifteenMin).toTimeString().slice(0, 5);
          if (!filteredSlots.includes(exclTime)) {
            timeExcRaw.push(timeToTrue);
          }
        }
      }

      // Time slots that do not fit to user service time
      let timeExcClean = timeExcRaw.filter(
        (item, index) => timeExcRaw.indexOf(item) === index
      );

      // Available Time Slots
      let timeSorted = filteredSlots.filter(
        (times) => !timeExcClean.includes(times)
      );
      dispatch(freeSlots(timeSorted));

      // Setting 12-hour format for UI
      timeSorted.forEach((time) => {
        let slotsUS = new Date(`1970-01-01T${time}`).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        availableSlots.push(slotsUS);
      });

      dispatch(freeSlotsUS(availableSlots));
      dispatch(filterSlots(false));
      setLoading(false);

      return availableSlots;
    }
  }, [fetch]);
};
