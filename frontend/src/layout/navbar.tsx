import { JSX } from "react";
import { Link } from "react-router";
import {useAuth} from "../context/AuthContext";

export default function NavBar(): JSX.Element {
    const { isAuthenticated } = useAuth();

    return (
        <header className="bg-[#2196F3] text-white p-5 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold">Entraide Étudiante</Link>
            <nav className="flex items-center space-x-10 font-semibold">
                <Link to="/">Accueil</Link>
                <Link to="/forum">Forum</Link>
                <Link to="/events">Évenements</Link>
                <Link to="/offers">Offres</Link>
            </nav>
            <div className="flex items-center space-x-3 font-semibold">
                { isAuthenticated ? (
                    // --- CAS : Utilisateur Connecté ---
                    <>
                        <Link to="/profile" className="border border-1 px-3 py-2 rounded-lg bg-white text-[#2196F3] hover:bg-[#ebf5ff]"> {/* Lien vers la page de profil */}
                            Mon Compte
                        </Link>
                    </>
                ) : (
                    // --- CAS : Utilisateur Déconnecté ---
                    <> {/* Fragment React */}
                        <Link to="/login" className="border border-1 px-3 py-2 rounded-lg hover:bg-[#1e86db]">
                            Connexion
                        </Link>
                        <Link to="/register" className="border border-1 px-3 py-2 rounded-lg bg-white text-[#2196F3] hover:bg-[#ebf5ff]">
                            S'inscrire
                        </Link>
                    </>
                )
                }
            </div>


        </header>
    );
}