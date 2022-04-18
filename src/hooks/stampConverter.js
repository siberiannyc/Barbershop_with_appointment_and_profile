import React from "react";
import { months } from "../data/miscList";

export default function StampConverter(val) {
  let year = new Date().getFullYear();
  let monthToDigit = val.date.substring(0, 3);
  let dayToStamp = val.date.substring(4, 7);
  let monthToStamp = Object.entries(months)
    .filter(([key, value]) => monthToDigit === value)
    .map(([key, value]) => {
      return key;
    });

  let timeStamp = new Date(
    `${year}-${monthToStamp}-${dayToStamp}` + val.time[0]
  ).getTime();

  return timeStamp;
}
