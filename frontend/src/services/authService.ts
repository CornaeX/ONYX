import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

const API_URL = "https://onyxbackend.share.zrok.io/api/auth";

export const registerUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();

  await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  localStorage.setItem("token", token);
};

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  const token = await userCredential.user.getIdToken();
  const uid = userCredential.user.uid;

  localStorage.setItem("token", token);

  return {
    uid,
    email: userCredential.user.email
  };
};