// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB28H_h4O_DJMEh2muURdCwyYGR6XyFBw8",
  authDomain: "crown-clothing-db-8d6e9.firebaseapp.com",
  projectId: "crown-clothing-db-8d6e9",
  storageBucket: "crown-clothing-db-8d6e9.appspot.com",
  messagingSenderId: "796937976396",
  appId: "1:796937976396:web:81431f5c7a8265cc43d2e9",
  measurementId: "G-G752E0SG6C",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = await doc(db, "users", userAuth.uid);
  // console.log(userDocRef);

  const userSanpshot = await getDoc(userDocRef);
  // console.log(userSanpshot);
  // console.log(userSanpshot.exists());

  if (!userSanpshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user ", error.message);
    }
  }
  return userDocRef;
};
