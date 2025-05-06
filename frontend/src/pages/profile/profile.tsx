import React, {ChangeEvent, JSX, useEffect, useState} from "react";
import {updateUser, User, TypeEtude, deleteUser} from "../../models/user";
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {DepartmentSelector} from '../authentification/register';

function NavBar({ user }: { user: User }) {
    const { logout } = useAuth();
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
                <span className="flex flex-row items-center space-x-3 bg-gray-200 p-2 rounded-lg">
                    <div className="bg-amber-300 rounded-full w-6 h-6"/>
                    <a href="/profile" className="font-semibold">Informations personnelles</a>
                </span>
                { user && user.isAdmin && <>
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
                </> }
            </div>
            <div className="flex flex-col h-full justify-end">
                <span className="flex flex-row items-center space-x-3 p-2 rounded-lg">
                    <div className="bg-red-300 rounded-full w-6 h-6" />
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


function ProfileEdit({ user }: { user: User }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<User>(user);
    const { login, logout } = useAuth(); // Récupérer la fonction login du contexte

    useEffect(() => {
        setFormData(user);
    }, [user]);


    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        if (!formData) {
            console.error("Aucune donnée de formulaire à sauvegarder.");
            return;
        }
        try {
            console.log("Tentative de mise à jour de l'utilisateur :", formData);
            await updateUser(formData);
            console.log("Utilisateur maj avec succès.");
            login(formData,"token"); // MAJ Contexte de connexion
            navigate('/');
        } catch (err: unknown) {
            console.error("Erreur lors de la maj de l'utilisateur:", err);
            alert("Erreur lors de la mise à jour du profil.");
        }
    }

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        if (!formData) return;
        if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
            console.log("DELETE ACCOUNT for user ID:", formData.id);
            try {
              await deleteUser(formData);
              logout();
              navigate('/');
            } catch (err) {
               console.error("Error deleting account:", err);
               alert("Erreur lors de la suppression du compte.");
            }
        }
    }


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prevData => ({
                ...prevData,
                [name]: checked,
            }));
        }
        else {
            let processedValue: string | number = value;
            if (name === 'anneeDiplome') {
                processedValue = parseInt(value, 10) || 0;
            }

            setFormData(prevData => ({
                ...prevData,
                [name]: processedValue,
            }));
        }
    };


    const handleDepartmentChange = (newValue: string | number) => {
        let finalValue: TypeEtude;

        if (typeof newValue === 'string') {
            const numValue = parseInt(newValue, 10);
            finalValue = !isNaN(numValue) ? numValue : formData.typeEtude;
        } else {
            finalValue = newValue;
        }

        setFormData(prevData => ({
            ...prevData,
            typeEtude: finalValue
        }));
    };


    const currentYear = new Date().getFullYear();
    const startYear = 1990;
    const endYear = currentYear + 10;
    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

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

    const isCotisationRecent = (dateInput: string | Date | undefined | null): boolean => {
        if (!dateInput) return false;

        try {
            const cotisationDate = new Date(dateInput);
            if (isNaN(cotisationDate.getTime())) {
                return false;
            }

            const currentDate = new Date();
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

            return cotisationDate >= oneYearAgo;

        } catch (error) {
            console.error("Error checking cotisation date:", error);
            return false; // Error means we can't confirm it's recent
        }
    };

    const needsCotisationPayment = !isCotisationRecent(formData.dateCotisation);

    return (
        <div className="w-5/6 h-fit p-5 rounded-lg border-2 space-y-5 max-w-screen-lg">
            <h1 className="font-bold text-2xl">Informations personnelles</h1>
            <div className="flex flex-col space-y-3">
                <div className="flex flex-col space-y-1">
                    <label htmlFor="prenom" className="text-md font-semibold">Prénom</label>
                    <input className="border border-1 rounded-md px-3 py-1"
                           type="text"
                           name="prenom"
                           value={formData.prenom}
                           onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="nom" className="text-md font-semibold">Nom</label>
                    <input className="border border-1 rounded-md px-3 py-1"
                           type="text"
                           name="nom"
                           value={formData.nom}
                           onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="email" className="text-md font-semibold">Adresse e-mail</label>
                    <input className="border border-1 rounded-md px-3 py-1"
                           type="email"
                           name="email"
                           value={formData.email}
                           onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col space-y-1 pt-2">
                    <label className="text-md font-semibold text-gray-700">Statut de la cotisation</label>
                    {needsCotisationPayment ? (
                        <button
                            type="button"
                            onClick={() => {
                                formData.dateCotisation = new Date();
                                setFormData(formData);
                                navigate('/profile');
                            }} // Navigate on click
                            className="w-full md:w-auto px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
                        >
                            {formData.dateCotisation ? 'Renouveler ma cotisation' : 'Payer ma cotisation'}
                        </button>
                    ) : (
                        <div
                            className="border border-gray-200 bg-gray-100 rounded-md px-3 py-1 text-gray-600 min-h-[38px] flex items-center"
                        >
                            ✅ À jour (Expire le {formatDate(new Date(new Date(formData.dateCotisation!).setFullYear(new Date(formData.dateCotisation!).getFullYear() + 1)))})
                        </div>
                    )}
                </div>
            </div>
            <hr className="border-gray-300"/>
            <div className="flex flex-col space-y-3">
                <h2 className="font-bold text-lg">Votre formation</h2>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="etablissement" className="text-md font-semibold">Établissement</label>
                    <input className="border border-1 rounded-md px-3 py-1"
                           type="text"
                           name="etablissement"
                           value={ formData.etablissement || '' } // TODO: Gérer établissement avec carrousel et api liste
                           onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col space-y-1">
                    <DepartmentSelector
                        id="typeEtude"
                        name="typeEtude"
                        value={formData.typeEtude}
                        onChange={handleDepartmentChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="anneeDiplome" className="font-semibold text-sm text-gray-700 mb-1">Année de diplôme (prévue)</label>
                    <select
                        className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        id="anneeDiplome"
                        name="anneeDiplome"
                        value={formData.anneeDiplome || ''}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Sélectionnez une année</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <hr className="border-gray-300"/>
            <div className="flex flex-col space-y-3">
                <h2 className="font-bold text-lg">Vos notifications</h2>
                <span className="flex flex-row items-center space-x-1">
                        <input type="checkbox"
                               id="notifEvent"
                               name="notifEvenement"
                               checked={formData.notifEvenement || false}
                               onChange={handleChange}
                        />
                        <label htmlFor="notifEvent">Être notifié(e) des prochains évenements ?</label>
                    </span>
                <span className="flex flex-row items-center space-x-1">
                        <input type="checkbox"
                               id="notifOffre"
                               name="notifOffre"
                               checked={formData.notifOffre || false}
                               onChange={handleChange}
                        />
                        <label htmlFor="notifOffre">Être notifié(e) des prochaines offres ?</label>
                    </span>
            </div>
            <div className="flex flex-row justify-between space-x-3">
                <button
                    type="button"
                    onClick={handleDelete}
                    className="px-5 py-3 rounded-lg border border-red-500 text-red-500 hover:text-white hover:bg-red-500">Supprimer
                    votre compte
                </button>
                <button type="button"
                        onClick={handleSave}
                        className="px-5 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600">Enregistrer
                </button>
            </div>
        </div>
    );
}


export default function ProfilePage(): JSX.Element | null {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

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
            <NavBar user={user} />
            <div className="w-full flex items-center justify-center">
                <ProfileEdit user={user} />
            </div>
        </div>
    );
}