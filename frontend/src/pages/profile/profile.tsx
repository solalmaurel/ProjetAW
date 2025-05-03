import React, {JSX} from "react";
import {User} from "../../models/user";
import {useAuth} from "../../context/AuthContext";

export default function ProfilePage(): JSX.Element {

    //TODO: a remplacer avec les données backend
    const dummyUser: User = {
        id: 1,
        nom: "Perrot",
        prenom: "Alexandre",
        email: "alexandre.perrot54@proton.me",
        password: "unmotdepassesecurise",
        isAdmin: true,
        anneeDiplome: 2,
        typeEtude: 0,
        isAdherent: false,
        dateCotisation: undefined,
        notifOffre: false,
        notifEvenement: true
    };

    return (
        <div className="w-dvw min-h-dvh flex flex-row">
            <NavBar user={dummyUser}/>
            <div className="w-full flex items-center justify-center">
                <ProfileEdit user={dummyUser}/>
            </div>
        </div>
    );
}

function NavBar({user}: { user: User }) {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/';
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
                    <a href="/profile" className="font-semibold">Historique de paiement</a>
                </span>
                { user.isAdmin && <>
                    <hr/>
                    <span className="flex flex-row items-center space-x-3 p-2 rounded-lg">
                        <div className="bg-green-300 rounded-full w-6 h-6"/>
                        <a href="/profile" className="font-semibold">Gérer les comptes</a>
                    </span>
                    <span className="flex flex-row items-center space-x-3 p-2 rounded-lg">
                    <div className="bg-green-300 rounded-full w-6 h-6"/>
                    <a href="/profile" className="font-semibold">Gérer les offres</a>
                    </span>
                    <span className="flex flex-row items-center space-x-3 p-2 rounded-lg">
                    <div className="bg-green-300 rounded-full w-6 h-6"/>
                    <a href="/profile" className="font-semibold">Gérer les évenements</a>
                    </span>
                </> }
            </div>
            <div className="flex flex-col h-full justify-end">
                <span className="flex flex-row items-center space-x-3 p-2 rounded-lg">
                    <div className="bg-red-300 rounded-full w-6 h-6" />
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="font-semibold cursor-pointer"
                        bg-transparent border-none p-0 text-current
                    >
                    Se déconnecter
                   </button>
              </span>
            </div>

        </nav>
    );
}

function ProfileEdit({user}: { user: User }) {

    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        console.log("SAVE ACCOUNT");
        //TODO: faire la logique du save account
    }

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        console.log("DELETE ACCOUNT");
        //TODO: faire la logique du delete account
    }

    return (
        <div className="w-5/6 h-fit p-5 rounded-lg border-2 space-y-5 max-w-screen-lg">
            <h1 className="font-bold text-2xl">Informations personnelles</h1>
            <div className="flex flex-col space-y-3">
                <div className="flex flex-col space-y-1">
                    <label htmlFor="prenom" className="text-md font-semibold">Prénom</label>
                    <input className="border border-1 rounded-md px-3 py-1" type="text" name="prenom"
                           defaultValue={user.prenom}/>
                </div>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="nom" className="text-md font-semibold">Nom</label>
                    <input className="border border-1 rounded-md px-3 py-1" type="text" name="nom"
                           defaultValue={user.nom}/>
                </div>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="email" className="text-md font-semibold">Adresse e-mail</label>
                    <input className="border border-1 rounded-md px-3 py-1" type="email" name="email"
                           defaultValue={user.email}/>
                </div>
            </div>
            <hr className="border-gray-300"/>
            <div className="flex flex-col space-y-3">
                <h2 className="font-bold text-lg">Votre formation</h2>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="etablissement" className="text-md font-semibold">Établissement</label>
                    <input className="border border-1 rounded-md px-3 py-1" type="text" name="etablissement"/>
                </div>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="diplome" className="text-md font-semibold">Diplôme</label>
                    <input className="border border-1 rounded-md px-3 py-1" type="text" name="diplome"
                           defaultValue={user.typeEtude}/>
                </div>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="annee" className="text-md font-semibold">Année</label>
                    <SelectYear user={user}/>
                </div>
            </div>
            <hr className="border-gray-300"/>
            <div className="flex flex-col space-y-3">
                <h2 className="font-bold text-lg">Vos notifications</h2>
                <span className="flex flex-row space-x-1">
                        <input type="checkbox" name="notifEvent" defaultChecked={user.notifEvenement}/>
                        <label htmlFor="notifEvent">Être notifié(e) des prochains évenements ?</label>
                    </span>
                <span className="flex flex-row space-x-1">
                        <input type="checkbox" name="notifOffre" defaultChecked={user.notifOffre}/>
                        <label htmlFor="notifOffre">Être notifié(e) des prochaines offres ?</label>
                    </span>
            </div>
            <div className="flex flex-row justify-between space-x-3">
                <button
                    type="submit"
                    onClick={handleDelete}
                    className="px-5 py-3 rounded-lg border border-red-500 hover:text-white hover:bg-red-500">Supprimer
                    votre compte
                </button>
                <button type="submit"
                        onClick={handleSave}
                        className="px-5 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600">Enregistrer
                </button>
            </div>
        </div>
    );
}

function SelectYear({user}: { user: User }) {
    return (
        <select className="border border-1 bg-white rounded-md px-3 py-1.5" name="annee"
                defaultValue={user.anneeDiplome}>
            <option value="1">1ère année</option>
            <option value="2">2ème année</option>
            <option value="3">3ème année</option>
            <option value="4">4ème année</option>
            <option value="5">5ème année</option>
            <option value="6">6ème année</option>
            <option value="7">7ème année</option>
            <option value="8">8ème année</option>
        </select>
    );
}