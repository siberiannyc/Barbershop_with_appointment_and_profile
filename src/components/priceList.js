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
import PriceCard from "../elements/priceCard";

const PriceList = () => {
  const [serviceIdArr, setServiceIdArr] = useState([]);
  const [serviceId, setServiceId] = useState("");

  const dispatch = useDispatch();
  const selector = Selectors();
  const boxes = BoxesStyles();

  useEffect(() => {
     window.scrollTo(0, 0);
  },[])

  return (
    <Container
      className={boxes.row}
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      <Box
        className={boxes.rowRaw}
        sx={{
          flexWrap: "wrap",
          width: "100%",
          height: "60vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {ServicesList.filter((service) => {
          return service.group === selector.sCategory;
        }).map((service) => {
          return (
            <PriceCard
              key={service.name}
              data={service}
              serviceIdArr={serviceIdArr}
              serviceId={serviceId}
            />
          );
        })}
      </Box>
    </Container>
  );
};

export default PriceList;
