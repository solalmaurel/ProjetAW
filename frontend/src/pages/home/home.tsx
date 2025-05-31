import React from 'react';
import Footer from '../../layout/footer';
import NavBar from '../../layout/navbar';

const HomePage: React.FC = () => {
    return (
        <div className="min-h-dvh flex flex-col">
            <NavBar/>
            <main className="flex-1">
                <div className="flex h-dvh relative">
                    <img src="/background.webp" alt="Background"
                         className="w-full h-full object-cover absolute inset-0 z-0"/>
                    <div className="relative z-10 p-4 mt-10 text-white max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl font-bold drop-shadow-sm">Du collège jusqu'au monde professionnel</h1>
                        <h3 className="text-3xl font-light mt-4 drop-shadow-lg">La plateforme où les étudiants
                            s’entraident
                            et partagent leurs expériences</h3>
                    </div>
                </div>
                <div className="bg-blue-100 py-16 px-6 w-full text-[#323c4d] flex flex-col items-center">
                    <h2 className="text-4xl font-bold mb-6">Réussir ensemble</h2>

                    <p className="text-lg mb-6">
                        Besoin d’un coup de pouce en maths, d’une relecture de votre mémoire ou simplement d’un
                        conseil pour mieux vous organiser ?<br/>
                        Ici, chaque étudiant peut poser ses questions, partager ses astuces et trouver le binôme
                        idéal pour progresser.
                    </p>

                    <h3 className="text-2xl font-semibold mb-4">Trouvez votre allié du succès</h3>
                    <ul className="list-disc list-inside space-y-3 text-lg">
                        <li>
                            <strong>Posez vos questions</strong> en quelques clics et obtenez des réponses rapides
                            d’étudiants motivés sur notre forum.
                        </li>
                        <li>
                            <strong>Partagez les bons plans</strong>
                        </li>
                        <li>
                            <strong>Échangez en groupe</strong> grâce à notre forum et nos événements.
                        </li>
                    </ul>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">Simple, rapide et gratuit</h3>
                    <p className="text-lg mb-6">
                        Inscrivez-vous en un instant, parcourez les sujets qui vous intéressent et commencez dès
                        aujourd’hui à avancer plus sereinement dans vos études.
                    </p>

                    <a href="/register"
                       className="bg-[#2196F3] hover:bg-[#1e86db] text-white p-3 mt-10 rounded-lg font-bold text-xl">Nous
                        rejoindre
                    </a>
                </div>

            </main>
            <Footer/>
        </div>
    );
};

export default HomePage;