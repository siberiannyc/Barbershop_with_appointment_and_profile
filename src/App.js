import Navbar from "./components/navbar";
import MainPage from "./components/mainPage";
import { ThemeProvider } from "@mui/material";
import Footer from "./components/footer";
import { Routes, Route } from "react-router-dom";
import BookShop from "./components/chooseShopPage";
import BookServices from "./components/servicesPage";
import Barbers from "./components/barbersPage";
import FinalAppointment from "./components/finalizeAppointmentPage";
import BarberSchedule from "./barber_app";
import Profile from "./components/profile";
import SignInSignUp from "./components/authorization";
import PrivateRoute from "./misc/PrivateRoute";
import Stats from "./components/profile/stats";
import Personal from "./components/profile/personal";
import Security from "./components/profile/security";
import Appointments from "./components/profile/appointments";
import Services from "./components/services";
import ServicesDisplay from "./components/servicesDisplay";
import PriceList from "./components/priceList";
import Careers from "./components/careers";
import { theme } from "./styles/mainTheme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="services/*" element={<ServicesDisplay />}>
            <Route path="services" element={<PriceList />} />
          </Route>

          <Route path="book-shop" element={<BookShop />} />
          <Route path="careers" element={<Careers />} />

          <Route path="book-services/*" element={<BookServices />}>
            <Route path="services" element={<Services />} />
          </Route>
          <Route path="book-barbers" element={<Barbers />} />
          <Route path="finish-booking" element={<FinalAppointment />} />
          <Route path="barber-schedule" element={<BarberSchedule />} />
          <Route path="authenticate" element={<SignInSignUp />} />
          <Route
            path="profile/*"
            element={
              <PrivateRoute>
                <Profile></Profile>
              </PrivateRoute>
            }
          >
            <Route path="stats" element={<Stats />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="personal" element={<Personal />} />
            <Route path="security" element={<Security />} />
          </Route>
        </Routes>

        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
