// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBXRS3FI5O1l9FTrH88aD830LciXFEQanE",
    authDomain: "fivone-9ea65.firebaseapp.com",
    projectId: "fivone-9ea65",
    storageBucket: "fivone-9ea65.firebasestorage.app",
    messagingSenderId: "1066954871821",
    appId: "1:1066954871821:web:0c8114054cbe7903b9b144",
    measurementId: "G-X6CF031DGY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier };