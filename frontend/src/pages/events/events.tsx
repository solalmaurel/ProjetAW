import { JSX, useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Footer from "../../layout/footer";
import NavBar from "../../layout/navbar";
import { Evenement } from '../../models/evenement';
import { createEvenement, getAllEvenements, deleteEvenement } from '../../models/evenement'; 

export default function EventPage(): JSX.Element {
    const [events, setEvents] = useState<Evenement[]>([]);

    useEffect(() => {
        // Charger les événements depuis l'API lors du montage du composant
        const fetchEvents = async () => {
            const eventsData = await getAllEvenements();
            setEvents(eventsData);
        };
        fetchEvents();
    }, []);

    const handleDateClick = async (arg: any) => {
        const title = prompt('Nom de l\'événement:');
        if (title) {
            const newEvent: Evenement = {
                idEvenement: null,
                isOnline: false,
                dateDebut: arg.dateStr,
                dateFin: arg.dateStr,
                theme: '',
                prixNormal: 0,
                prixAdherent: 0,
                description: '',
                adresse: undefined,
                utilisateurs: [],
                nom: title
            };
            await createEvenement(newEvent);
            setEvents([...events, newEvent]);
        }
    };

    const handleEventClick = async (arg: any) => {
        if (window.confirm('Voulez-vous vraiment supprimer cet événement ?')) {
            await deleteEvenement(arg.event.id);
            setEvents(events.filter(event => event.idEvenement !== arg.event.id));
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex flex-col flex-grow p-5 w-dvw">
                <h1 className="font-semibold text-3xl">Événements</h1>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    events={events}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                />
            </div>
            <Footer />
        </div>
    );
}
