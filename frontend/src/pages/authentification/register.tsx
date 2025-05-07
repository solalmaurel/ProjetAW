import React, { FormEvent, JSX, useState } from "react";
import { createUser, User, TypeEtude, TypeEtudeNames } from "../../models/user";
import { Link, useNavigate } from "react-router-dom";

// --- Composant DepartmentSelector extrait ---
interface DepartmentSelectorProps {
    value: TypeEtude | undefined;
    onChange: (value: TypeEtude) => void;
    id?: string;
    name?: string;
}

export const DepartmentSelector: React.FC<DepartmentSelectorProps> = ({ value, onChange, id = "department", name = "department" }) => {
    const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const numValue = Number(e.target.value);
        if (!isNaN(numValue) && numValue in TypeEtude) {
            onChange(numValue as TypeEtude);
        }
    };

    return (
        <div className="flex flex-col mt-4">
            <label htmlFor={id} className="font-semibold text-sm text-gray-700 mb-1">Département</label> {/* Label mis à jour */}
            <select
                // Classe mise à jour pour correspondre aux autres champs
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                id={id}
                name={name}
                onChange={handleDepartmentChange}
                value={value ?? ''}
                required
            >
                <option value="" disabled>Choisissez votre domaine d'étude</option>
                {Object.entries(TypeEtudeNames).map(([key, name]) => (
                    <option key={key} value={key}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
    );
};

// --- Composant principal RegisterPage ---
export default function RegisterPage(): JSX.Element {
    // --- Gestion de l'état centralisée ---
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        anneeDiplome: new Date().getFullYear().toString(),
        typeEtude: undefined as TypeEtude | undefined,
        email: "",
        password: "",
        confirmPwd: ""
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // --- Gestionnaire de changement générique ---
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // --- Gestionnaire de changement spécifique pour DepartmentSelector ---
    const handleTypeEtudeChange = (value: TypeEtude) => {
        setFormData(prevData => ({
            ...prevData,
            typeEtude: value
        }));
    };

    // --- Soumission du formulaire ---
    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        setError("");

        // --- Validation ---
        if (formData.password !== formData.confirmPwd) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }
        if (formData.typeEtude === undefined) {
            setError("Veuillez sélectionner un département.");
            return;
        }
        // --- Fin Validation ---

        setIsLoading(true); // Début du chargement

        // --- Création de l'objet User ---
        const user: User = {
            id: 0,
            nom: formData.nom,
            prenom: formData.prenom,
            email: formData.email,
            password: formData.password,
            admin: false,
            anneeDiplome: Number(formData.anneeDiplome),
            typeEtude: formData.typeEtude,
            adherent: false,
            dateCotisation: undefined,
            notifOffre: false,
            notifEvenement: false
        };

        try {
            console.log("Tentative de création de l'utilisateur :", user);
            await createUser(user);
            console.log("Utilisateur créé avec succès.");
            navigate("/profile");
        } catch (err: unknown) {
            console.error("Erreur lors de la création de l'utilisateur:", err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                console.error("L'objet capturé n'est pas une instance d'Error:", err);
                setError("Une erreur inattendue est survenue.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // --- Génération des années ---
    const currentYear = new Date().getFullYear();
    const startYear = 1990;
    const endYear = currentYear + 10;
    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

    // --- Rendu du composant ---
    return (
        <div className="w-dvw min-h-dvh flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col space-y-5 w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <div className="flex flex-row space-x-4 items-center mb-4">
                    <Link to="/" className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <h1 className="font-bold text-2xl text-gray-900">S'inscrire</h1>
                </div>

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    {/* Champ Prénom */}
                    <div className="flex flex-col">
                        <label htmlFor="prenom" className="font-semibold text-sm text-gray-700 mb-1">Prénom</label>
                        <input
                            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="text"
                            id="prenom"
                            name="prenom"
                            placeholder="Votre Prénom"
                            value={formData.prenom}
                            onChange={handleChange}
                            required
                            disabled={isLoading} // Désactiver pendant le chargement
                        />
                    </div>

                    {/* Champ Nom */}
                    <div className="flex flex-col">
                        <label htmlFor="nom" className="font-semibold text-sm text-gray-700 mb-1">Nom</label>
                        <input
                            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="text"
                            id="nom"
                            name="nom"
                            placeholder="Votre nom"
                            value={formData.nom}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    {/* Sélecteur Année */}
                    <div className="flex flex-col">
                        <label htmlFor="anneeDiplome" className="font-semibold text-sm text-gray-700 mb-1">Année de diplôme (prévue)</label>
                        <select
                            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            id="anneeDiplome"
                            name="anneeDiplome"
                            value={formData.anneeDiplome}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Utilisation du composant DepartmentSelector extrait */}
                    <DepartmentSelector
                        id="typeEtude"
                        name="typeEtude" // Pas directement utilisé par handleChange mais bon à garder pour la cohérence
                        value={formData.typeEtude}
                        onChange={handleTypeEtudeChange}
                        // disabled={isLoading} // Ajouter disabled ici si nécessaire
                    />

                    {/* Champ Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-semibold text-sm text-gray-700 mb-1">Adresse e-mail</label>
                        <input
                            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Votre adresse e-mail"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    {/* Champ Mot de passe */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-semibold text-sm text-gray-700 mb-1">Mot de passe</label>
                        <input
                            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Votre mot de passe"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={8}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Champ Confirmer Mot de passe */}
                    <div className="flex flex-col">
                        <label htmlFor="confirmPwd" className="font-semibold text-sm text-gray-700 mb-1">Confirmer le mot de passe</label>
                        <input
                            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="password"
                            id="confirmPwd"
                            name="confirmPwd"
                            placeholder="Confirmer le mot de passe"
                            value={formData.confirmPwd}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    {/* Affichage des erreurs */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm" role="alert">
                            {error}
                        </div>
                    )}

                    {/* Bouton de soumission */}
                    <button
                        className={`w-full text-white font-semibold rounded-lg text-sm px-5 py-2.5 text-center transition duration-150 ease-in-out ${
                            isLoading
                                ? 'bg-gray-400 cursor-not-allowed' // Style désactivé
                                : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300' // Style normal
                        }`}
                        type="submit"
                        disabled={isLoading} // Désactiver le bouton pendant le chargement
                    >
                        {isLoading ? 'Inscription en cours...' : "S'inscrire"} {/* Texte dynamique */}
                    </button>

                    {/* Lien vers la page de connexion */}
                    <div className="text-sm text-center text-gray-600">
                        Vous avez déjà un compte ?{' '}
                        <Link to="/login" className={`font-medium underline underline-offset-2 ${isLoading ? 'text-gray-400 pointer-events-none' : 'text-blue-600 hover:text-blue-500'}`}>
                            Se connecter
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
