import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { finishTime } from "../store/servSlice";
import { customTimeArr } from "../store/dateSlice";
import { barberId, barbFetched } from "../store/barberSlice";
 import Selectors from "../store/selectors";

export const useTimeChoice = (fetch, time, setLoading) => {
  let slicedArr = [];
  let barbEntries = [];
   const selector = Selectors();

  const dispatch = useDispatch();
  const [uniTime, setUniTime] = useState("");

  useEffect(() => {
    let rbn = 0;
    if (uniTime !== "") {
      for (let i = 0; i < selector.schedule.length; i++) {
        if (selector.schedule[i] === uniTime) {
          slicedArr = selector.schedule.slice([i], [i + selector.totalTime / 15]);

          dispatch(finishTime(selector.schedule[i - 1 + selector.totalTime / 15]));
          dispatch(customTimeArr(slicedArr));
        }
      }

      if (selector.random) {
        Object.entries(selector.availableBarbers).map(([key, value]) =>
          barbEntries.push([key, value])
        );
        let availBarbers = [];

        for (let barber of barbEntries) {
          let checker = slicedArr.every((v) => barber[1].includes(v));
          checker && availBarbers.push(barber[0]);
          rbn = Math.floor(Math.random() * availBarbers.length);
        }

        dispatch(barberId(availBarbers[rbn]));
        dispatch(barbFetched(true));
      }
    }
  }, [uniTime]);

  useEffect(() => {
    if (fetch && time !== "") {

      let tObj = {};
      for (let i = 0; i < selector.USSlots.length; i++) {
        tObj[selector.USSlots[i]] = selector.freeSlots[i];
      }
      Object.entries(tObj).forEach(([key, value]) => {
        if (time == key) {
          setUniTime(value);
        }
      });
    }
  }, [fetch]);
};
