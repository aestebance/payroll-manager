import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCqUC4cAC7MMq904fhFR9zNy8b1TdzUVQM",
    authDomain: "payroll-manager-93e2e.firebaseapp.com",
    projectId: "payroll-manager-93e2e",
    storageBucket: "payroll-manager-93e2e.appspot.com",
    messagingSenderId: "703215641368",
    appId: "1:703215641368:web:59e6f53424e6b15174b46d"
};
firebase.initializeApp(firebaseConfig);

//Utils
const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();

//Exports
export { auth, storage, db }
