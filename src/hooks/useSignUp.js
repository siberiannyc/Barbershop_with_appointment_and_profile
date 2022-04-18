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

export const useSignUp = (fetch, user, email, phone, password) => {
  let dispatch = useDispatch();
  const snackbarTrigger = useSelector((state) => state.login.snackbar);

  useEffect(() => {
    if (fetch) {
      let notVerified = {};
      //   Fields Regex Validation
      let verArr = [];
      let emailVal = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
      let phoneVal =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im;
      let passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;

      let emailChecked = emailVal.test(user.email);
      let phoneChecked = phoneVal.test(user.phone);
      let passwordChecked = passwordVal.test(user.password);

      // Check if a field is empty
      Object.entries(user).forEach(([key, value]) => {
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
        (phoneChecked && snackbarTrigger) ||
        (passwordChecked && snackbarTrigger)
      ) {
        dispatch(snackbar(false));
      }
      // Open Snackbar if data is not verified
      const dataNotVerified = (data, name, validation) => {
        dispatch(isSigned(false));
        if (data.length && !validation) {
          if (name === "password") {
            dispatch(
              systemMessage(
                "Incorrect password. Password should be at least 6 characters, contain at least one uppercase, one lowercase and one digit. Digits and english letters only."
              )
            );
          } else {
            dispatch(systemMessage(`Please, check ${name} format`));
          }
          notVerified = { ...notVerified, [name]: true };
          dispatch(errors(notVerified));
          dispatch(snackbar(true));
        }
      };

      dataNotVerified(email, "email", emailChecked);
      dataNotVerified(phone, "phone", phoneChecked);
      dataNotVerified(password, "password", passwordChecked);

      // Open Snackbar if a field is empty
      if (verArr.includes(true) && verArr.length) {
        dispatch(isSigned(false));
        dispatch(systemMessage("Please, fill in required* fields"));
        dispatch(snackbar(true));
      }

      // Submit
      if (
        !verArr.includes(true) &&
        verArr.length &&
        emailChecked &&
        phoneChecked &&
        passwordChecked
      ) {
        dispatch(snackbar(false));
        dispatch(loader(true));
        dispatch(userFetch(true));
      }
    }
  }, [fetch]);
};
