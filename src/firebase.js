import firebase from "firebase/compat/app";
import firebaseConfig from "./config";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };