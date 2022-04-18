import PersonalForm from "../../elements/personalForm";
import { Box, Card } from "@mui/material";
import BoxesStyles from "../../styles/styleBoxes";
import { PassChange } from "../../data/dataObjects";
import { useState } from "react";
import PassForm from "../../elements/passForm";
import { useChangePassword } from "../../hooks/useChangePassword";
import SnackbarAlert from "../../elements/snackbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { errors, snackbar } from "../../store/loginSlice";
import { success } from "../../store/customerSlice";
import { usePass } from "../../firebase/auth";

export default function Security() {
  const boxes = BoxesStyles();
  const dispatch = useDispatch();
  const [pass, setPass] = useState({ password: "", confirm: "" });
  const [update, setUpdate] = useState(false);
  const [fetch, setFetch] = useState(false);

  const changeHandler = () => {
    setFetch(true);
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
  useChangePassword(fetch, pass, setFetch, setUpdate);
  usePass(update, pass.password, setUpdate);

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
          sx={{ width: "80%", height: "70vh" }}
          raised
        >
          <SnackbarAlert />
          <PassForm
            header="CHANGE PASSWORD"
            data={PassChange()}
            setInfo={setPass}
            info={pass}
            handler={changeHandler}
          />
        </Card>
      </Box>
    </>
  );
}
