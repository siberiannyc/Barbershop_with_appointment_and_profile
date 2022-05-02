import React, { useEffect } from "react";
import { useState } from "react";

// Redux Imports
import BarbersList from "../data/barbersList";

// MUI Imports
import BoxesStyles from "../styles/styleBoxes";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/system";
import ApntCardSection from "../elements/appointment card/apntCardSection";
import Zoom from "@mui/material/Zoom";
import {
  Card,
  Typography,
  Chip,
  Tooltip,
  Avatar,
  IconButton,
} from "@mui/material";
import DeleteCardButton from "../elements/buttons/deleteCardButton";
import AppointmentCardStructure from "../data/dataObjects";
import AppointmentServices from "../elements/appointment card/appointmentServices";
import { AppointmentServicesExt } from "../elements/appointment card/appointmentServices";
import BasicRating from "../elements/appointment card/rating";
import Selectors from "../store/selectors";
import { useBarbUpload } from "../firebase/barberConfigs";
import { useDispatch } from "react-redux";
import { barberId, barberRatingId } from "../store/barberSlice";
import { useUpdate } from "../firebase/auth";
import { useBarbUpdate } from "../firebase/barberConfigs";

export default function AppointmentCard({ data, deleteHandler, status }) {
  let boxes = BoxesStyles();
  let selector = Selectors();
  let dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [callBarber, setCallBarber] = useState(false);
  const [ratingPoint, setRatingPoint] = useState(null);
  const [ratingUpd, setRatingUpd] = useState(null);
  const [ratingUpdUser, setRatingUpdUser] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [update, setUpdate] = useState(false);

  // Picture for a barber chip
  const avatarPicture = (id) => {
    for (let barber of BarbersList) {
      if (barber.dbId === id) return barber.pic;
    }
  };

  const openHandler = () => {
    setOpen(!open);
  };

  // Update Rating of a Visited card
  const ratingHandler = (e) => {
    dispatch(barberRatingId(data.barberId));
    setServiceId(data.id);
    setRatingPoint(e.target.value);
  };

  useEffect(() => {
    if (ratingPoint !== null) {
      setCallBarber(true);
    }
  }, [selector.barberRatingId]);

  useEffect(() => {
    if (callBarber) {
      setCallBarber(false);
      setRatingUpd({
        reservations: {
          ...selector.barber.reservations,
          [data.date]: {
            ...selector.barber.reservations[data.date],
            [serviceId]: {
              ...selector.barber.reservations[data.date][serviceId],
              rating: ratingPoint,
            },
          },
        },
      });
      setRatingUpdUser({
        appointments: {
          ...selector.customer.appointments,
          visited: {
            ...selector.customer.appointments.visited,
            [serviceId]: {
              ...selector.customer.appointments.visited[serviceId],
              rating: ratingPoint,
            },
          },
        },
      });

      setUpdate(true);
    }
    if (update) {
      setUpdate(false);
      dispatch(barberRatingId(""));
      setRatingPoint(null);
    }
  }, [selector.barber]);


  useBarbUpload(callBarber, selector.barberRatingId);
  useUpdate(update, ratingUpdUser);
  useBarbUpdate(update, ratingUpd, selector.barberRatingId);

  return (
    <Card raised className={boxes.card} key={data.id} sx={{ mb: 1, m: 2 }}>
      <Box
        className={boxes.rowRaw}
        sx={{
          justifyContent: "space-between",
          width: "95%",
          alignItems: "center",
          height: "10vh",
        }}
      >
        {/* Services */}
        <AppointmentServices
          data={data}
          openHandler={openHandler}
          open={open}
        />

        {/* Shop and barber chips */}
        {!deleteTrigger && (
          <Box
            className={boxes.rowRaw}
            sx={{ width: "60%", justifyContent: "space-evenly", mr: 1 }}
          >
            <Tooltip
              title={`Address: ${data.shop.address}, Phone: ${data.shop.phone}`}
              TransitionComponent={Zoom}
              placement="bottom"
            >
              <Chip
                label={`${data.shop.name}, ${data.shop.city}`}
                color="info"
              ></Chip>
            </Tooltip>
            <Chip
              label={data.barberName}
              color="secondary"
              avatar={
                <Avatar
                  alt={data.barberName}
                  src={avatarPicture(data.barberId)}
                />
              }
            ></Chip>
            {data.status === "Visited" && (
              <BasicRating ratingHandler={ratingHandler} data={data} />
            )}
          </Box>
        )}

        {/* Delete button */}
        {status === "Confirmed" && (
          <DeleteCardButton
            data={data}
            deleteTrigger={deleteTrigger}
            setDeleteTrigger={setDeleteTrigger}
            deleteHandler={deleteHandler}
            label="CANCEL APPOINTMENT?"
          />
        )}
      </Box>
      {/* Section for several services */}

      {open && <AppointmentServicesExt data={data} />}
      {/* Bottom part */}
      <CardContent
        className={boxes.row}
        sx={{ justifyContent: "space-between" }}
      >
        {Object.entries(AppointmentCardStructure(data))
          .filter(
            ([key, value]) =>
              key !== "id" && key !== "services" && key !== "shop"
          )
          .map(([key, value]) => {
            return (
              <ApntCardSection
                data={value.data}
                title={value.name}
                icon={value.icon}
                key={value.name}
                h="100px"
                raised={false}
              />
            );
          })}
      </CardContent>
    </Card>
  );
}
