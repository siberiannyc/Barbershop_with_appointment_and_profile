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

export const useChangePersonal = (
  fetch,
  data,
  setFetch,
  setUpdate,
) => {
  let dispatch = useDispatch();
  const snackbarTrigger = useSelector((state) => state.login.snackbar);

  useEffect(() => {
    if (fetch) {
      let notVerified = {};
      //   Fields Regex Validation
      let verArr = [];
      let emailVal = new RegExp("[A-Z0-9]+@[A-Z]+.[A-Z]{2,3}");
      let phoneVal =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im;

      let emailChecked = emailVal.test(data.email);
      let phoneChecked = phoneVal.test(data.phone);
      let email = data.email;
      let phone = data.phone;

      // Check if a field is empty
      Object.entries(data).forEach(([key, value]) => {
        if (value === "") {
          notVerified = { ...notVerified, [key]: true };
          verArr.push(true);
        } else {
          notVerified = { ...notVerified, [key]: false };
          verArr.push(false);
        }
        dispatch(errors(notVerified));
      });

      // Close Snackbar of validated
      if (
        (emailChecked && snackbarTrigger) ||
        (phoneChecked && snackbarTrigger)
      ) {
        dispatch(snackbar(false));
      }
      // Open Snackbar if data is not verified
      const dataNotVerified = (data, name, validation) => {
        setFetch(false);
        if (data.length && !validation) {
          dispatch(systemMessage(`Please, check ${name} format`));
          notVerified = { ...notVerified, [name]: true };
          dispatch(errors(notVerified));
          dispatch(snackbar(true));
        }
      };

      dataNotVerified(email, "email", emailChecked);
      dataNotVerified(phone, "phone", phoneChecked);

      // Open Snackbar if a field is empty
      if (verArr.includes(true) && verArr.length) {
        setFetch(false);
        dispatch(systemMessage("Please, fill in required* fields"));
        dispatch(snackbar(true));
      }

      // Submit
      if (
        !verArr.includes(true) &&
        verArr.length &&
        emailChecked &&
        phoneChecked
      ) {
        dispatch(snackbar(false));
        setFetch(false);
        setUpdate(true);
        // dispatch(loader(true));
        // dispatch(userFetch(true));
      }
    }
  }, [fetch]);
};
