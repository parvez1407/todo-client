// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAW-WQ8G3uHVdCNiB_3nZzU2jfRTz7kTxQ",
    authDomain: "todo-bb5f9.firebaseapp.com",
    projectId: "todo-bb5f9",
    storageBucket: "todo-bb5f9.appspot.com",
    messagingSenderId: "430954308778",
    appId: "1:430954308778:web:4c4611a4e794fb541e5cd3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;