import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import { careers, isSubmitted } from "../store/firebaseSlice";
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
  setDoc,
  addDoc,
  getDocs,
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

// Set career profile hook
export const useCareerPost = (fetch, post, setPost) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetch) {
      addDoc(collection(db, "Careers"), post)
        .then((doc) => {
          setPost(false);
        })
        .catch((err) => console.log(err.message));
    }
  }, [fetch]);
};

// Get careers  hook
export const useCareersGet = (fetch, setFetch) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetch) {
      getDocs(collection(db, "Careers"))
        .then((snapshot) => {
          let careersArr = [];
          snapshot.docs.forEach((doc) =>
            careersArr.push({ ...doc.data(), id: doc.id })
          );
          dispatch(careers(careersArr));
          setFetch(false);
        })
        .catch((err) => console.log(err.message));
    }
  }, [fetch]);
};
