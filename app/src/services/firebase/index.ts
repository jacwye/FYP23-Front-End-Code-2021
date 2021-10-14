import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

/**
 * Initialises the firebase app with configuration that points to our
 * remote firebase services.
 */

const firebaseConfig = {
    apiKey: "AIzaSyBl4ZVaBSQcjiwU-yLZ4JZYorVP6Z-gbnM",
    authDomain: "cms-uoa.firebaseapp.com",
    databaseURL: "https://cms-uoa.firebaseio.com",
    projectId: "cms-uoa",
    storageBucket: "cms-uoa.appspot.com",
    messagingSenderId: "314758269258",
    appId: "1:314758269258:web:d2f2780b00452495c599b3",
    measurementId: "G-C42W4Z3TE3",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();

export const useLocalUserId = () => {
    return firebaseApp.auth().currentUser?.uid;
};
