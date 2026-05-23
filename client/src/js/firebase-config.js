// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB96-Q9XrzudcsHRVyXFh0j5phbSGd7E1w",
    authDomain: "coffee-management-fa696.firebaseapp.com",
    projectId: "coffee-management-fa696",
    storageBucket: "coffee-management-fa696.firebasestorage.app",
    messagingSenderId: "868424700390",
    appId: "1:868424700390:web:1d72752f59e4c122a80627",
    measurementId: "G-5S77Z24R12"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export{auth, db};