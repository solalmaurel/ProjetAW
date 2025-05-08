import {useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Footer from "../../layout/footer";
import NavBar from "../../layout/navbar";
import { Evenement, getAllParticipants, participerEvenement } from '../../models/evenement'; 
import { User } from '../../models/user'; 
import allLocales from '@fullcalendar/core/locales-all'
import { useNavigate } from 'react-router-dom';

import { createEvenement, getAllEvenements, deleteEvenement } from '../../models/evenement'; 
import { Adresse, createAdresse, getAllAdresses } from "../../models/adresse";
import { JSX } from 'react/jsx-runtime';
import { useAuth } from '../../context/AuthContext';

const themeValues = ['SPORT',
    'LANGUES',
    'ETUDE',
    'METIERS',
    'LOISIR']

const themeColors = {
    SPORT: 'red',
    LANGUES: 'blue',
    ETUDE: 'green',
    METIERS: 'orange',
    LOISIR: 'purple'
};

export default function EventPage(): JSX.Element {
    const [events, setEvents] = useState<Evenement[]>([]);
    const [adresses, setAdresses] = useState<Adresse[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showAdresseForm, setShowAdresseForm] = useState<boolean>(false);
    const [hoveredEvent, setHoveredEvent] = useState<Evenement | null>(null);
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
    const [filteredAdresses, setFilteredAdresses] = useState<Adresse[]>([]);
    const [searchAddress, setSearchAddress] = useState<string>('');
    const [showAddressResults, setShowAddressResults] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [filteredEvents, setFilteredEvents] = useState<Evenement[]>([]);
    const [participants, setParticipants] = useState<User[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Evenement | null>(null);
    const [newEvent, setNewEvent] = useState<Evenement>({
        nom : '',
        isOnline: false,
        dateDebut: new Date(),
        dateFin: new Date(),
        theme: themeValues[0],
        prixNormal: 0,
        prixAdherent: 0,
        description: '' ,
        lien: '',
        idEvenement: null,
        adresse: undefined,
    });

    const [newAdresse, setNewAdress] = useState<Adresse>({
        numero: '',
        complement: '',
        rue: '',
        codePostal: '',
        ville: '',
        idAdresse: null,
    });

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'dateDebut' | 'dateFin') => {
            const value = new Date(e.target.value);
            setNewEvent({
                ...newEvent,
                [field]: value,
            });
        };
    
    const handleInputChangeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewEvent({
            ...newEvent,
            [name]: value,
        });
    };

    const handleInputChangeAdress = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewAdress({
            ...newAdresse,
            [name]: value,
        });
    };


    const handleSubmitEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createEvenement(newEvent);
            console.log("Adresse associée à l'événement : ", newEvent.adresse);
            console.log("A créé évènement :", newEvent);
            setEvents([...events, newEvent]);
            setShowForm(false);
            setNewEvent({
                nom : '',
                isOnline: false,
                dateDebut: new Date(),
                dateFin: new Date(),
                theme: themeValues[0],
                prixNormal: 0,
                prixAdherent: 0,
                description: '' ,
                lien: '',
                idEvenement: null,
                adresse: undefined,
            });
        } catch (err) {
            console.error("Error submitting offer:", err);
        }
    };

    const handleSubmitAdress = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createAdresse(newAdresse);
            console.log("Created event:", newAdresse);

            setAdresses([...adresses, newAdresse]);
            setShowAdresseForm(false);
            setNewAdress({
                numero: '',
                complement: '',
                rue: '',
                codePostal: '',
                ville: '',
                idAdresse: null,
            });
            setNewEvent((prev) => ({
                ...prev,
                adresse: newAdresse
            }));
        } catch (err) {
            console.error("Error submitting offer:", err);
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            const events = await getAllEvenements();
            console.log(events);
            setEvents(events);
            setFilteredEvents(events);
        };
        const fetchAdresses = async () => {
        const adressesData = await getAllAdresses();
        console.log("adressesData:", adressesData);
        setAdresses(adressesData);
        setFilteredAdresses(adressesData);
        };

        fetchEvents();
        fetchAdresses();
    }, []);

    // Est ce qu'on a besoin de faire un fetch pour les adresses aussi ?? Je sais pas...

    useEffect(() => {
            let filtered = events;
    
            if (selectedTheme) {
                filtered = filtered.filter((event) => event.theme === selectedTheme);
            }
    
            setFilteredEvents(filtered); 
        }, [selectedTheme, events]);

    useEffect(() => {
        if (searchAddress) {
            const filtered = adresses.filter(adresse =>
                `${adresse.numero} ${adresse.rue} ${adresse.codePostal} ${adresse.ville}`
                    .toLowerCase()
                    .includes(searchAddress.toLowerCase())
            );
            setFilteredAdresses(filtered);
            setShowAddressResults(true);
        } else {
            setFilteredAdresses(adresses);
            setShowAddressResults(false);
        }
    }, [searchAddress, adresses]);

        const handleDateClick = (arg: any) => {
            setNewEvent({
                ...newEvent,
                dateDebut: new Date(arg.dateStr),
                dateFin: new Date(arg.dateStr),
            });
            setShowForm(true);
        };
    
        const handleEventClick = (arg: any) => {
            const eventId = parseInt(arg.event.id);
            const event = events.find(e => e.idEvenement === eventId);
            if (event) {
                setSelectedEvent(event);
                setShowPopup(true);
            }
        };

        const handleEventMouseEnter = (arg: any) => {
            const eventId = parseInt(arg.event.id);
            const event = events.find(e => e.idEvenement === eventId);
            if (event) {
                setHoveredEvent(event);
            }
        };
    
        const handleEventMouseLeave = () => {
            setHoveredEvent(null);
        };

        const handleAddressSelect = (adresse: Adresse) => {
            setNewEvent({ ...newEvent, adresse });
            setSearchAddress('');
            setShowAddressResults(false);
        };
    

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex flex-col flex-grow p-5 w-dvw">
                <h1 className="font-semibold text-3xl">Événements</h1>
                <div className="flex flex-col space-y-8 w-full justify-center items-center mt-10">
                    <span className="flex flex-row space-x-6 w-5/6">
                        <select
                            className="border border-1 rounded-lg p-5 w-30"
                            value={selectedTheme || ''}
                            onChange={(e) => setSelectedTheme(e.target.value)}
                        >
                            <option value="">Tous les thèmes</option>
                            {themeValues.map((value) => (
                                <option key={value} value={value}>
                                    {value.charAt(0) + value.slice(1).toLowerCase()}
                                </option>
                            ))}
                        </select>
                    </span>
                    {showForm && (
                        <form className="w-5/6 p-5 border border-1 rounded-lg" onSubmit={handleSubmitEvent}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nom de l'événement</label>
                                <input
                                    type="text"
                                    name="nom"
                                    value={newEvent.nom}
                                    onChange={handleInputChangeEvent}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Événement en ligne ?
                                </label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center space-x-1">
                                    <input
                                        type="radio"
                                        name="isOnline"
                                        checked={newEvent.isOnline === true}
                                        onChange={() => setNewEvent((prev) => ({ ...prev, isOnline: true }))}
                                    />
                                    <span>Oui</span>
                                    </label>

                                    <label className="flex items-center space-x-1">
                                    <input
                                        type="radio"
                                        name="isOnline"
                                        checked={newEvent.isOnline === false}
                                        onChange={() => setNewEvent((prev) => ({ ...prev, isOnline: false }))}
                                    />
                                    <span>Non</span>
                                    </label>
                                </div>
                                </div>
                            {newEvent.isOnline && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Lien</label>
                                <input
                                    type="text"
                                    name="lien"
                                    value={newEvent.lien}
                                    onChange={handleInputChangeEvent}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div> )}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Thème</label>
                                <select
                                    name="theme"
                                    value={newEvent.theme}
                                    onChange={handleInputChangeEvent}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                >
                                    <option value="">Sélectionnez un thème</option>
                                    {themeValues.map((value) => (
                                        <option key={value} value={value}>
                                            {value.charAt(0) + value.slice(1).toLowerCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Prix Normal</label>
                                <input
                                    type="number"
                                    name="prixNormal"
                                    value={newEvent.prixNormal}
                                    onChange={handleInputChangeEvent}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Prix Adhérent</label>
                                <input
                                    type="number"
                                    name="prixAdherent"
                                    value={newEvent.prixAdherent}
                                    onChange={handleInputChangeEvent}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={newEvent.description}
                                    onChange={handleInputChangeEvent}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Date de début</label>
                                <input
                                    type="date"
                                    name="dateDebut"
                                    value={newEvent.dateDebut.toISOString().split('T')[0]}
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
                                    value={newEvent.dateFin.toISOString().split('T')[0]}
                                    onChange={(e) => handleDateChange(e, 'dateFin')}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            {!newEvent.isOnline && (
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Adresse</label>
                                    <input
                                        type="text"
                                        placeholder="Rechercher une adresse..."
                                        value={searchAddress}
                                        onChange={(e) => setSearchAddress(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                                    />
                                    {showAddressResults && (
                                        <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-48 overflow-y-auto">
                                            {filteredAdresses.length > 0 ? (
                                                filteredAdresses.map((adresse) => (
                                                    <li
                                                        key={adresse.idAdresse}
                                                        className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                                                        onClick={() => handleAddressSelect(adresse)}
                                                    >
                                                        {`${adresse.numero} ${adresse.rue}, ${adresse.codePostal} ${adresse.ville}`}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="px-3 py-2 text-gray-600">
                                                    Pas d'adresse correspondant à la recherche, veuillez en créer une.
                                                </li>
                                            )}
                                        </ul>
                                    )}
                                    {newEvent.adresse && (
                                    <div className="mt-2">
                                        <strong>Adresse sélectionnée :</strong> {newEvent.adresse.numero} {newEvent.adresse.rue}, {newEvent.adresse.codePostal} {newEvent.adresse.ville}
                                     </div>
                                    )}
                                </div>
                            )}
                            {!newEvent.isOnline && (
                            <button
                                type="button"
                                className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => setShowAdresseForm(true)}
                            >
                                Nouvelle adresse
                            </button>
                            )}
                            <div className="flex items-center justify-between mt-4">
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
                    {showAdresseForm && (
                        <form className="w-5/6 p-5 border border-1 rounded-lg" onSubmit={handleSubmitAdress}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Numéro</label>
                                <input
                                    type="text"
                                    name="numero"
                                    value={newAdresse.numero}
                                    onChange={handleInputChangeAdress}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                             </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Complément</label>
                                <input
                                    type="text"
                                    name="complement"
                                    value={newAdresse.complement}
                                    onChange={handleInputChangeAdress}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                /> 
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Rue</label>
                                <input
                                    type="text"
                                    name="rue"
                                    value={newAdresse.rue}
                                    onChange={handleInputChangeAdress}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Code Postal</label>
                                <input
                                    type="text"
                                    name="codePostal"
                                    value={newAdresse.codePostal}
                                    onChange={handleInputChangeAdress}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Ville</label>
                                <input
                                    type="text"
                                    name="ville"
                                    value={newAdresse.ville}
                                    onChange={handleInputChangeAdress}
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
                                    onClick={() => setShowAdresseForm(false)}
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    )}
                    <FullCalendar
                        locales={allLocales}
                        locale={'fr'}
                        key={filteredEvents.length}  
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        events={filteredEvents.map(event => ({
                            id: event.idEvenement?.toString() ?? '',
                            title: event.nom,
                            start: event.dateDebut,//.toISOString(),
                            end: event.dateFin,//.toISOString(),
                            color: themeColors[event.theme as keyof typeof themeColors]
                        }))}
                        height="auto"
                        dateClick={handleDateClick}
                        eventClick={handleEventClick}
                        eventMouseEnter={handleEventMouseEnter} // Ajout de l'événement de survol
                        eventMouseLeave={handleEventMouseLeave} // Ajout de l'événement de sortie de survol
                    />
                    {hoveredEvent && (
                        <div className="fixed bg-white border p-4 rounded shadow-lg z-50" style={{ top: '10px', left: '10px' }}>
                            <h2 className="font-bold pb-2" style={{ fontSize: '1.1rem' }}>{hoveredEvent.nom}</h2>
                            <p><strong>Thème:</strong> {hoveredEvent.theme}</p>
                            <p><strong>Date de début:</strong> {new Date(hoveredEvent.dateDebut).toLocaleDateString()}</p>
                            <p><strong>Date de fin:</strong> {new Date(hoveredEvent.dateFin).toLocaleDateString()}</p>
                            <p><strong>Prix Normal:</strong> {hoveredEvent.prixNormal} €</p>
                            <p><strong>Prix Adhérent:</strong> {hoveredEvent.prixAdherent} €</p>
                            <p><strong>Description:</strong> {hoveredEvent.description}</p>
                            {hoveredEvent.adresse && (
                                <p><strong>Adresse:</strong> {hoveredEvent.adresse.numero} {hoveredEvent.adresse.rue}, {hoveredEvent.adresse.codePostal} {hoveredEvent.adresse.ville}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
            {showPopup && selectedEvent && (
            <EventPopup
                event={selectedEvent}
                onClose={() => setShowPopup(false)}
                setEvents={setEvents}
            />
        )}
        </div>
    );
}

function EventPopup({ event, onClose, setEvents }: { event: Evenement; onClose: () => void; setEvents: React.Dispatch<React.SetStateAction<Evenement[]>> }) {

    const handleDeleteEvent = async (id: number | null) => {
        try {
            if (id != null){
                await deleteEvenement(id);
                setEvents(prev => prev.filter(event => event.idEvenement !== id));
            }
        } catch (err) {
            console.error("Erreur lors de la suppression :", err);
        }
    };
    
    const { user } = useAuth();
    const navigate = useNavigate();
        
        const handleParticiper = async (eventId: number | null) => {
            if (user == null) {
                //alert("Veuillez vous connecter pour participer à cet événement.");
                navigate('/login');
                return;
            }
            try {
                if (eventId != null){
                    const response = await participerEvenement(eventId, user.idUser);
                    alert(response.message);
                }
            } catch (error) {
                console.error("Erreur lors de l'inscription à l'événement:", error);
                alert("Une erreur est survenue. Veuillez réessayer.");
            }
        };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {event.nom}
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
                            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                                {event.description}
                            </p>
                            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                                L'évènement aura lieu du {new Date(event.dateDebut).toLocaleDateString()} au {new Date(event.dateDebut).toLocaleDateString()}.
                            </p> 
                            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                                Le coût d'inscription à cet évènement est de {event.prixNormal} € pour les adhérents et {event.prixAdherent} € sinon.
                            </p> 
                            <p className="text-base leading-relaxed text-gray-400 dark:text-gray-400" style={{ fontSize: '0.8rem' }}>
                                Une fois payé, le montant ne pourra pas être remboursé, y compris en cas de désinscription, ou absence.
                                Vous recevrez un mail confirmant votre participation, après payement.
                            </p>
                        </div>
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button onClick={() => handleParticiper(event.idEvenement)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Participer</button>
                            { user!=null && user.isAdmin && (
                            <button onClick={() => handleDeleteEvent(event.idEvenement)} className="ms-6 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-red-600 dark:focus:ring-red-700">Supprimer</button>
                            )}
                            <button onClick={() => navigate(`/evenement/${event.idEvenement}/participants`)} className=" ms-6 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Voir les participants</button>
                            <button onClick={onClose} className="py-2.5 px-5 ms-6 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Annuler</button>
                        </div>
                    </div>
                </div>
            </div>
    );
}
