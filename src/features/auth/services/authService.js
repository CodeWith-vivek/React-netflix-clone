import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "@/lib/firebase";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validators";

const firebaseErrorMessage = (error) =>
  error.code.split("/")[1].split("-").join(" ");

export const signup = async (name, email, password) => {
  const validationError =
    validateName(name) ||
    validateEmail(email) ||
    validatePassword(password, { strong: true });
  if (validationError) return toast.error(validationError);

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    toast.success("Sign up successful!");
  } catch (error) {
    console.log(error);
    toast.error(firebaseErrorMessage(error));
  }
};

export const login = async (email, password) => {
  const validationError = validateEmail(email) || validatePassword(password);
  if (validationError) return toast.error(validationError);

  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
  } catch (error) {
    console.log(error);
    toast.error(firebaseErrorMessage(error));
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Successfully logged out!");
  } catch (error) {
    console.log(error);
    toast.error("An error occurred during logout.");
  }
};
