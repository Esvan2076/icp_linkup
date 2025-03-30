import './App.css'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MentorPage from "./pages/MentorPage";
import DreamsPage from "./pages/DreamsPage";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
   <BrowserRouter>
      <Routes>
         <Route path="/" element={<App />} />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/mentores" element={<MentorPage />} />
         <Route path="/suenos" element={<DreamsPage />} />
      </Routes>
   </BrowserRouter>
);