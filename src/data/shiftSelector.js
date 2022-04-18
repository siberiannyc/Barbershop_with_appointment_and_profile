import { useSelector } from "react-redux";
import {
  MorningShift,
  DayShift,
  EveningShift,
  AllDayShift,
} from "./shiftsList";

const SwitchShift = () => {
  const selector = useSelector((state) => state.shift.shift);

  const selectShift = () => {
    switch (selector) {
      case "Morning":
        return MorningShift;

      case "Day":
        return DayShift;

      case "Evening":
        return EveningShift;

      default:
        return AllDayShift;
    }
  };

  let timeArr = ["shift"];

  for (let t of AllDayShift) {
    timeArr.push(t);
  }

  const timeObj = timeArr.reduce(function (a, key) {
    if (key === "shift") {
      return Object.assign(a, { [key]: selector });
    } else {
      if (selectShift().includes(key)) {
        return Object.assign(a, { [key]: true });
      } else {
        return Object.assign(a, { [key]: false });
      }
    }
  }, {});

  return timeObj;
};

export default SwitchShift;
