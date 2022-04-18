import { useEffect, useState } from "react";
// MUI Imports

// Redux
import { useDispatch } from "react-redux";
import { services, serviceTime } from "../store/servSlice";
import Selectors from "../store/selectors";

import ServicesList from "../data/servicesList";
import ServiceCard from "../elements/serviceCard";
import ServiceDispCard from "../elements/serviceCard";
import { Box, Container } from "@mui/material";
import BoxesStyles from "../styles/styleBoxes";

const Services = () => {
  const [serviceIdArr, setServiceIdArr] = useState([]);
  const [serviceId, setServiceId] = useState("");

  const dispatch = useDispatch();
  const selector = Selectors();
  const boxes = BoxesStyles();

  // Handling service cards in UI during booking (styles, clicking, etc...)
  const cardHandler = (service) => {
    if (selector.sCategory === "HAIRCUT") setServiceId(service.id);
    if (selector.sCategory === "HAIRCUT" && serviceId === service.id)
      setServiceId("");
    if (selector.sCategory !== "HAIRCUT") {
      if (!serviceIdArr.includes(service.id)) {
        setServiceIdArr([...serviceIdArr, service.id]);
      } else {
        let temp = [];
        for (let ids of serviceIdArr) {
          if (ids !== service.id) temp.push(ids);
        }
        setServiceIdArr([...temp]);
      }
    }

    dispatchHandler(service);
  };

  // Dispatching confirmed services
  const dispatchHandler = (service) => {
    let temp = [];
    let tempTime = [];
    if (!selector.services.length) {
      temp.push(service);
      tempTime.push(service.time);
    }
    if (service.group === "HAIRCUT" && selector.services.length) {
      for (let serves of selector.services) {
        if (serves.group !== "HAIRCUT") {
          temp.push(serves);
          tempTime.push(serves.time);
        }
      }
      if (!selector.services.includes(service)) {
        temp.push(service);
        tempTime.push(service.time);
      }
    }

    if (service.group !== "HAIRCUT" && selector.services.length) {
      for (let serv of selector.services) {
        if (serv.id !== service.id) {
          temp.push(serv);
          tempTime.push(serv.time);
        }
      }
      if (!selector.services.includes(service)) {
        temp.push(service);
        tempTime.push(service.time);
      }
    }
    dispatch(services(temp));
    dispatch(serviceTime(tempTime));
  };

  // Prevent UI reset if user clicks back to services page
  useEffect(() => {
    let temp = [];
    for (let serv of selector.services) {
      if (serv.group === "HAIRCUT") {
        setServiceId(serv.id);
      } else if (serv.group !== "HAIRCUT") {
        temp.push(serv.id);
      }
    }
    setServiceIdArr(temp);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log(serviceId);
  }, [serviceId]);

  return (
    <Container
      className={boxes.row}
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      <Box
        className={boxes.rowRaw}
        sx={{
          flexWrap: "wrap",
          width: "90%",
          height: "60vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {ServicesList.filter((service) => {
          return service.group === selector.sCategory;
        }).map((service) => {
          return (
            <ServiceCard
              key={service.name}
              data={service}
              serviceIdArr={serviceIdArr}
              serviceId={serviceId}
              cardHandler={cardHandler}
            />
          );
        })}
      </Box>
    </Container>
  );
};

export default Services;
