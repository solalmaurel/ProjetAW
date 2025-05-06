import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/authentification/login";
import RegisterPage from "./pages/authentification/register";
import HomePage from "./pages/home/home";
import TestPage from "./pages/test";
import OfferPage from "./pages/offers/offers";
import ProfilePage from "./pages/profile/profile";
import ForumPage from "./pages/forum/forum";
import EventPage from "./pages/events/events";
import Discussion from "./pages/forum/discussion";
import CreateForm from './pages/forum/create-post';

import {AuthProvider} from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* --- Routes Publiques --- */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/test" element={<TestPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/offers" element={<OfferPage />} />
                    <Route path="/forum">
                        <Route index element={<ForumPage />} />
                        <Route path="discussion" element={<Discussion />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="create" element={<CreateForm />} />
                        </Route>
                    </Route>
                    <Route path="/events" element={<EventPage />} />

                    {/* --- Routes Protégées --- */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);