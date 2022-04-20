import { Typography } from "@mui/material";

export const signUp = () => {
  return (
    <Typography
      variant="h1"
      sx={{
        fontWeight: "700",
        display: { xs: "none", sm: "block" },
        color: "accent.main",
      }}
    >
      SIGN UP <br />
      TODAY
    </Typography>
  );
};
export const signUpTwo = () => {
  return (
    <>
      <Typography variant="h3" color="info.main" sx={{ textAlign: "left" }}>
        Sign up today and get 10% <br /> for all services on your first visit.
        <br />
      </Typography>
      <Typography variant="h6" color="info.main" sx={{ textAlign: "left" }}>
        Even if you've visited us, but never registered with our web services,
        you will get 10% discount.
      </Typography>
    </>
  );
};

export const greeting = () => {
  return (
    <Typography variant="h5" color="info.main">
      LEDO barber is the grooming experience every man deserves - where
      traditional barbering and modern spa services meet your favorite watering
      hole. Sit back, relax, get groomed - then enjoy a cocktail, coffee, or
      cold one in our private lounge.
    </Typography>
  );
};
export const careers = () => {
  return (
    <Typography
      variant="h3"
      sx={{
        color: "primary.main",
        lineHeight: "1.5",
        fontSize: "1.3rem",
      }}
    >
      We’ve built a business and a culture that prioritizes people, because
      solid relationships with our customers and employees will always be what
      matters most.
      <br />
      Our compensation plan is designed to provide a solid foundation while also
      rewarding your best efforts. On top of a competitive base pay, we offer an
      escalating commission structure – both of which increase as you grow.
    </Typography>
  );
};
