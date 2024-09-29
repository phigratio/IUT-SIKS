// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1rDLcrPl3XUV_5OpBXaaPRJmXKYwRxYs",
  authDomain: "react-js-reviewer-app.firebaseapp.com",
  projectId: "react-js-reviewer-app",
  storageBucket: "react-js-reviewer-app.appspot.com",
  messagingSenderId: "82869764357",
  appId: "1:82869764357:web:573f44282278bab044776c",
  measurementId: "G-9EY3T518CQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//google auth

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;
  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((err) => {
      console.log(err);
    });
  return user;
};
