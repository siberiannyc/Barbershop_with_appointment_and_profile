import React from "react";
import { useSelector } from "react-redux";

export default function Selectors() {
  let selectors = {
    appointmentDate: useSelector((state) => state.date.customDate),
    appointmentSlots: useSelector((state) => state.date.customTime),
    authorized: useSelector((state) => state.login.isAuth),
    availableBarbers: useSelector((state) => state.barber.allBarbers),
    barber: useSelector((state) => state.barber.barber),
    barberId: useSelector((state) => state.barber.barberId),
    barberRatingId: useSelector((state) => state.barber.barberRatingId),
    careerCard: useSelector((state) => state.firebase.careerCard),
    careers: useSelector((state) => state.firebase.careers),
    checkAuth: useSelector((state) => state.login.checkAuth),
    color: useSelector((state) => state.customer.avatarColor),
    customer: useSelector((state) => state.customer.customerData),
    customerId: useSelector((state) => state.login.userId),
    customerUpdated: useSelector((state) => state.customer.isUpdated),
    dashboardBarbers: useSelector((state) => state.customer.appBarbers),
    daysSinceLast: useSelector((state) => state.customer.daysSinceLast),
    deleteBarber: useSelector((state) => state.barber.deleteBarber),
    emailSuccess: useSelector((state) => state.customer.emailSuccess),
    errors: useSelector((state) => state.login.errors),
    fetchBarber: useSelector((state) => state.barber.barbFetched),
    fetchUser: useSelector((state) => state.login.userFetch),
    freeSlots: useSelector((state) => state.barber.freeSlots),
    initialUser: useSelector((state) => state.login.user),
    lastVisit: useSelector((state) => state.customer.lastVisit),
    loader: useSelector((state) => state.login.loader),
    login: useSelector((state) => state.login.isLogged),
    mainPageShop: useSelector((state) => state.shop.mainPage),
    multi: useSelector((state) => state.barber.multiFetched),
    nextVisit: useSelector((state) => state.customer.nextVisit),
    nonrandom: useSelector((state) => state.barber.isNotRandom),
    random: useSelector((state) => state.barber.isRandom),
    sCategory: useSelector((state) => state.services.servCat),
    schedule: useSelector((state) => state.barber.daySlots),
    serviceTime: useSelector((state) => state.services.serviceTime),
    services: useSelector((state) => state.services.services),
    set: useSelector((state) => state.login.isSet),
    shop: useSelector((state) => state.shop.shop),
    shopBarbers: useSelector((state) => state.barber.shopBarbers),
    signup: useSelector((state) => state.login.isSigned),
    slots: useSelector((state) => state.barber.filterSlots),
    snackbar: useSelector((state) => state.login.snackbar),
    startTime: useSelector((state) => state.date.timePicker),
    submitted: useSelector((state) => state.firebase.isSubmitted),
    success: useSelector((state) => state.customer.success),
    sysMessage: useSelector((state) => state.firebase.systemMessage),
    timeConfirmed: useSelector((state) => state.barber.timeConfirm),
    totalTime: useSelector((state) => state.services.totalTime),
    update: useSelector((state) => state.barber.barbUpdate),
    USSlots: useSelector((state) => state.barber.freeSlotsUS),
  };

  return selectors;
}
