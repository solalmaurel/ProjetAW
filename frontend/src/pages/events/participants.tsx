import { JSX } from 'react/jsx-runtime';

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllParticipants } from "../../models/evenement";
import { User } from "../../models/user";

export default function ParticipantsPage() {
    const { id } = useParams<{ id: string }>();
    const [participants, setParticipants] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("Page chargée");
        console.log("ID évènement:", id);
        const fetchParticipants = async () => {
            try {
                
                const participants = await getAllParticipants(Number(id));
                console.log("Participants:", participants);

                setParticipants(participants);
                
            } catch (err: any) {
                setError("Erreur lors du chargement des participants");
            }
        };

        if (id) {
            fetchParticipants();
        }
    }, [id]);

    return (
        <div>
            <h2>Liste des participants</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {participants.map(user => (
                        <tr key={user.id}>
                            <td>{user.nom}</td>
                            <td>{user.prenom}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
