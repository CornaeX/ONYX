import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-oy7cLSH73J2MOoQGTrouM4HUYLHfu-s",
  authDomain: "onyx-c2db0.firebaseapp.com",
  projectId: "onyx-c2db0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);