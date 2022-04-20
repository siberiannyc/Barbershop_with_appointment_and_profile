import React from "react";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { avatarColor } from "../store/customerSlice";
import Selectors from "../store/selectors";

export default function CustomerAvatar({ width, height, size }) {
  const selector = Selectors();
  let firstName = selector.customer.firstName;
  let lastName = selector.customer.lastName;
  let name = `${firstName} ${lastName}`;



  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: "accent.main",
        width: width,
        height: height,
        fontSize: size,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  return <Avatar {...stringAvatar(name)}></Avatar>;
}
