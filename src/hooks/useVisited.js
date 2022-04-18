import { useEffect, useState } from "react";
import Selectors from "../store/selectors";
import { months } from "../data/miscList";
import { useUpdate } from "../firebase/auth";
import { useDispatch } from "react-redux";
import { loader } from "../store/loginSlice";
import StampConverter from "./stampConverter";

export default function useVisited(fetch) {
  const selector = Selectors();
  const dispatch = useDispatch();

  const [visitedRef, setVisitedRef] = useState(null);
  const [update, setUpdate] = useState(null);

  let now = new window.Date().getTime();
  let confirmed = {};
  let visited = { ...selector.customer.appointments.visited };
  const appointments = Object.entries(selector.customer.appointments.confirmed);
  //   Creating timestamp for a time/date of confirmed card
  const finishStamp = (val) => {
    let visitedTime = StampConverter(val) + 60000 * (val.time.length * 15);
    return visitedTime;
  };

  useEffect(() => {
    if (fetch) {
      let visitedFilter = appointments.filter(([key, val]) => {
        // Filtering all visits that are finished
        return finishStamp(val) < now;
      });

      // Filtering confirmed but not visited yet
      appointments
        .filter(([key, val]) => {
          return finishStamp(val) > now;
        })
        .map(([key, val]) => {
          return (confirmed[key] = val);
        });

      // Setting refreshed information to customer's data
      visitedFilter.forEach(([key, value]) => {
        return (visited[key] = { ...value, status: "Visited" });
      });

      setVisitedRef({
        appointments: {
          ...selector.customer.appointments,
          confirmed,
          visited,
        },
      });

      setUpdate(true);
    }
  }, [fetch]);

  useEffect(() => {
    if (update) setUpdate(false);
  }, [selector.customer]);

  useUpdate(update, visitedRef);
}
