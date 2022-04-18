const ShiftsList = [
  {
    id: 1,
    shift: "Morning",
    time: "10:00 a.m. - 03:00 p.m.",
  },
  {
    id: 2,
    shift: "Day",
    time: "01:00 p.m. - 05:00 p.m.",
  },
  {
    id: 3,
    shift: "Evening",
    time: "03:00 p.m. - 07:00 p.m.",
  },
  {
    id: 4,
    shift: "All Day",
    time: "10:00 a.m. - 07:00 p.m.",
  },
];


export const TimePeriods = () => {
  let times = [],
    i,
    j;


  for (i = 10; i < 20; i++) {
    for (j = 0; j < 4; j++) {
      times.push(i + ":" + (j === 0 ? "00" : 15 * j));
    }
  }
  return times;
};


export const MorningShift = TimePeriods().slice(0, 20);
export const DayShift = TimePeriods().slice(12, 28);
export const EveningShift = TimePeriods().slice(20, 40);
export const AllDayShift = 
TimePeriods()
  ;



export default ShiftsList