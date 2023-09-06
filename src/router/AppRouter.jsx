import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../components/Navbar";
import Main from "../pages/Main";
import About from "../pages/About";
import Cartoons from "../pages/Cartoons";
import Documentaries from "../pages/Documentaries";

import ModernArabic from "../pages/ModernArabic";
import Musics from "../pages/Musics";
import News from "../pages/News";
import Poems from "../pages/Poems";
import MyFavorites from "../pages/MyFavorites";
import Account from "../pages/Account";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Scientists from "../pages/Scientists";
import Feedbacks from "../pages/Feedbacks";
import Footer from "../components/Footer";
import PrivateRouter from "./PrivateRouter";
import AdminPanel from "../pages/AdminPanel";
import VideoDetails from "../pages/VideoDetail";

const AppRouter = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feedbacks" element={<Feedbacks />} />
        <Route path="" element={<PrivateRouter />}>
          <Route path="/cartoons" element={<Cartoons />} />
          <Route path="/scientists" element={<Scientists />} />
          <Route path="/documentaries" element={<Documentaries />} />
          <Route path="/modern-arabic" element={<ModernArabic />} />
          <Route path="/musics" element={<Musics />} />
          <Route path="/news" element={<News />} />
          <Route path="/poems" element={<Poems />} />
          <Route path="/my-account" element={<Account />} />
          <Route path="/my-favorites" element={<MyFavorites />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/details/:id" element={<VideoDetails />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default AppRouter;
