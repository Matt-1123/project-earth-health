import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAKGezN4EiW-RwA536x2Mzm83MRzbpBA-I",
  authDomain: "project-earth-health.firebaseapp.com",
  projectId: "project-earth-health",
  storageBucket: "project-earth-health.appspot.com",
  messagingSenderId: "227789729061",
  appId: "1:227789729061:web:d15cbbff153f9ac0eefecc",
  measurementId: "G-7R5TN6KD5C",
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default fire;
