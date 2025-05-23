
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const db=getFirestore(app)

const signup=async(name,email,password)=>{
   if (!name) {
     return toast.error("Name is required");
   }
   if (/[^a-zA-Z0-9 ]/.test(name)) {
    
     return toast.error("Name can only contain letters and numbers");
   }

   if (!email) {
     return toast.error("Email is required");
   }
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
     return toast.error("Please enter a valid email address");
   }

   if (!password) {
     return toast.error("Password is required");
   }
   if (password.length < 6) {
     return toast.error("Password must be at least 6 characters");
   }
   const passwordRegex =
     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}|\[\]\\:";'<>?,./]).{6,}$/;
   if (!passwordRegex.test(password)) {
     return toast.error(
       "Password must have at least one uppercase letter, one lowercase letter, one number, and one special character"
     );
   }
   if (/\s/.test(password)) {
   
     return toast.error("Password cannot contain spaces");
   }
    try {
    const res =    await createUserWithEmailAndPassword(auth,email,password)
    const user=res.user
    await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email
    })
     toast.success("Sign up successful!");
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "))
        
        
    }
}

const login=async(email,password)=>{
   if (!email) {
     return toast.error("Email is required");
   }
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
     return toast.error("Please enter a valid email address");
   }


   if (!password) {
     return toast.error("Password is required");
   }
   if (password.length < 6) {
     return toast.error("Password must be at least 6 characters");
   }
   if (/\s/.test(password)) {
  
     return toast.error("Password cannot contain spaces");
   }

    try {
        await signInWithEmailAndPassword(auth,email,password)
         toast.success("Login successful!");
    } catch (error) {
        console.log(error);
       toast.error(error.code.split("/")[1].split("-").join(" "));
        
    }


}

const logout=async()=>{
    try {
    await signOut(auth);  
    toast.success("Successfully logged out!");
  } catch (error) {
    console.log(error);
    toast.error("An error occurred during logout.");
  }

}

export {
    auth,
    db,
    login,
    signup,
    logout
}