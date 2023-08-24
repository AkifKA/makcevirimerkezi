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

const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/cartoons" element={<Cartoons />} />
        <Route path="/documentaries" element={<Documentaries />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/modern-arabic" element={<ModernArabic />} />
        <Route path="/musics" element={<Musics />} />
        <Route path="/news" element={<News />} />
        <Route path="/poetries" element={<Poetries />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
