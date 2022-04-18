import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";

import { useSelector, useDispatch } from "react-redux";
import {
  customerData,
  emailSuccess,
  isUpdated,
  resetCustomer,
  success,
} from "../store/customerSlice";
import { useNavigate } from "react-router-dom";
import { isLoggedOut, resetFirebase } from "../store/firebaseSlice";
import { resetShop } from "../store/shopSlice";
import { resetServices } from "../store/servSlice";
import { systemMessage } from "../store/firebaseSlice";
import {
  snackbar,
  loader,
  userId,
  userFetch,
  isSigned,
  isLogged,
  isAuth,
  isSet,
  checkAuth,
  resetUser,
} from "../store/loginSlice";


// Firebase config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "ledo-barber.firebaseapp.com",
  projectId: "ledo-barber",
  storageBucket: "ledo-barber.appspot.com",
  messagingSenderId: "675267266255",
  appId: "1:675267266255:web:05e0666b977df0f47d59ba",
};

// Initialization
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

// HOOKS

// Add new user hook
export const useNewUser = (fetch, email, password, userData) => {
  const dispatch = useDispatch();
  const setRequest = useSelector((state) => state.login.isSet);
  useEffect(() => {
    if (fetch) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          dispatch(userId(cred.user.uid));
          dispatch(userFetch(false));
          dispatch(isSet(true));
        })
        .catch((err) => {
          console.log(err.message);
          dispatch(userFetch(false));

          if (err.message.includes("invalid-email")) {
            dispatch(loader(false));
            dispatch(
              systemMessage(
                "Something wrong with email format. Please, double check"
              )
            );
          }
          if (err.message.includes("email-already-in-use")) {
            dispatch(loader(false));
            dispatch(
              systemMessage(
                "User already exists. Please, sign in with your e-mail"
              )
            );
          }
          if (err.message.includes("password")) {
            dispatch(loader(false));
            dispatch(
              systemMessage(
                "Incorrect password. Password should be at least 6 characters, contain at least one uppercase, one lowercase and one digit. Digits and english letters only."
              )
            );
          }

          dispatch(snackbar(true));
        });
    }
  }, [fetch]);

  useProfileSet(setRequest, userData, email, password);
};

// Set user profile hook
export const useProfileSet = (fetch, userData, email, password) => {
  const customerId = useSelector((state) => state.login.userId);
  const loginRequest = useSelector((state) => state.login.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetch) {
      setDoc(doc(db, "Customers", customerId), userData)
        .then(() => {
          dispatch(snackbar(false));
          dispatch(userId(""));
          dispatch(isSet(false));
          dispatch(isSigned(false));
          dispatch(isLogged(true));
        })
        .catch((err) => {
          console.log(err.message);
          dispatch(loader(false));
        });
    }
  }, [fetch]);

  useLogin(loginRequest, email, password);
};

// Login Hook
export const useLogin = (fetch, email, password) => {
  const customerId = useSelector((state) => state.login.userId);
  const fetchGet = useSelector((state) => state.login.checkAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetch) {
      signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          dispatch(userId(cred.user.uid));
        })
        .then(() => {
          dispatch(snackbar(false));
          dispatch(isLogged(false));
          dispatch(checkAuth(true));
        })
        .catch((err) => {
          console.log(err.message);
          dispatch(isLogged(false));
          dispatch(
            systemMessage("Wrong e-mail/password. Please, double check.")
          );
          dispatch(snackbar(true));
          dispatch(loader(false));
        });
    }
  }, [fetch]);
  useGetProfile(fetchGet, customerId);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(isAuth(true));
      } else {
        dispatch(isAuth(false));
      }
    });
  }, []);
};

// Get user Information hook

export const useGetProfile = (fetch, id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (fetch) {
      getDoc(doc(db, "Customers", id))
        .then((doc) => {
          dispatch(customerData(doc.data()));
          dispatch(loader(false));
          navigate("/profile/stats");
        })
        .then(() => {
          dispatch(checkAuth(false));
          dispatch(userId(""));
          dispatch(resetUser());
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [fetch]);
};

// User Update Hook
export const useUpdate = (fetch, updInfo) => {
  let dispatch = useDispatch();
  const customerInfo = useSelector((state) => state.customer.customerData);
  let customerId = customerInfo.uid;

  useEffect(() => {
    if (fetch) {
      const docRef = doc(db, "Customers", customerId);
      updateDoc(docRef, updInfo).then(() => {
        getDoc(doc(db, "Customers", customerId))
          .then((doc) => {
            dispatch(customerData(doc.data()));
            dispatch(loader(false));
            dispatch(emailSuccess(false));
            console.log(doc.data());
          })
          .catch((err) => console.log(err.message));
      });
    }
  }, [fetch]);
};

// User Sign Out Hook
export const useSignOut = (status) => {
  let dispatch = useDispatch();
  useEffect(() => {
    if (status) {
      signOut(auth)
        .then(() => {
          dispatch(isLoggedOut(false));
          dispatch(resetCustomer());
          dispatch(resetFirebase());
          dispatch(resetShop());
          dispatch(resetServices());
          dispatch(resetShop());
        })
        .then(() => {
          console.log(status);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [status]);
};

// User changed email hook

export const useEmail = (fetch, email, setFetch) => {
  let dispatch = useDispatch();
  useEffect(() => {
    if (fetch) {
      updateEmail(auth.currentUser, email)
        .then(() => {
          console.log("Email has been changed!");
          dispatch(success(true));
          dispatch(emailSuccess(true));
        })
        .catch((error) => {
          setFetch(false);
          dispatch(systemMessage("There is another user with this email."));
          dispatch(snackbar(true));
        });
    }
  }, [fetch]);
};
export const usePass = (fetch, newPassword, setFetch) => {
  let dispatch = useDispatch();
  useEffect(() => {
    if (fetch) {
      const user = auth.currentUser;
      updatePassword(user, newPassword)
        .then(() => {
          console.log("Password has been changed!");
          dispatch(success(true));
          setFetch(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [fetch]);
};
