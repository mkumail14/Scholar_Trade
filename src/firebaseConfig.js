import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZGUeRQ_a2h6ilnW85yHIhBFQqWjdnWU4",
  authDomain: "scholar-trade.firebaseapp.com",
  projectId: "scholar-trade",
  storageBucket: "scholar-trade.firebasestorage.app",
  messagingSenderId: "1075025471466",
  appId: "1:1075025471466:android:dbffe180a65ca0cb537493"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { auth, db };