import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/authentification/login";
import RegisterPage from "./pages/authentification/register";
import HomePage from "./pages/home/home";
import OfferPage from "./pages/offers/offers";
import ProfilePage from "./pages/profile/profile";
import ForumPage from "./pages/forum/forum";
import EventPage from "./pages/events/events";
import Discussion from "./pages/forum/discussion";
import CreateForm from "./pages/forum/create-post";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';
import PaymentPage from "./pages/payment/payment";
import ParticipantsPage from "./pages/events/participants";
import PaymentHistoryPage from "./pages/profile/payment-history";
import Callback from "./pages/payment/callback";
import UnauthorizedPage from "./unauthorized"; // Create this component

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                {/* --- Public Routes --- */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/offers" element={<OfferPage />} />
                <Route path="/forum">
                    <Route index element={<ForumPage />} />
                    <Route path="discussion/:id" element={<Discussion />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="create" element={<CreateForm />} />
                    </Route>
                </Route>
                <Route path="/events" element={<EventPage />} />
                <Route path="/evenement/:id/participants" element={<ParticipantsPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />


                {/* --- Routes Protégées --- */}
                <Route element={<ProtectedRoute/>}>
                    <Route path="/profile">
                        <Route index element={<ProfilePage />} />
                        <Route path="payment-history" element={<PaymentHistoryPage />} />
                    </Route>
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/callback" element={<Callback />} />
                </Route>

                {/* --- Admin Routes --- */}
                <Route element={<ProtectedRoute requiredRole="admin" />}>
                    {/* Ajouter les pages pour les admins ici */}
                </Route>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);
