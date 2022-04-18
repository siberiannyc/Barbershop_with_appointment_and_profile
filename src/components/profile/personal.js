import React, { useEffect } from "react";
import Selectors from "../../store/selectors";
import { months } from "../../data/miscList";
import { useState } from "react";
import { useEmail, useUpdate } from "../../firebase/auth";
import { Card, Box } from "@mui/material";
import BoxesStyles from "../../styles/styleBoxes";
import PersonalForm from "../../elements/personalForm";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import { PersonalData } from "../../data/dataObjects";
import { useDispatch } from "react-redux";
import { success } from "../../store/customerSlice";
import { errors, snackbar } from "../../store/loginSlice";
import { useChangePersonal } from "../../hooks/useChangePersonal";
import SnackbarAlert from "../../elements/snackbar";

export default function Personal() {
  const boxes = BoxesStyles();
  const selector = Selectors();
  const dispatch = useDispatch();
  const [user, setUser] = useState(selector.customer);
  const [validate, setValidate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);

  const changeHandler = (e) => {
    dispatch(success(false));
    dispatch(snackbar(false));
    setValidate(true);
  };

  useEffect(() => {
    dispatch(success(false));
    dispatch(snackbar(false));
    dispatch(
      errors({
        phone: false,
        firstName: false,
        lastName: false,
        email: false,
        password: false,
      })
    );
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (update) setUpdate(false);
  }, [selector.customer]);

  useChangePersonal(validate, user, setValidate, setUpdate);
  useUpdate(selector.emailSuccess, user);
  useEmail(update, user.email, setUpdate);

  return (
    <>
      <Box
        className={boxes.rowRaw}
        sx={{
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "start",
          mt: 7,
        }}
      >
        <Card
          className={boxes.card}
          sx={{ width: "70%", height: "70vh" }}
          raised
        >
          <SnackbarAlert />
          <PersonalForm
            header="PROFILE INFORMATION"
            data={PersonalData(selector.customer)}
            setInfo={setUser}
            info={user}
            handler={changeHandler}
          />
        </Card>
      </Box>
    </>
  );
}
