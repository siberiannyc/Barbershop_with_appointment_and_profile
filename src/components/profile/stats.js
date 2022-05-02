import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import BarberCard from "../barberCard";
import BoxesStyles from "../../styles/styleBoxes";
import AppointmentCard from "../appointmentCard";
import StatsCard from "../../elements/profile/statsCard";
import Selectors from "../../store/selectors";
import useVisited from "../../hooks/useVisited";
import { useDispatch } from "react-redux";
import { loader } from "../../store/loginSlice";
import Loader from "../../elements/misc/loader";
import useTimeSorted from "../../hooks/useTimeSorted";
import ApntCardSection from "../../elements/appointment card/apntCardSection";
import { StatsData } from "../../data/dataObjects";
import AppointmentServices from "../../elements/appointment card/appointmentServices";
import BasicRating from "../../elements/appointment card/rating";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import BookButton from "../../elements/buttons/bookButton";

export default function Stats() {
  const boxes = BoxesStyles();
  const selector = Selectors();
  const dispatch = useDispatch();
  const [updUser, setUpdUser] = useState(false);
  const [lastVisit, setLastVisit] = useState(null);
  const [nextVisit, setNextVisit] = useState(null);
  const [stats, setStats] = useState(null);
  useEffect(() => {
    setUpdUser(true);
    dispatch(loader(true));
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (updUser) setUpdUser(false);
    let totalVisits = Object.keys(
      selector.customer.appointments.visited
    ).length;

    if (selector.lastVisit === null) {
      setStats({
        ...stats,
        visits: totalVisits,
        daysSinceLast: selector.daysSinceLast,
        services: { "No services yet": null },
      });
    } else {
      setStats({
        ...stats,
        visits: totalVisits,
        daysSinceLast: selector.daysSinceLast,
        services: selector.lastVisit.services,
      });
    }
  }, [selector.customer]);

  useEffect(() => {}, [stats]);

  useEffect(() => {
    setLastVisit(selector.lastVisit);
    setNextVisit(selector.nextVisit);
  }, [selector.nextVisit]);

  useVisited(updUser);
  useTimeSorted();

  return (
    <>
      {selector.loader ? (
        <Loader text="Loading..." />
      ) : (
        <Box
          className={boxes.columnAdjust}
          sx={{
            justifyContent: "start",
            mt: 5,
          
          }}
        >
          <Box
            className={boxes.rowRaw}
            sx={{ width: "99%", justifyContent: "space-between", mb: 5 }}
          >
            {selector.lastVisit === null && (
              <Card
                sx={{
                  width: "100%",
                  height: "20vh",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
                raised
                className={boxes.rowRaw}
              >
                <Typography variant="overline" sx={{ fontSize: "1.5rem" }}>
                  You will find the statistics here after your first visit.
                </Typography>
                <BookButton color="error" />
              </Card>
            )}
            {stats !== null &&
              selector.lastVisit !== null &&
              Object.entries(StatsData(stats)).map(([key, value]) => {
                return (
                  <ApntCardSection
                    h="150px"
                    raised={false}
                    data={value.data}
                    title={value.name}
                    icon={value.icon}
                    key={value.name}
                  />
                );
              })}
          </Box>
          <Box
            className={boxes.rowRaw}
            sx={{ justifyContent: "space-between", width: "99%" }}
          >
            <BarberCard
              caseToHandle="customerDefaultBarber"
              w="300px"
              h="300px"
              aw="50%"
              ah="50%"
            />
            <Link to="/profile/appointments" className="link">
              <StatsCard title="NEXT VISIT" data={nextVisit} raised={true} />
            </Link>
            <StatsCard title="LAST VISIT" data={lastVisit} raised={true} />
          </Box>
        </Box>
      )}
    </>
  );
}
