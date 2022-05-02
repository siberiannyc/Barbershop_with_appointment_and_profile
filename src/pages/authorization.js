// React imports
import { useEffect, useState } from "react";
import * as React from "react";

// MUI imports
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { DialogActions } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { Card } from "@mui/material";
import SignUpStyles from "../styles/styleSignUp";

// Firebase imports
import { useNewUser, useLogin } from "../firebase/auth";
import { useSignUp } from "../hooks/useSignUp";

// Data Imports
import SwitchCard from "../elements/authorization/signSwitchCard";
import FormCard from "../elements/authorization/signFormCard";

// Redux Imports
import {
  snackbar,
  loader,
  resetErrors,
  isSigned,
  isLogged,
} from "../store/loginSlice";

// Misc imports
import { AnimatePresence } from "framer-motion/dist/framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../elements/misc/loader";
import Selectors from "../store/selectors";
import { barberId } from "../store/barberSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SignInSignUp = () => {
  const classes = SignUpStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = Selectors();

  // States
  const [user, setUser] = useState(selector.initialUser);
  const [open, setOpen] = useState(true);
  const [switcher, setSwitcher] = useState(false);
  const [background, setBackground] = useState(
    "linear-gradient(to right bottom, #FF7043, #E53935)"
  );

  // Misc Data
  const email = user.email;
  const password = user.password;
  const firstName = user.firstName;
  const lastName = user.lastName;
  const phone = user.phone;

  let userData = {
    email: email.toUpperCase(),
    firstName: firstName.toUpperCase(),
    lastName: lastName.toUpperCase(),
    phone: phone,
    uid: selector.customerId,
    activeShop: { name: "", address: "", city: "", phone: "", id: "" },
    appointments: {
      confirmed: {},
      cancelled: {},
      skipped: {},
      visited: {},
    },
    barbers: {},
  };

  // Handlers
  const dataReset = () => {
    dispatch(resetErrors());
    setUser(selector.initialUser);
    dispatch(snackbar(false));
  };

  // Close authorization & return to home screen
  const handleClose = () => {
    navigate("/");
    setOpen(false);
    dataReset();
  };

  // SignUp
  const signUpHandler = () => {
    // dispatch(loader(true));
    dispatch(isSigned(true));
  };

  // LogIn
  const logInHandler = () => {
    dispatch(loader(true));
    dispatch(isLogged(true));
  };

  // Switch between Login and signup cards
  const switchHandler = () => {
    setSwitcher(!switcher);
    dataReset();
  };

  // Switch backgrounds
  useEffect(() => {
    if (switcher) {
      setBackground("linear-gradient(to right bottom, #22c1c3, #0bd08d);");
    } else {
      setBackground("linear-gradient(to right bottom, #FF7043, #E53935)");
    }
  }, [switcher]);

  useEffect(() => {
    dispatch(barberId(""));
  }, []);

  // SignUp
  useSignUp(selector.signup, user, email, phone, password);
  // Add NewUser information
  useNewUser(selector.fetchUser, email, password, userData);
  // Login
  useLogin(selector.login, email, password);

  return (
    <div>
      <Dialog
        fullScreen
        open
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogActions className={classes.dialog}>
          <Snackbar
            open={selector.snackbar}
            autoHideDuration={10000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            message={selector.sysMessage}
          />
          {selector.loader && (
            <Loader text=" Hold tight. The magic is happening." />
          )}
          {!selector.loader && (
            <Card className={classes.mainCard} raised>
              <Card
                sx={{
                  minWidth: "45%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "stretch",
                }}
              >
                <AnimatePresence>
                  {!switcher && (
                    <FormCard
                      header="Log In"
                      setUser={setUser}
                      user={user}
                      handler={logInHandler}
                      action="Log In"
                      background={background}
                      height="35%"
                    />
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {switcher && (
                    <FormCard
                      header="Create Account"
                      setUser={setUser}
                      user={user}
                      handler={signUpHandler}
                      action="Sign Up"
                      background={background}
                      height="70%"
                    />
                  )}
                </AnimatePresence>
              </Card>

              <Card
                className={classes.cardHalf}
                sx={{
                  minWidth: "55%",
                  background: background,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                {!switcher && (
                  <SwitchCard
                    style={classes.signBox}
                    handleClose={handleClose}
                    switchHandler={switchHandler}
                    header="Hey!"
                    text="New here? Create an account
                    to get the best LEDO experience"
                    textStyle={classes.text}
                    switcher="Sign Up"
                  />
                )}
                {switcher && (
                  <SwitchCard
                    style={classes.signBox}
                    handleClose={handleClose}
                    switchHandler={switchHandler}
                    header="Welcome!"
                    text="Already have an account?"
                    textStyle={classes.text}
                    switcher="Log In"
                  />
                )}
              </Card>
            </Card>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignInSignUp;
