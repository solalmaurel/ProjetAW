import React, {JSX, useEffect, useState} from "react";
import {User} from "../../models/user";
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {Facture, getHistoryFromUser} from "../../models/payment";

function NavBar({user}: { user: User }) {
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return (
        <nav className="border-r-1 border-r min-w-72 p-3 flex flex-col space-y-8">
            <span className="flex justify-center">
                <a href="/" className="text-2xl text-[#2196F3] font-bold">Entraide Étudiante</a>
            </span>
            <div className="flex flex-col space-y-4">
                <span className="flex flex-row items-center space-x-3  p-2 rounded-lg">
                    <div className="bg-amber-300 rounded-full w-6 h-6"/>
                    <a href="/profile" className="font-semibold">Informations personnelles</a>
                </span>
                <span className="flex flex-row items-center space-x-3 bg-gray-200 p-2 rounded-lg">
                    <div className="bg-amber-300 rounded-full w-6 h-6"/>
                    <a href="/profile/payment-history" className="font-semibold">Historique de paiements</a>
                </span>
                {user && user.admin && <>
                    <hr/>
                    <span className="flex flex-row items-center space-x-3 p-2 rounded-lg">
                        <div className="bg-green-300 rounded-full w-6 h-6"/>
                        <a href="/admin/accounts" className="font-semibold">Gérer les comptes</a>
                    </span>
                    <span className="flex flex-row items-center space-x-3 p-2 rounded-lg">
                    <div className="bg-green-300 rounded-full w-6 h-6"/>
                    <a href="/admin/offers" className="font-semibold">Gérer les offres</a>
                    </span>
                    <span className="flex flex-row items-center space-x-3 p-2 rounded-lg">
                    <div className="bg-green-300 rounded-full w-6 h-6"/>
                    <a href="/admin/events" className="font-semibold">Gérer les évenements</a>
                    </span>
                </>}
            </div>
            <div className="flex flex-col h-full justify-end">
                <span className="flex flex-row items-center space-x-3 p-2 rounded-lg">
                    <div className="bg-red-300 rounded-full w-6 h-6"/>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="font-semibold cursor-pointer bg-transparent border-none p-0 text-current"
                    >
                    Se déconnecter
                   </button>
              </span>
            </div>
        </nav>
    );
}

function PaymentHistory({user}: { user: User }) {

    const [formData, setFormData] = useState<User>(user);
    const [history, setHistory] = useState<Facture[]>([]);

    useEffect(() => {
        if(user === undefined || user === null) return;
        setFormData(user);
        getHistoryFromUser(user.idUser).then(value => {
            setHistory(value);
        }).catch(reason => {
            console.log(reason);
        })

    }, [user]);

    const formatDate = (dateInput: string | Date | undefined | null): string => {
        if (!dateInput) return "N/A";
        try {
            const date = new Date(dateInput);
            if (isNaN(date.getTime())) {
                console.warn("Date invalide :", dateInput);
                return "Date invalide";
            }
            return date.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Erreur de format de date";
        }
    };

    return (
        <div className="w-5/6 h-fit p-5 rounded-lg border-2 space-y-5 max-w-screen-lg">
            <h1 className="font-bold text-2xl">Historique de paiements</h1>
            <div className="flex flex-col space-y-3">
                {history.map((facture) => (
                    <HistoryTile key={facture.idFacture} facture={facture}/>
                ))}
            </div>
            <hr className="border-gray-300"/>
        </div>
    );
}

function HistoryTile({facture}: {facture: Facture}): JSX.Element {
    return (
      <div className="bg-red-200">
          <p>Facture n°{facture.idFacture} type {facture.typeFacture} payée {facture.pricePaid}€ </p>
      </div>
    );
}


export default function PaymentHistoryPage(): JSX.Element | null {
    const navigate = useNavigate();
    const {user, isAuthenticated} = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            console.log("User not authenticated, should redirect to login.");
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated === undefined) {
        return <div>Chargement...</div>;
    }

    if (!isAuthenticated || !user) {
        return <div>Chargement des données utilisateur ou utilisateur non connecté...</div>;
    }

    return (
        <div className="w-dvw min-h-dvh flex flex-row">
            <NavBar user={user}/>
            <div className="w-full flex items-center justify-center">
                <PaymentHistory user={user}/>
            </div>
        </div>
    );
}