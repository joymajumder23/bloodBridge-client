// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,

    //   apiKey: "AIzaSyBUW6YO0PJ1rfUhcAxLVAWF71vSwnHheMU",
    //   authDomain: "blood-donation-client-27e52.firebaseapp.com",
    //   projectId: "blood-donation-client-27e52",
    //   storageBucket: "blood-donation-client-27e52.appspot.com",
    //   messagingSenderId: "318932329201",
    //   appId: "1:318932329201:web:00386a2181d85d76713f50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;