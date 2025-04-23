import React from 'react';
import Footer from '../../layout/footer';
import NavBar from '../../layout/navbar';

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar/>
            <main className="flex-1 p-4">
                <p className="text-gray-700">Bienvenue sur Entraide Étudiante</p>
                <p className="text-gray-700">La plateforme où les étudiants s’entraident et partagent leurs
                    expériences</p>
            </main>
            <Footer/>
        </div>
    );
};

export default HomePage;