import {FormEvent, JSX, useState} from "react";
import {findUserByCredentials, User} from "../../models/user";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

export default function LoginPage(): JSX.Element {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation(); // Pour savoir d'où vient l'utilisateur
    const { login, logout } = useAuth(); // Récupérer la fonction login du contexte

    // Déterminer où rediriger après connexion
    const from = location.state?.from?.pathname || "/profile";

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        try {
            // Vérification des identifiants
            const user : User = await findUserByCredentials(email, password);

            if (user.banned) {
                logout(); //On deconnecte l'utilisateur s'il était déjà connecté
                setError("Votre compte a été banni !! Vous avez du mal vous comporter... Envoyez un mail à pierre.saussereau@gmail.com pour vous plaindre.");
                return;
            }

            console.log(user);
            // Enregistrer l'utilisateur dans le contexte
            login(user, String(user.idUser));

            // Naviguer vers la page voulue
            navigate(from, { replace: true });

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message); // Afficher l'erreur de l'API (ex: "Identifiants invalides")
            } else {
                setError("Une erreur inconnue est survenue lors de la connexion.");
            }
        }
    };

    return (
        <div className="w-dvw h-dvh flex items-center justify-center">
            <div className="flex flex-col space-y-5 w-1/3">
                <div className="flex flex-row space-x-6 items-center">
                    <a href="/"><img src="/back-arrow.svg" alt="Revenir en arrière" height="24" width="24"/></a>
                    <h1 className="font-bold text-3xl">Se connecter</h1>
                </div>
                <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <span className="font-semibold">Adresse e-mail</span>
                        <input
                            className="border border-[#adaba8] px-3 py-2 rounded-md"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Votre adresse e-mail"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold">Mot de passe</span>
                        <input
                            className="border border-[#adaba8] px-3 py-2 rounded-md"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Votre mot de passe"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <div className="text-red-500">{error}</div>}
                    <button
                        className="text-white bg-[#0084FF] px-2 py-3 rounded-lg font-semibold"
                        type="submit"
                    >
                        Se connecter
                    </button>
                    <div className="flex flex-col items-center">
                        Vous n&apos;avez pas encore de compte ?
                        <a href="/register" className="text-[#0084FF] underline underline-offset-2">
                            Créer un compte
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}