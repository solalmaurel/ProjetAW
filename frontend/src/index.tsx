import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {BrowserRouter, Route, Routes} from "react-router";
import LoginPage from "./pages/authentication/login";
import RegisterPage from "./pages/authentication/register";
import HomePage from "./pages/home/home";
import TestPage from "./pages/test";
import OfferPage from "./pages/offers/offers";
import ProfilePage from "./pages/profile/profile";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="test" element={<TestPage/>} />
              <Route path="login" element={<LoginPage/>} />
              <Route path="register" element={<RegisterPage/>} />
              <Route path="offers" element={<OfferPage/>} />
              <Route path="profile" element={<ProfilePage/>} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
