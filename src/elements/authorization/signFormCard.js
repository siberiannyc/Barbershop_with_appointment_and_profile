import { motion } from "framer-motion/dist/framer-motion";
import { Typography, FormControl, TextField, Button } from "@mui/material";
import SignUpStyles from "../../styles/styleSignUp";
import fieldData from "../../data/miscList";
 import Selectors from "../../store/selectors";

const FormCard = ({
  header,
  setUser,
  user,
  background,
  handler,
  action,
  height,
}) => {
  let classes = SignUpStyles();
  const selector = Selectors();
  
  return (
    <motion.div
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ x: "100vw", opacity: 0 }}
      exitBeforeEnter
      className={classes.motions}
    >
      <Typography variant="secondary" className={classes.header}>
        {header}
      </Typography>
      <FormControl
        className={classes.cardHalf}
        sx={{
          height: { height },
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        {fieldData.map((data) => {
          if (header === "Log In") {
            if (data.keyName === "email" || data.keyName === "password")
              return (
                <TextField
                  required
                  error={selector.errors[data.keyName]}
                  className={classes.field}
                  label={data.name}
                  key={data.keyName}
                  id={data.keyName}
                  type={data.keyName}
                  onChange={(e) => {
                    let id = e.target.id;
                    setUser({ ...user, [id]: e.target.value });
                  }}
                />
              );
          } else {
            return (
              <TextField
                required
                error={selector.errors[data.keyName]}
                className={classes.field}
                label={data.name}
                key={data.keyName}
                id={data.keyName}
                type={data.keyName}
                onChange={(e) => {
                  let id = e.target.id;
                  setUser({ ...user, [id]: e.target.value });
                }}
              />
            );
          }
        })}
      </FormControl>
      <Button
        sx={{
          background: background,
          borderRadius: 20,
        }}
        className={classes.signBtn}
        variant="contained"
        onClick={handler}
      >
        {action}
      </Button>
      {header === "Log In" && (
        <Typography sx={{ mt: 2 }} variant="subtitle1">
          Forgot Password?
        </Typography>
      )}
    </motion.div>
  );
};

export default FormCard;
