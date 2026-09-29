import React, { useState, useEffect } from "react";
import Home from "@/pages/Home/Home";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "@/pages/Login/Login";
import Player from "@/pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ToastContainer } from "react-toastify";
import Spinner from "@/components/ui/Spinner/Spinner";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && location.pathname === "/login") {
       
        navigate("/", { replace: true });
      } else if (!user && location.pathname !== "/login") {
   
        navigate("/login", { replace: true });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;
