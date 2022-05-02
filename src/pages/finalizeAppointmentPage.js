import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Redux Imports
import { useDispatch } from "react-redux";
import { isSubmitted } from "../store/firebaseSlice";
import { isUpdated } from "../store/customerSlice";
import { customDateChoice, customTimeArr } from "../store/dateSlice";
import { finishTime, resetServices } from "../store/servSlice";
import {
  barbUpdate,
  isNotRandom,
  isRandom,
  timeConfirm,
} from "../store/barberSlice";
// DB hooks
import { useBarbUpdate } from "../firebase/barberConfigs";
import { useUpdate } from "../firebase/auth";
// MUI Imports
import { Typography, Card, Container, CardContent, Box } from "@mui/material";

import BoxesStyles from "../styles/styleBoxes";
// Components import
import Loader from "../elements/misc/loader";
import UserServiceCard from "../elements/profile/userServiceCard";
import ServiceSummary from "../components/serviceSummary";
import FinishPlate from "../elements/finalize appointment/finishPlate";
import Selectors from "../store/selectors";
import { loader } from "../store/loginSlice";

const FinalAppointment = () => {
  const [customer, setCustomer] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [addShift, setAddShift] = useState({});
  const [appointment, setAppointment] = useState({});
  const [customerDisplay, setCustomerDisplay] = useState("");
  const [deletedCards, setDeletedCards] = useState({});
  const [emptyDeletes, setEmptyDeletes] = useState(true);
  const [deleteId, setDeleteId] = useState("");
  const [update, setUpdate] = useState(false);
  const [barbUpdate, setBarbUpdate] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boxes = BoxesStyles();
  const selector = Selectors();

  // Defining total time, prices and services object
  const sumArr = [];
  let totalTime = 0;
  let servObj = {};
  for (let obj of selector.services) {
    totalTime = totalTime + obj.time;
    sumArr.push(parseInt(obj.price.slice(1)));
    servObj[obj.name] = { price: obj.price, time: obj.time, id: obj.id };
  }
  useEffect(() => {
    dispatch(isSubmitted(false));
    if (selector.customer.uid) {
      setCustomerId(selector.customer.uid);
    } else {
      setCustomerId("");
    }
    // Get customer info if authorized
    if (selector.authorized) {
      let firstName = selector.customer.firstName;
      let lastName = selector.customer.lastName;
      let name = firstName + " " + lastName;
      setCustomer(name);
      setCustomerDisplay(firstName);
      setButtonDisabled(false);
      dispatch(isRandom(false));
      dispatch(isNotRandom(false));
    }
  }, []);

  // Delete handler
  const deleteHandler = (data) => {
    // const { myValue } = e.currentTarget.dataset;
    setDeletedCards({ ...deletedCards, [data]: data });
    setDeleteId(data);
  };

  // Deleted cards trigger
  useEffect(() => {
    if (!Object.keys(deletedCards).length) {
      setEmptyDeletes(true);
    } else {
      setEmptyDeletes(false);
    }
  }, [deletedCards]);

  // Filtering deleted cards + changing summary card data
  let deletePrice = 0;
  let deleteTime = 0;
  let displayDeleteTime = 0;
  let filteredServices = {};

  if (!emptyDeletes) {
    Object.entries(servObj)
      .filter(([key, value]) => key === deletedCards[key])
      .forEach(([key, value]) => {
        displayDeleteTime += parseInt(value.time);
        deletePrice += parseInt(value.price.substring(1));
      });
    Object.entries(servObj)
      .filter(([key, value]) => key === deleteId)
      .forEach(([key, value]) => {
        deleteTime = parseInt(value.time);
      });
    Object.entries(servObj)
      .filter(([key, value]) => key !== deletedCards[key])
      .forEach(([key, value]) => {
        filteredServices[key] = value;
      });
  }

  if (Object.keys(filteredServices).length) servObj = filteredServices;

  // Adjusting appointment time slots
  let slots = [];
  let slotQty = deleteTime / 15;
  let count = 0;

  useEffect(() => {
    if (deleteTime !== 0) {
      for (let slot of selector.appointmentSlots) {
        slots.push(slot);
      }
      while (count !== slotQty) {
        slots.pop();
        count++;
      }
      dispatch(customTimeArr(slots));
    }
  }, [displayDeleteTime]);

  // Total sum and time after delete
  let sum = sumArr.reduce((a, b) => a + b, 0) - deletePrice;

  // Count discount if applicable
  let discount = Math.round(sum * 0.9);

  // Apply total $

  const totalMoney = () => {
    if (
      selector.authorized &&
      !Object.keys(selector.customer.appointments.visited).length &&
      !Object.keys(selector.customer.appointments.confirmed).length
    ) {
      return discount;
    } else {
      return sum;
    }
  };

  console.log(totalMoney());

  let time = totalTime - displayDeleteTime;

  let summaryData = {
    total: totalMoney(),
    discount: discount,
    sum: sum,
    where: `${selector.shop.activeShop.name}, ${selector.shop.activeShop.city}`,
    date: selector.appointmentDate,
    time: selector.startTime,
    duration: time,
    barber: selector.barber.name,
  };

  // Customer name if not auth
  const customerHandler = (e) => {
    setCustomer(e.target.value);
    setCustomerDisplay(e.target.value);
    setButtonDisabled(!e.target.value);
  };

  // Submit
  const submitHandler = () => {
    let stamp = new Date().getTime();
    setAddShift({
      reservations: {
        ...selector.barber.reservations,
        [selector.appointmentDate]: {
          ...selector.barber.reservations[selector.appointmentDate],
          [stamp]: {
            customer: customer,
            customerId: customerId,
            services: servObj,
            total: totalMoney(),
            time: selector.appointmentSlots,
            status: "Confirmed",
            rating: 0,
          },
        },
      },
      freeSlots: {
        ...selector.barber.freeSlots,
        [selector.appointmentDate]: selector.barber.freeSlots[
          selector.appointmentDate
        ].filter((slots) => !selector.appointmentSlots.includes(slots)),
      },
    });
    if (selector.authorized) {
      setAppointment({
        barber: selector.barberId,
        barbers: {
          ...selector.customer.barbers,
          [selector.shop.activeShop.id]: selector.barberId,
        },
        activeShop: selector.shop.activeShop,
        appointments: {
          ...selector.customer.appointments,
          confirmed: {
            ...selector.customer.appointments.confirmed,
            [stamp]: {
              id: stamp,
              barberId: selector.barberId,
              barberName: selector.barber.name,
              services: servObj,
              total: totalMoney(),
              time: selector.appointmentSlots,
              shop: selector.shop.activeShop,
              date: selector.appointmentDate,
              usTime: selector.startTime,
              status: "Confirmed",
              rating: 0,
            },
          },
        },
      });
    }

    setBarbUpdate(true);
    dispatch(isSubmitted(true));
    dispatch(resetServices());
    dispatch(finishTime(""));
    dispatch(timeConfirm(false));
    dispatch(customDateChoice(""));
    dispatch(loader(true));

    if (selector.authorized) setUpdate(true);
  };
  useUpdate(update, appointment);
  useBarbUpdate(barbUpdate, addShift, selector.barberId);

  // Redirect if all cards deleted
  useEffect(() => {
    if (!selector.appointmentSlots.length) {
      dispatch(resetServices());
      dispatch(finishTime(""));
      dispatch(timeConfirm(false));
      navigate("/book-shop");
    }
  }, [selector.appointmentSlots]);
  useEffect(() => {
    setUpdate(false);
  }, []);

  return (
    <>
      {selector.loader ? (
        <Loader text="Wrapping everything up..." />
      ) : (
        <Container
          className={boxes.finalPageContainer}
          sx={{
            height: { xs: "100vh", md: "88vh" },
            mt: { xs: "55vh", md: "12vh" },
          }}
        >
          {!selector.submitted && (
            <Box
              id="summaryContent"
              sx={{
                width: "100%",
                height: "100%",
              }}
              className={boxes.card}
            >
              <Box className={boxes.card}>
                <Typography variant="h5">FINALIZE YOUR APPOINTMENT </Typography>
                <Typography variant="h5" sx={{ color: "gray" }}>
                  Confirm your appointment details below
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Card
                  sx={{
                    width: { xs: "100%", md: "65%" },
                    height: { xs: "65%", md: "100%" },
                  }}
                >
                  <CardContent
                    className={boxes.columnAdjust}
                    sx={{
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      YOUR APPOINTMENT DETAILS
                    </Typography>
                    <Box
                      sx={{
                        width: "50vw",
                        maxHeight: "50vh",
                        overflow: "scroll",
                        pt: 1,
                      }}
                    >
                      {Object.entries(servObj)
                        .filter(([key, value]) => key !== deletedCards[key])
                        .map(([key, value]) => {
                          return (
                            <UserServiceCard
                              deleteHandler={deleteHandler}
                              deletedCards={deletedCards}
                              service={value}
                              serviceName={key}
                              key={key}
                            />
                          );
                        })}
                    </Box>
                  </CardContent>
                </Card>
                <ServiceSummary
                  summary={summaryData}
                  customerHandler={customerHandler}
                  submitHandler={submitHandler}
                  buttonDisabled={buttonDisabled}
                />
              </Box>
            </Box>
          )}
          {selector.update && (
            <Loader text="Razors up! Your appointment is almost set." />
          )}
          {selector.submitted && <FinishPlate data={customerDisplay} />}
        </Container>
      )}
    </>
  );
};

export default FinalAppointment;
