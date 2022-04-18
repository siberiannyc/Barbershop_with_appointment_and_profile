import React from "react";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import HowToRegTwoToneIcon from "@mui/icons-material/HowToRegTwoTone";
import LocalOfferTwoToneIcon from "@mui/icons-material/LocalOfferTwoTone";
import AssignmentTwoToneIcon from "@mui/icons-material/AssignmentTwoTone";
import ContentCutTwoToneIcon from "@mui/icons-material/ContentCutTwoTone";
import HourglassTopTwoToneIcon from "@mui/icons-material/HourglassTopTwoTone";
import BallotTwoToneIcon from "@mui/icons-material/BallotTwoTone";
import AppointmentServices, {
  AppointmentServicesExt,
} from "../elements/appointmentServices";
import { Services } from "../elements/appointmentServices";

export default function AppointmentCardStructure(data) {
  let infoObject = {
    date: {
      data: data.date,
      name: "Date",
      icon: <CalendarMonthTwoToneIcon />,
    },
    time: {
      data: data.usTime,
      name: "Time",
      icon: <AccessTimeTwoToneIcon />,
    },
    price: {
      data: ` $${data.total}`,
      name: "Price",
      icon: <LocalOfferTwoToneIcon />,
    },
    status: {
      data: data.status,
      name: "Status",
      icon: <AssignmentTwoToneIcon />,
    },
    id: data.id,
  };
  return infoObject;
}
export function StatsData(data) {
  let infoObject = {
    visits: {
      data: data.visits,
      name: "Total Visits",
      icon: <ContentCutTwoToneIcon />,
    },
    daysSinceLast: {
      data: data.daysSinceLast,
      name: "Days since last visit",
      icon: <HourglassTopTwoToneIcon />,
    },
    services: {
      data: <Services data={data} />,
      name: "Last Visit Services",
      icon: <BallotTwoToneIcon />,
    },
  };
  return infoObject;
}
export function PersonalData(data) {
  let infoObject = {
    firstName: {
      data: data.firstName,
      name: "First Name",
    },
    lastName: {
      data: data.lastName,
      name: "Last Name",
    },
    email: {
      data: data.email,
      name: "Email",
    },
    phone: {
      data: data.phone,
      name: "Phone",
    },
  };
  return infoObject;
}
export function PassChange() {
  let infoObject = {
    password: {
      name: "New Password",
    },
    confirm: {
      name: "Confirm new password",
    },
  };
  return infoObject;
}
