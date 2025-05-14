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
            <h1 className="text-2xl"> Liste des participants </h1>
            <style>
                {`
                    .styled-table {
                        border-collapse: collapse;
                        margin: 25px 0;
                        font-size: 0.9em;
                        font-family: sans-serif;
                        min-width: 400px;
                        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
                    }
                    .styled-table thead tr {
                        background-color: #1E90FF;
                        color: #ffffff;
                        text-align: left;
                    }
                    .styled-table th,
                    .styled-table td {
                        padding: 12px 15px;
                    }
                    .styled-table tbody tr {
                        border-bottom: 1px solid #dddddd;
                    }
                    .styled-table tbody tr:nth-of-type(even) {
                        background-color: #f3f3f3;
                    }
                    .styled-table tbody tr:last-of-type {
                        border-bottom: 2px solid #1E90FF;
                    }
                    .styled-table tbody tr.active-row {
                        font-weight: bold;
                        color:solid #1E90FF;
                    }
                `}
            </style>
            <table className="styled-table">
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