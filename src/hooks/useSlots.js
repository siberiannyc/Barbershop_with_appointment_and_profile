import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { daySlots, filterSlots } from "../store/barberSlice";
import { allBarbers } from "../store/barberSlice";
import Selectors from "../store/selectors";

export const useRandomBarber = (fetch, date, setLoading) => {
  const dispatch = useDispatch();
  const selector = Selectors();

  useEffect(() => {
    if (fetch && date) {
      setLoading(true);
      let timeSlot = [];
      let barbersObj = {};

      let barbersAtDate = selector.shopBarbers.filter(
        (barber) => barber.freeSlots[selector.appointmentDate]
      );

      for (let barb of barbersAtDate) {
        barbersObj = {
          ...barbersObj,
          [barb.id]: barb.freeSlots[selector.appointmentDate],
        };
      }

      Object.values(barbersObj).map((times) => {
        timeSlot.push(times);
      });
      let times = timeSlot.flat();
      let slots = times
        .filter(function (item, pos) {
          return times.indexOf(item) == pos;
        })
        .sort();
      dispatch(allBarbers(barbersObj));
      dispatch(filterSlots(true));
      dispatch(daySlots(slots));
    }
  }, [date]);
};

export const useSlots = (fetch, date, setLoading) => {
  const barber = useSelector((state) => state.barber.barber);
  const dateSelector = useSelector((state) => state.date.customDate);
  const dispatch = useDispatch();
  const selector = Selectors();

  useEffect(() => {
    if (fetch && date) {
      setLoading(true);
      let pickObj = {};
      let filteredTime = [];
      if (barber.freeSlots !== undefined) {
        const availablePick = Object.entries(barber.freeSlots)
          .filter(([key, value]) => key === dateSelector)
          .map(([key, value]) => {
            return value;
          });

        for (let pick of availablePick) {
          pickObj = pick;
        }
        filteredTime = Object.values(pickObj);
      }
      let slots = filteredTime.flat();
      dispatch(filterSlots(true));
      dispatch(daySlots(slots));
    }
  }, [date]);
};
