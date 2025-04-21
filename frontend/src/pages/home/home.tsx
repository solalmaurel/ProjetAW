import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-white text-white p-4 flex justify-between">
                <h1 className="text-2xl text-[#2196F3] font-bold">Étudiants Connectés</h1>
                <nav className="flex text-[#023047] items-center space-x-3">
                    <a href={"/"}>Accueil</a>
                    <a href={"/"}>Forum</a>
                    <a href={"/"}>Activités</a>
                    <a href={"/"}>Calendrier</a>
                    <div className="flex items-center space-x-3">
                        <a href={"/login"}>Se connecter</a>
                        <a href={"/register"}>S'inscrire</a>
                    </div>
                </nav>
            </header>
            <main className="bg-[#F6F6F6] flex-1 p-4">
                <p className="text-gray-700">Bienvenue sur Étudiants Connectés</p>
                <p className="text-gray-700">La plateforme où les étudiants s’entraident et partagent leurs
                    expériences</p>
            </main>
            <footer className="bg-[#171717] p-4 text-center">
                <p className="text-white">Projet conçu et réalisé par Solal MAUREL, Daphné NAVRATIL, Alexandre PERROT et
                    Pierre SAUSSEREAU</p>
            </footer>
        </div>
    );
};

export default HomePage;