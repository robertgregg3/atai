import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAFeL4_29BAWZ5vL9dIIepkp8E--oHIrlY",
  authDomain: "atai-938b6.firebaseapp.com",
  projectId: "atai-938b6",
  storageBucket: "atai-938b6.appspot.com",
  messagingSenderId: "253952707178",
  appId: "1:253952707178:web:2e3a67a533eae8e2d1d813",
  measurementId: "G-YNXPTRCX3E"
};

// Initialize Firebase
// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };