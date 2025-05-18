import {JSX, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {updateUser} from "../../models/user";
import {Link} from "react-router";
import {participerEvenement} from "../../models/evenement";

export default function Callback(): JSX.Element {

    const location = useLocation();
    const navigate = useNavigate();
    const {user, login} = useAuth();

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const type = queryParams.get('type');

        if (!user) return;

        if (type === "0") {
            user.adherent = true;
            user.dateCotisation = new Date();

            updateUser(user).then(_ => {
                login(user, String(user.idUser));
                navigate('/profile');
            }).catch(reason => {
                console.error("Error during processing: " + reason);
                setError(reason);
            });

        } else if (type === "1") {
            const idEvenement = queryParams.get('idEvenement');

            if (idEvenement!) {
                const id = parseInt(idEvenement);
                participerEvenement(id, user.idUser).then(_ => {
                    login(user, String(user.idUser));
                    alert("Votre participation à l'évenement est bien enregistrée")
                    navigate(`/events`);
                }).catch(reason => {
                    console.error("Error during processing: " + reason.message);
                    setError(reason.message);
                });
            } else {
                setError("L'événement n'existe pas");
            }
        } else {
            setError("Erreur dans le callback, merci de réessayer")
        }

    }, [user, location]);

    return error === null ?
        (<div className="w-dvw h-dvh flex items-center justify-center bg-white">
            <div className="flex space-x-4">
                <span className="w-6 h-6 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-6 h-6 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-6 h-6 bg-blue-500 rounded-full animate-bounce"></span>
            </div>
        </div>)
        :
        (<div className="flex flex-col space-y-5 justify-center items-center w-dvh h-dvh">
            <h1 className="text-3xl font-bold">Une erreur est survenue...</h1>
            <h1 className="text-xl text-red-500">{error}</h1>
            <Link to={"/"} className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white">Retourner à
                l'accueil</Link>
        </div>);
}