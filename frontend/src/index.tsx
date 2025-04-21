import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import TestPage from "./pages/TestPage";
import {BrowserRouter, Route, Routes} from "react-router";
import LoginPage from "./pages/authentication/login";
import RegisterPage from "./pages/authentication/register";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App/>} />
              <Route path="test" element={<TestPage/>} />
              <Route path="login" element={<LoginPage/>} />
              <Route path="register" element={<RegisterPage/>} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
