import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { systemMessage } from "../store/firebaseSlice";
import {
  snackbar,
  loader,
  errors,
  userFetch,
  isSigned,
} from "../store/loginSlice";

export const useChangePassword = (fetch, data, setFetch, setUpdate) => {
  let dispatch = useDispatch();
  const snackbarTrigger = useSelector((state) => state.login.snackbar);

  useEffect(() => {
    if (fetch) {
      let notVerified = {};
      //   Fields Regex Validation
      let verArr = [];
      let same = [];
      let passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
      let passwordChecked = passwordVal.test(data.password);
      // Check if a field is empty
      Object.entries(data).forEach(([key, value]) => {
        if (value === "") {
          notVerified = { ...notVerified, [key]: true };
          verArr.push(true);
        } else {
          notVerified = { ...notVerified, [key]: false };
          verArr.push(false);
          same.push(value);
        }
        dispatch(errors(notVerified));
      });

      // Close Snackbar of validated
      if (passwordChecked && snackbarTrigger) {
        dispatch(snackbar(false));
      }

      // Open Snackbar if data is not verified
      const dataNotVerified = (data, name, validation) => {
        if (data !== "" && !validation) {
          dispatch(
            systemMessage(
              "Incorrect password. Password should be at least 6 characters, contain at least one uppercase, one lowercase and one digit. Digits and english letters only."
            )
          );
          setFetch(false);
          notVerified = { ...notVerified, password: true };
          dispatch(errors(notVerified));
          dispatch(snackbar(true));
        }
      };

      dataNotVerified(data.password, "password", passwordChecked);

      // Open Snackbar if a field is empty
      if (verArr.includes(true) && verArr.length) {
        setFetch(false);
        dispatch(systemMessage("Please, fill in required* fields"));
        dispatch(snackbar(true));
      }
      if (same[0] !== same[1]) {
        setFetch(false);
        dispatch(systemMessage("Passwords don't match"));
        dispatch(snackbar(true));
        notVerified = { ...notVerified, password: true, confirm: true };
        dispatch(errors(notVerified));
      }

      // Submit
      if (
        !verArr.includes(true) &&
        verArr.length &&
        passwordChecked &&
        same[0] === same[1]
      ) {
        setFetch(false);
        dispatch(snackbar(false));
        setUpdate(true);
        // dispatch(loader(true));
      }
    }
  }, [fetch]);
};
