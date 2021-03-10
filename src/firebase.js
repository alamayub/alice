import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'
var firebaseConfig = {
  apiKey: "AIzaSyDZcP1Tms1SSbUBoEVm-sMILe5c4b9AtI4",
  authDomain: "alice-d0222.firebaseapp.com",
  projectId: "alice-d0222",
  storageBucket: "alice-d0222.appspot.com",
  messagingSenderId: "432837612736",
  appId: "1:432837612736:web:c4dfc02c554c1a8efe0925",
  measurementId: "G-2873YPHTMN"
};
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { fb, db }