import React, { useState, useEffect } from 'react';
import { createOffer, deleteOffer, getAllOffers, Offer } from '../../models/offer';
import Footer from "../../layout/footer";
import NavBar from "../../layout/navbar";
import { JSX } from 'react/jsx-runtime';

const typeOffreValues = ['REDUCTION', 'EVENEMENT'];

export default function OfferPage(): JSX.Element {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [inputText, setInputText] = useState("");
    const [selectedType, setSelectedType] = useState<string | null>(null); 
    const [newOffer, setNewOffer] = useState<Offer>({
        idOffre: null,
        nom: '',
        lien: '',
        typeOffre: typeOffreValues[0],
        description: '',
        dateDebut: new Date(),
        dateFin: new Date(),
    });

    // Pour la création d'offres
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewOffer({
            ...newOffer,
            [name]: value,
        });
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'dateDebut' | 'dateFin') => {
        const value = new Date(e.target.value);
        setNewOffer({
            ...newOffer,
            [field]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createOffer(newOffer);
            setOffers([...offers, newOffer]);
            setShowForm(false);
            setNewOffer({
                idOffre: null,
                nom: '',
                lien: '',
                typeOffre: typeOffreValues[0],
                description: '',
                dateDebut: new Date(),
                dateFin: new Date(),
            });
        } catch (err) {
            console.error("Error submitting offer:", err);
        }
    };

    // Pour l'affichage des offres de la base de données
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const offers = await getAllOffers();
                setOffers(offers);
                setFilteredOffers(offers); 
            } catch (err) {
                console.error("Error fetching offers:", err);
            }
        };

        fetchOffers();
    }, []);

    useEffect(() => {
        let filtered = offers;

        // Pour filtrer par type d'offre
        if (selectedType) {
            filtered = filtered.filter((offer) => offer.typeOffre === selectedType);
        }

        // Pour filtrer selon le texte recherché
        if (inputText) {
            filtered = filtered.filter((offer) =>
                offer.nom.toLowerCase().includes(inputText.toLowerCase()) ||
                offer.description.toLowerCase().includes(inputText.toLowerCase())
            );
        }

        setFilteredOffers(filtered); 
    }, [inputText, selectedType, offers]);

    // Supprimer des offres
    const handleDeleteOffer = async (id: number) => {
        try {
            await deleteOffer(id);
            setOffers(prev => prev.filter(offer => offer.idOffre !== id));
        } catch (err) {
            console.error("Erreur lors de la suppression :", err);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex flex-col flex-grow p-5 w-dvw">
                <h1 className="font-semibold text-3xl">Offres disponibles</h1>
                <div className="flex flex-col space-y-8 w-full justify-center items-center mt-10">
                    <span className="flex flex-row space-x-6 w-5/6">
                        <input
                            className="border border-1 rounded-lg p-5 w-full"
                            type="text"
                            placeholder="Rechercher une offre"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)} 
                        />
                        <select
                            className="border border-1 rounded-lg p-5 w-30"
                            value={selectedType || ''}
                            onChange={(e) => setSelectedType(e.target.value)} 
                        >
                            <option value="">Tous les types</option>
                            {typeOffreValues.map((value) => (
                                <option key={value} value={value}>
                                    {value === 'REDUCTION' ? 'Réduction' : 'Événement'}
                                </option>
                            ))}
                        </select>
                        <button
                            className="w-52 rounded-xl bg-blue-500 hover:bg-blue-800 text-white"
                            onClick={() => setShowForm(true)}
                        >
                            Créer une offre
                        </button>
                    </span>
                    {showForm && (
                        <form className="w-5/6 p-5 border border-1 rounded-lg" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nom de l'offre</label>
                                <input
                                    type="text"
                                    name="nom"
                                    value={newOffer.nom}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Lien de l'offre</label>
                                <input
                                    type="text"
                                    name="lien"
                                    value={newOffer.lien}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Type d'offre</label>
                                <select
                                    name="typeOffre"
                                    value={newOffer.typeOffre}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                >
                                    {typeOffreValues.map((value) => (
                                        <option key={value} value={value}>
                                            {value === 'REDUCTION' ? 'Réduction' : 'Événement'}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={newOffer.description}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Date de début</label>
                                <input
                                    type="date"
                                    name="dateDebut"
                                    value={newOffer.dateDebut.toISOString().split('T')[0]}
                                    onChange={(e) => handleDateChange(e, 'dateDebut')}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Date de fin</label>
                                <input
                                    type="date"
                                    name="dateFin"
                                    value={newOffer.dateFin.toISOString().split('T')[0]}
                                    onChange={(e) => handleDateChange(e, 'dateFin')}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Créer
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    )}
                    <span className="flex flex-row justify-between items-center w-5/6">
                        <h3 className="font-semibold text-2xl">{filteredOffers.length} offres</h3>
                        <h3 className="text-lg">Tri par le plus récent</h3>
                    </span>
                    {filteredOffers.map((offer) => (
                        <OfferCard key={offer.idOffre} offer={offer} onDelete={handleDeleteOffer} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

function OfferCard({ offer, onDelete }: { offer: Offer; onDelete: (id: number) => void }) {    
    return (
            <a href={offer.lien} className="flex flex-row border border-1 rounded-lg w-5/6 min-h-48 hover:border-black">
                <div className="w-1/6 rounded-l-lg bg-amber-300" />
                <div className="flex flex-col justify-between p-5 w-full">
                    <div>
                        <h2 className="text-2xl">{offer.nom}</h2>
                        <h3>{offer.description}</h3>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <div className="flex flex-row space-x-3">
                            <span className="bg-[#f6f6f6] px-2 rounded-sm">{offer.typeOffre}</span>
                            <span className="bg-[#f6f6f6] px-2 rounded-sm">{new Date(offer.dateDebut).toLocaleDateString()}</span>
                            <span className="bg-[#f6f6f6] px-2 rounded-sm">{new Date(offer.dateFin).toLocaleDateString()}</span>
                        </div>
                        <button className="bg-red-500 text-white border border-black rounded-full px-3 py-1.5 hover:bg-black hover:text-red"
                            onClick={(e) => {
                                e.preventDefault(); // pour éviter le rediriger vers offer.lien
                                onDelete(offer.idOffre!);
                            }}>
                            Supprimer
                        </button>
                    </div>
    
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-[#7f7f7f]">Postée le {new Date(offer.dateDebut).toLocaleDateString()}</p>
                        <a
                            href={offer.lien}
                            className="border border-1 border-black rounded-full px-3 py-1.5 hover:bg-black hover:text-white text-center"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Voir l'offre
                        </a>
                    </div>
                </div>
            </a>
    );
}
