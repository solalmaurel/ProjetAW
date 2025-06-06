import React, {ChangeEvent, JSX, useEffect, useState} from "react";
import {deleteUser, isUserBanned, TypeEtude, updateUser, User} from "../../models/user";
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {DepartmentSelector} from '../authentification/register';
import CotisationWidget from "./cotisation";
import { createEtablissement, Etablissement, getAllEtablissements } from "../../models/etablissement";

function NavBar({user}: { user: User }) {
    const {login, logout} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        isUserBanned(user.idUser!).then(val => {
            if(val) logout();
        }).catch(err => console.log(err));

     }, [])

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
                <span className="flex flex-row items-center space-x-3 p-2 rounded-lg">
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

function ProfileEdit({user}: { user: User }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<User>(user);
    const {login, logout} = useAuth();

    const [etablissements, setEtablissements] = useState<Etablissement[]>([]);
    const [showEtablissementResults, setShowEtablissementResults] = useState<boolean>(false);
    const [filteredEtablissements, setFilteredEtablissements] = useState<Etablissement[]>([]);
    const [searchEtablissement, setSearchEtablissement] = useState<string>(user.etablissement?.nom || '');
    const [showEtablissementForm, setShowEtablissementForm] = useState<boolean>(false);
    const [newEtablissement, setNewEtablissement] = useState<Etablissement>({
        idEtablissement: null,
        nom: '',
    });
    
    useEffect(() => {
        setFormData(user);
        setSearchEtablissement(user.etablissement?.nom || '');

        const fetchEtablissements = async () => {
            const etabData = await getAllEtablissements();
            setEtablissements(etabData);
        };

        fetchEtablissements();
    }, [user]);

    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        if (!formData) {
            console.error("Aucune donnée de formulaire à sauvegarder.");
            return;
        }
        try {
            await updateUser(formData);
            login(formData, "token");
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
        const {name, value, type} = e.target;

        if (type === 'checkbox') {
            const {checked} = e.target as HTMLInputElement;
            setFormData(prevData => ({
                ...prevData,
                [name]: checked,
            }));
        } else {
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
    const years = Array.from({length: endYear - startYear + 1}, (_, i) => startYear + i);

    const handleEtablissementSelect = (etab: Etablissement) => {
        console.log(etab);
        setFormData(prevData => ({...prevData, etablissement: etab}));
        setSearchEtablissement(etab.nom); 
        setShowEtablissementResults(false);
    };

    const handleSubmitEtablissement = async (e: React.FormEvent) => {
        e.preventDefault();
        const nomInitialSoumis = newEtablissement.nom; 

        try {
            const etablissementReponseApi = await createEtablissement(newEtablissement);

            const nomFinal = etablissementReponseApi.nom || nomInitialSoumis;
            
            const etablissementComplet: Etablissement = {
                ...etablissementReponseApi, 
                nom: nomFinal 
            };

            setEtablissements(prevEtablissements => [...prevEtablissements, etablissementComplet]);
            setFormData((prev) => ({
                ...prev,
                etablissement: etablissementComplet
            }));
            setSearchEtablissement(nomFinal);

            setShowEtablissementForm(false);
            setNewEtablissement({
                nom: '',
                idEtablissement: null,
            });
        } catch (err) {
            console.error("Error submitting etablissement:", err);
            alert("Erreur lors de la création de l'établissement.");
        }
    };

    useEffect(() => {
        const filterValue = searchEtablissement.toLowerCase();
        const filtered = etablissements.filter(etab =>
            etab.nom.toLowerCase().includes(filterValue)
        );
        setFilteredEtablissements(filtered);
    }, [searchEtablissement, etablissements]);

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
                <CotisationWidget dateCotisation={formData.dateCotisation}/>
            </div>
            <hr className="border-gray-300"/>
            <div className="flex flex-col space-y-3">
                <h2 className="font-bold text-lg">Votre formation</h2>
                <div className="flex flex-col space-y-1 relative"> 
                    <label htmlFor="etablissement" className="text-md font-semibold">Établissement</label>
                    <input
                        type="text"
                        placeholder="Rechercher un établissement..."
                            value={searchEtablissement}
                        onChange={(e) => {
                            setSearchEtablissement(e.target.value);
                            if (!showEtablissementResults) {
                                setShowEtablissementResults(true);
                            }
                        }}
                        onFocus={() => { 
                            setShowEtablissementResults(true);
                        }}
                        onBlur={() => { 
                            setTimeout(() => setShowEtablissementResults(false), 150);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {showEtablissementResults && (
                        <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-48 overflow-y-auto shadow-lg">
                            {filteredEtablissements.length > 0 ? (
                                filteredEtablissements.map((etablissement) => (
                                    <li
                                        key={etablissement.idEtablissement}
                                        className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                                        onMouseDown={() => handleEtablissementSelect(etablissement)}
                                    >
                                        {etablissement.nom}
                                    </li>
                                ))
                            ) : (
                                <li className="px-3 py-2 text-gray-600">
                                    Pas d'établissement correspondant à la recherche.
                                    <button
                                        type="button" 
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            setShowEtablissementForm(true);
                                            setShowEtablissementResults(false); 
                                        }}
                                        className="text-blue-500 hover:underline ml-1"
                                    >
                                        Créer un nouvel établissement
                                    </button>
                                </li>
                            )}
                        </ul>
                    )}
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
                    <label htmlFor="anneeDiplome" className="font-semibold text-sm text-gray-700 mb-1">Année de diplôme
                        (prévue)</label>
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
            {showEtablissementForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"> 
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Créer un nouvel établissement</h3>
                            <form onSubmit={handleSubmitEtablissement} className="mt-2 text-left">
                                <div className="mb-4">
                                    <label htmlFor="nomEtablissementModal" className="block text-sm font-medium text-gray-700">Nom de l'établissement</label> 
                                    <input
                                        type="text"
                                        name="nom"
                                        id="etablissement" 
                                        value={newEtablissement.nom}
                                        onChange={(e) => setNewEtablissement({...newEtablissement, nom: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setShowEtablissementForm(false)}
                                        className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Créer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
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
    const {user, isAuthenticated} = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
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
                <ProfileEdit user={user}/>
            </div>
        </div>
    );
}
