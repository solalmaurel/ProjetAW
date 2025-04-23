import { JSX } from "react";

export default function NavBar(): JSX.Element {
    return (
        <header className="bg-[#2196F3] text-white p-5 flex items-center justify-between">
            <a href="/" className="text-2xl font-bold">Entraide Étudiante</a>
            <nav className="flex items-center space-x-10 font-semibold">
                <a href={"/"}>Accueil</a>
                <a href={"/forum"}>Forum</a>
                <a href={"/events"}>Évenements</a>
                <a href={"/offers"}>Offres</a>
            </nav>
            <div className="flex items-center space-x-3 font-semibold">
                <a className="border border-1 px-3 py-2 rounded-lg hover:bg-[#1e86db]" href={"/login"}>Se connecter</a>
                <a className="border border-1 px-3 py-2 rounded-lg bg-white text-[#2196F3] hover:bg-[#ebf5ff]" href={"/register"}>S'inscrire</a>
            </div>
        </header>
    );
}