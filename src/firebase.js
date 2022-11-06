import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYkPbB4TNC-oav25aZWNqvtn_7tuszw-E",
  authDomain: "todo-34967.firebaseapp.com",
  projectId: "todo-34967",
  storageBucket: "todo-34967.appspot.com",
  messagingSenderId: "220064343211",
  appId: "1:220064343211:web:f6ade9d73fd3191a6683ee",
  measurementId: "G-GT9GTKL0X5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
