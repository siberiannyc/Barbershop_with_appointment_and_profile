import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { isUpdated } from "../../store/customerSlice";

import AppointmentCard from "../../elements/appointmentCard";
import { useBarbUpdate, useBarbUpload } from "../../firebase/barberConfigs";
import { Box } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import BoxesStyles from "../../styles/styleBoxes";
import { TabPanel, Tab, TabsList } from "../../styles/styleTabs";

import Selectors from "../../store/selectors";
import {
  barberId,
  deleteBarber,
  resetBarberChoice,
} from "../../store/barberSlice";

import { useUpdate } from "../../firebase/auth";
import Loader from "../../elements/loader";
import useVisited from "../../hooks/useVisited";
import { loader } from "../../store/loginSlice";
import useTimeSorted from "../../hooks/useTimeSorted";
import noAppointments from "../../media/svg/noAppointments.svg";
import NoInfoBox from "../../elements/noInfoBox";
import BookButton from "../../elements/bookButton";

export default function Appointments() {
  const boxes = BoxesStyles();
  const selector = Selectors();
  const dispatch = useDispatch();

  const [customerData, setCustomerData] = useState({});
  const [appointments, setAppointments] = useState({
    confirmed: "",
    cancelled: "",
    visited: "",
  });
  const [deleteData, setDeleteData] = useState(null);
  const [serviceId, setServiceId] = useState("");
  const [barberInfo, setBarberInfo] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [update, setUpdate] = useState(false);
  const [updVisited, setUpdVisited] = useState(false);

  // Getting latest customer data at the first loading
  useEffect(() => {
    dispatch(deleteBarber(false));
    // setCustomerData(selector.customer);
    dispatch(barberId(""));
    dispatch(resetBarberChoice());
    setUpdVisited(true);
    dispatch(loader(true));
    window.scrollTo(0, 0);

  }, []);

  // Get delete barber information
  useEffect(() => {
    if (selector.barberId !== "") {
      dispatch(deleteBarber(true));
    }
  }, [selector.barberId]);

  // Refactoring customer's and barber's data
  useEffect(() => {
    if (deleteData !== null) {
      let slots = deleteData.time;
      let confirmed = {};
      let confirmedBefore = selector.customer.appointments.confirmed;
      let cancelled = {
        ...selector.customer.appointments.cancelled,
      };
      // Filtering confirmed appointments
      Object.entries(confirmedBefore)
        .filter(([key, val]) => key !== serviceId.toString())
        .map(([key, value]) => {
          confirmed[key] = value;
        });
      // Filtering cancelled appointment
      Object.entries(confirmedBefore)
        .filter(([key, val]) => key == serviceId.toString())
        .map(([key, value]) => {
          cancelled[key] = { ...value, status: "Cancelled" };
        });
      // Setting barber update
      setBarberInfo({
        reservations: {
          ...selector.barber.reservations,
          [deleteData.date]: {
            ...selector.barber.reservations[deleteData.date],
            [serviceId]: {
              ...selector.barber.reservations[deleteData.date][serviceId],
              status: "Cancelled",
            },
          },
        },
        freeSlots: {
          ...selector.barber.freeSlots,
          [deleteData.date]: slots
            .concat(...selector.barber.freeSlots[deleteData.date])
            .sort(),
        },
      });
      // Setting customer update
      setCustomerInfo({
        appointments: {
          ...selector.customer.appointments,
          confirmed,
          cancelled,
        },
      });
      // Updating
      setDeleteData(null);
      setServiceId(null);
      setUpdate(true);
      dispatch(loader(true));
    } else {
      dispatch(barberId(""));
    }
  }, [selector.barber]);

  // Reset states after update
  useEffect(() => {
    if (customerInfo !== null) {
      setCustomerData(selector.customer);
      setCustomerInfo(null);
      setUpdate(false);
    }
    if (updVisited) {
      setCustomerData(selector.customer);
      setUpdVisited(false);
    }
  }, [selector.customer]);

  // Deleting card after updating
  useEffect(() => {
    setAppointments(selector.customer.appointments);
  }, [customerData]);

  const deleteHandler = (data) => {
    setDeleteData(data);
    setServiceId(data.id);
    dispatch(barberId(data.barberId));
  };

  useBarbUpload(selector.deleteBarber, selector.barberId);
  useUpdate(update, customerInfo);
  useBarbUpdate(update, barberInfo, selector.barberId);
  useVisited(updVisited);

  const text = () => {
    return (
      <Box
        className={boxes.columnAdjust}
        sx={{
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "20vh",
        }}
      >
        No upcoming appointments.
        <BookButton color="error"></BookButton>
      </Box>
    );
  };

  return (
    <TabsUnstyled defaultValue={0}>
      <TabsList>
        <Tab>UPCOMING APPOINTMENTS</Tab>
        <Tab>PREVIOUS BOOKINGS</Tab>
      </TabsList>
      <TabPanel value={0}>
        {selector.loader ? (
          <Loader text="Checking appointments..." />
        ) : (
          <Box
            className={boxes.row}
            sx={{ width: "100%", justifyContent: "center" }}
          >
            <Box
              className={boxes.noScroll}
              sx={{
                height: "80vh",
                width: "90%",
                overflow: "auto",
                justifyContent: "center",
              }}
            >
              {!Object.keys(appointments.confirmed).length ? (
                <NoInfoBox image={noAppointments} text={text()} />
              ) : (
                Object.entries(appointments.confirmed).map(([key, val]) => {
                  return (
                    <AppointmentCard
                      data={val}
                      key={val.id}
                      deleteHandler={deleteHandler}
                      status="Confirmed"
                    />
                  );
                })
              )}
            </Box>
          </Box>
        )}
      </TabPanel>
      <TabPanel value={1}>
        <Box
          className={boxes.row}
          sx={{ width: "100%", justifyContent: "center" }}
        >
          <Box
            className={boxes.noScroll}
            sx={{
              height: "80vh",
              width: "90%",
              overflow: "auto",
              justifyContent: "center",
            }}
          >
            {!Object.keys(appointments.visited).length &&
            !Object.keys(appointments.cancelled).length ? (
              <NoInfoBox
                image={noAppointments}
                text="All your previous bookings will be displayed here."
              />
            ) : (
              <>
                {Object.entries(appointments.visited).map(([key, val]) => {
                  return (
                    <AppointmentCard
                      data={val}
                      key={val.id}
                      deleteHandler={deleteHandler}
                      status="Other"
                    />
                  );
                })}
                {Object.entries(appointments.cancelled).map(([key, val]) => {
                  return (
                    <AppointmentCard
                      data={val}
                      key={val.id}
                      deleteHandler={deleteHandler}
                      status="Other"
                    />
                  );
                })}
              </>
            )}
          </Box>
        </Box>
      </TabPanel>
    </TabsUnstyled>
  );
}
