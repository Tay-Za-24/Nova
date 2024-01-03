import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAQEDq02TWNR0NLkDza3LoFjHylLwIhsIE",
    authDomain: "taskmanagerreact-4d219.firebaseapp.com",
    projectId: "taskmanagerreact-4d219",
    storageBucket: "taskmanagerreact-4d219.appspot.com",
    messagingSenderId: "696424064601",
    appId: "1:696424064601:web:0eba30b476596915d4b348",
    measurementId: "G-H8XB0G2WV6"
  };

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
export const firebaseDb = getFirestore(firebaseApp);


