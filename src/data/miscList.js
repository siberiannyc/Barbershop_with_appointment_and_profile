import { useDispatch } from "react-redux";

const fieldData = [
  {
    name: "First Name",
    keyName: "firstName",
  },
  {
    name: "Last Name",
    keyName: "lastName",
  },
  {
    name: "E-mail",
    keyName: "email",
  },
  {
    name: "Phone",
    keyName: "phone",
  },
  {
    name: "Password",
    keyName: "password",
  },
];

export const dashboardMenuMain = [

  {
    name: "Stats",
    id: "stats",
  },
  {
    name: "Appointments",
    id: "appointments",

  },
  // {
  //   name: "Membership",
  //   id: "membership",
  // },
];
export const dashboardMenuAccount = [
  {
    name: "Personal Info",
    id: "personal",
  },
  {
    name: "Security",
    id: "security",
  },
  {
    name: "Log Out",
  },
];
export const months = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

export const footerLinks = [
  {
    category: "ACCOUNT",
    name: "Book Now",
    link: "/book-shop",
  },
  {
    category: "ACCOUNT",
    name: "Account",
    link: "/profile/stats",
  },
  {
    category: "ACCOUNT",
    name: "Appointments",
    link: "/profile/appointments",
  },
  {
    category: "COMPANY",
    name: "Services",
    link: "/services/services",
  },
  {
    category: "COMPANY",
    name: "Careers",
    link: "/careers",
  },
];

export default fieldData;
