import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDMaiwxvTugR4okAw4U_3cULsiuudN7vcU",
    authDomain: "thinker-2df3d.firebaseapp.com",
    projectId: "thinker-2df3d",
    storageBucket: "thinker-2df3d.firebasestorage.app",
    messagingSenderId: "838043698149",
    appId: "1:838043698149:web:8f527bf114e2522d7e250c"
};


const app = initializeApp(firebaseConfig);

// Exporta Firestore e Auth
export const db = getFirestore(app);
export const auth = getAuth(app); // 🔥 Agora a autenticação pode ser usada em qualquer parte do código!