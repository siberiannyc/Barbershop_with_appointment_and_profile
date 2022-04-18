import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import { isSubmitted } from "../store/firebaseSlice";
import {
  barber,
  shopBarbers,
  barberId,
  barbUpdate,
  multiFetched,
  barbFetched,
  deleteBarber,
} from "../store/barberSlice";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  onSnapshot,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { loader } from "../store/loginSlice";

// Firebase config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "ledo-barber.firebaseapp.com",
  projectId: "ledo-barber",
  storageBucket: "ledo-barber.appspot.com",
  messagingSenderId: "675267266255",
  appId: "1:675267266255:web:05e0666b977df0f47d59ba",
};
// Initialize base
initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, "Barbers");

// HOOKS

// Barber Information Upload Hook
export const useBarbUpload = (fetch, barbId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetch) {
      dispatch(loader(true));
      getDoc(doc(db, "Barbers", barbId))
        .then((doc) => {
          dispatch(barber(doc.data(), doc.id));
        })
        .then(() => {
          dispatch(deleteBarber(false));
          dispatch(barbFetched(false));
          dispatch(loader(false));
        })
        .catch((err) => console.log(err.message));
    }
  }, [fetch]);
};

// Barber Update Hook
export const useBarbUpdate = (fetch, data, barbId) => {

  const dispatch = useDispatch();
  useEffect(() => {
    if (fetch) {

      const docRef = doc(db, "Barbers", barbId);
      updateDoc(docRef, data).then(() => {
        const docRef = doc(db, "Barbers", barbId);
        getDoc(docRef).then((doc) => {
          console.log(doc.data(), doc.id);
          dispatch(barber(doc.data(), doc.id));
          dispatch(barberId(doc.id));
          dispatch(barbUpdate(false));
          dispatch(isSubmitted(true));
          dispatch(loader(false));
        });
      });
    }
  }, [fetch]);
};

// Catch available barbers for ANY BARBER choice
export const useRandomBarb = (fetch) => {
  const shop = useSelector((state) => state.shop.shop.activeShop.name);
  const dispatch = useDispatch();
  const q = query(colRef, where("shop", "==", shop));
  useEffect(() => {
    if (fetch) {
      dispatch(loader(true));
      onSnapshot(q, (snapshot) => {
        let barbers = [];
        snapshot.docs.forEach((doc) => {
          barbers.push({ ...doc.data(), id: doc.id });
        });
        dispatch(multiFetched(false));
        //  setAnyFetch(false);
        dispatch(shopBarbers(barbers));
      });
    }
  }, [fetch]);
};
