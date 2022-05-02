import {
  Card,
  Typography,
  CardHeader,
  Chip,
  Avatar,
  Box,
  Tooltip,
  Zoom,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BoxesStyles from "../../styles/styleBoxes";
import BarbersList from "../../data/barbersList";
import ApntCardSection from "../appointment card/apntCardSection";
import AppointmentCardStructure from "../../data/dataObjects";
import { Link } from "react-router-dom";
import Selectors from "../../store/selectors";
import BasicRating from "../appointment card/rating";
import BookButton from "../buttons/bookButton";

export default function StatsCard({ title, data }) {
  const boxes = BoxesStyles();
  const selector = BoxesStyles();

  const avatarPicture = (id) => {
    for (let barber of BarbersList) {
      if (barber.dbId === id) return barber.pic;
    }
  };
  return (
    <Link to="/profile/appointments" className="link">
      <Tooltip
        title={`             
                  Click on this card to see all appointments
`}
        TransitionComponent={Zoom}
        placement="bottom"
      >
        <Card
          className={boxes.statCard}
          sx={{ width: "300px", height: "300px", mb: 2, p: 2 }}
          raised
        >
          <CardHeader title={title} />

          {data !== null ? (
            <>
              <Chip
                label={`${data.shop.name}, ${data.shop.city}`}
                sx={{ width: "80%", fontSize: "1rem" }}
                color="error"
              ></Chip>
              <Chip
                label={`${data.barberName}`}
                color="info"
                avatar={
                  <Avatar
                    alt={data.barberName}
                    src={avatarPicture(data.barberId)}
                  />
                }
                sx={{ width: "60%", fontSize: "1rem" }}
              ></Chip>

              <Box className={boxes.row}>
                {Object.entries(AppointmentCardStructure(data))
                  .filter(
                    ([key, value]) =>
                      key !== "id" && key !== "price" && key !== "status"
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
              </Box>
            </>
          ) : title === "NEXT VISIT" ? (
            <Box
              className={boxes.columnAdjust}
              sx={{
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="overline" sx={{ fontSize: "1rem" }}>
                No scheduled appointments
              </Typography>
              <BookButton color="error" />
            </Box>
          ) : (
            <Box
              className={boxes.columnAdjust}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography
                variant="overline"
                sx={{ fontSize: "1rem", textAlign: "center" }}
              >
                You will find the statistics here after your first visit.
              </Typography>
            </Box>
          )}
        </Card>
      </Tooltip>
    </Link>
  );
}
