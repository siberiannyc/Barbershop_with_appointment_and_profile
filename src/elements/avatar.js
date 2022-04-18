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

  let dispatch = useDispatch();

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }

    dispatch(avatarColor(color));
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: width,
        height: height,
        fontSize: size,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  return <Avatar {...stringAvatar(name)}></Avatar>;
}
