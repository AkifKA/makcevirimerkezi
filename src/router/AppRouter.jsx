import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../components/Navbar";
import Main from "../pages/Main";
import About from "../pages/About";
import Cartoons from "../pages/Cartoons";
import Documentaries from "../pages/Documentaries";
import { Feedback } from "@mui/icons-material";
import ModernArabic from "../pages/ModernArabic";
import Musics from "../pages/Musics";
import News from "../pages/News";
import Poetries from "../pages/Poetries";
import MyFavorites from "../pages/MyFavorites";
import MyAccount from "../pages/MyAccount";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Scientists from "../pages/Scientists";
import Feedbacks from "../pages/Feedbacks";
import Footer from "../components/Footer";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/cartoons" element={<Cartoons />} />
        <Route path="/scientists" element={<Scientists />} />
        <Route path="/documentaries" element={<Documentaries />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/modern-arabic" element={<ModernArabic />} />
        <Route path="/musics" element={<Musics />} />
        <Route path="/news" element={<News />} />
        <Route path="/poetries" element={<Poetries />} />
        <Route path="/my-favorites" element={<MyFavorites />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feedbacks" element={<Feedbacks />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
