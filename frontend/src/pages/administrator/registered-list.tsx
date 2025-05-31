import { JSX } from 'react/jsx-runtime';

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllUsers, User } from "../../models/user";
import Navbar from '../../layout/navbar';

export default function RegisteredPage() {
    const [registered, setRegistered] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const registered = await getAllUsers();
                setRegistered(registered);
            } catch (err) {
                setError("Erreur lors du chargement des inscrits");
            }
        };

        fetchUsers();
    }, []);

     return (
        <div className="flex flex-col min-h-screen">

            <Navbar />
                <div className="flex flex-col flex-grow p-5 w-dvw">

            <h1 className="font-semibold text-3xl">Liste des inscrits</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                        color: #1E90FF;
                    }
                `}
            </style>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Année de Diplôme</th>
                        <th>Type d'Étude</th>
                        <th>Adhérent</th>
                        <th>Date de Cotisation</th>
                        <th>Notifications Offres</th>
                        <th>Notifications Événements</th>
                    </tr>
                </thead>
                <tbody>
                    {registered.map(user => (
                        <tr key={user.idUser}>
                            <td>{user.nom}</td>
                            <td>{user.prenom}</td>
                            <td>{user.email}</td>
                            <td>{user.admin ? 'Oui' : 'Non'}</td>
                            <td>{user.anneeDiplome}</td>
                            <td>{user.typeEtude}</td>
                            <td>{user.adherent ? 'Oui' : 'Non'}</td>
                            <td>{user.dateCotisation ? new Date(user.dateCotisation).toLocaleDateString() : 'N/A'}</td>
                            <td>{user.notifOffre ? 'Oui' : 'Non'}</td>
                            <td>{user.notifEvenement ? 'Oui' : 'Non'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
}