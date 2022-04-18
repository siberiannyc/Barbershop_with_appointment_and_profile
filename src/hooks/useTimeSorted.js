import React from "react";
import { months } from "../data/miscList";
import Selectors from "../store/selectors";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { daysSinceLast, lastVisit, nextVisit } from "../store/customerSlice";
import StampConverter from "./stampConverter";

export default function useTimeSorted() {
  const selector = Selectors();
  const dispatch = useDispatch();
  let confirmed = Object.entries(selector.customer.appointments.confirmed);
  let visited = Object.entries(selector.customer.appointments.visited);

  useEffect(() => {
    let confirmedArr = [];
    let visitedArr = [];

    confirmed.forEach(([key, value]) => {
      return confirmedArr.push(value);
    });
    let confirmedSorted = confirmedArr.sort(
      (a, b) => StampConverter(a) - StampConverter(b)
    );

    visited.forEach(([key, value]) => {
      return visitedArr.push(value);
    });
    let visitedSorted = visitedArr.sort(
      (a, b) => StampConverter(b) - StampConverter(a)
    );

    if (visitedSorted[0] === undefined) {
      dispatch(lastVisit(null));
    } else {
      dispatch(lastVisit(visitedSorted[0]));
    }
    if (confirmedSorted[0] === undefined) {
      dispatch(nextVisit(null));
    } else {
      dispatch(nextVisit(confirmedSorted[0]));
    }
    if (visitedSorted.length) {
      let now = new window.Date().getTime();
      let sec = (now - StampConverter(visitedSorted[0])) / 1000;
      let min = sec / 60;
      let hour = min / 60;
      let day = hour / 24;
      dispatch(daysSinceLast(Math.round(day)));
    }
  }, [selector.customer]);
}
