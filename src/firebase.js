import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAknn5IicAQnqmfFhCsWg_0oIvplhZi3c",
  authDomain: "ads-procject.firebaseapp.com",
  projectId: "ads-procject",
  storageBucket: "ads-procject.firebasestorage.app",
  messagingSenderId: "952976934137",
  appId: "1:952976934137:web:567d9b16a321709bdc4e28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
