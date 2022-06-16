import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5Gf2sXrKbCKJsmoeegfhnlnO55Qx-unM",

  authDomain: "thedojosite-a0a95.firebaseapp.com",

  projectId: "thedojosite-a0a95",

  storageBucket: "thedojosite-a0a95.appspot.com",

  messagingSenderId: "104867711400",

  appId: "1:104867711400:web:61aad26664fc82e1d5b59d",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
