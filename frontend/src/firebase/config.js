
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBu7JuSPqsm0DTe5RKK9DCKzDaJixnGWWk",

  authDomain: "rcet-erp.firebaseapp.com",

  projectId: "rcet-erp",

  storageBucket: "rcet-erp.appspot.com",

  messagingSenderId: "506365989068",

  appId: "1:506365989068:web:f8fb0fc89082d7884f7269",

  measurementId: "G-3R39CF1YQ8"

};


export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);