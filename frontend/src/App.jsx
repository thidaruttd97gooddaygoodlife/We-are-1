import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Navbar from "./pages/Navbar";
import SignIn from "./pages/Sign-in";
import SignUp from "./pages/Sign-up";
import Home from "./pages/Home";
import Match from "./pages/Match";
import Profile from "./pages/Profile";
import Perdata from "./pages/Perdata";
import Pertest from "./pages/Pertest";
import Resource from "./pages/Resource";
import FormNewUser from "./pages/FormNewUser";
import { Toaster }  from 'react-hot-toast';
import axios from "axios";
import { UserContextProvider } from "../context/Usercontext";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleNavbar = () => {
    setShowSidebar(showSidebar => !showSidebar);
  }
  
  return (
    <>
    <UserContextProvider>
    <BrowserRouter>
      <Navbar toggleNavbar={toggleNavbar}/>
      <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
      <Routes>
        <Route path="/" element={<Home showSidebar={showSidebar}/>} />
        <Route path="/match" element={<Match showSidebar={showSidebar}/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/perdata" element={<Perdata showSidebar={showSidebar}/>} />
        <Route path="/pertest" element={<Pertest showSidebar={showSidebar}/>} />
        <Route path="/resource" element={<Resource showSidebar={showSidebar}/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/formnewuser" element={<FormNewUser />} />
      </Routes>
    </BrowserRouter>
    </UserContextProvider>
    </>
  );
};

export default App;