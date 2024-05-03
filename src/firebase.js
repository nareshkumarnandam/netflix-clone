
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyBgA95-Ee4ER64oKvFrDHpYxThFVtTJ5Yw",
  authDomain: "netflix-clone-81022.firebaseapp.com",
  projectId: "netflix-clone-81022",
  storageBucket: "netflix-clone-81022.appspot.com",
  messagingSenderId: "866922479732",
  appId: "1:866922479732:web:366ba89b7b362b983ed121"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password) => {
    try {
       await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};