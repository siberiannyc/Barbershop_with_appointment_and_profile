import React from "react";
import { useState } from "react";
import { Box } from "@mui/system";
import { Card, Typography } from "@mui/material";
import BoxesStyles from "../../styles/styleBoxes";
import CustomerAvatar from "../misc/avatar";
import { useSignOut } from "../../firebase/auth";
import { NavLink } from "react-router-dom";
import ShopDropdown from "../shop card/shopDropdown";
import { dashboardMenuMain, dashboardMenuAccount } from "../../data/miscList";
import Selectors from "../../store/selectors";

export default function SummaryBox() {
  const [signOut, setSignOut] = useState(false);
  let boxes = BoxesStyles();
  const selector = Selectors();

  let firstName = selector.customer.firstName;
  let lastName = selector.customer.lastName;
  let email = selector.customer.email;
  let name = `${firstName} ${lastName}`;

  const signOutHandler = () => {
    setSignOut(true);
  };

  const activeLink = ({ isActive }) =>
    isActive ? "active-link" : "summary-link";

  useSignOut(signOut);
  return (
    <Card className={boxes.summaryBox} raised>
      <Box className={boxes.avatarSection}>
        <CustomerAvatar
          width="100px"
          height="100px"
          size="2.5rem"
        ></CustomerAvatar>
        <Box className={boxes.groupBox}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            {name}
          </Typography>
          <Typography variant="overline" sx={{ textAlign: "center" }}>
            {email}
          </Typography>
          <ShopDropdown
            situation={"setup"}
            fs="0.7rem"
            pinColor="error"
            pinSize="1rem"
          />
        </Box>
      </Box>
      <Box className={boxes.summarySection}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Services
        </Typography>
        {dashboardMenuMain.map((service) => {
          return (
            <NavLink
              to={service.id}
              style={{ textDecoration: "none" }}
              key={service.name}
              className={activeLink}
            >
              <p>{service.name}</p>
            </NavLink>
          );
        })}
      </Box>
      <Box className={boxes.summarySection}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Account
        </Typography>
        {dashboardMenuAccount.map((info) => {
          return !info.id ? (
            <p
              onClick={signOutHandler}
              key={info.name}
              className="summary-link"
            >
              {info.name}
            </p>
          ) : (
            <NavLink
              to={info.id}
              key={info.name}
              className={activeLink}
              style={{ textDecoration: "none" }}
            >
              <p>{info.name}</p>
            </NavLink>
          );
        })}
      </Box>
    </Card>
  );
}
