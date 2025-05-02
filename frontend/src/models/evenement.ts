import { User } from './user'; 

export interface Evenement {
    idEvenement: number | null;
    isOnline: boolean;
    dateDebut: Date; 
    dateFin: Date;   
    theme: string;     
    prixNormal: number;
    prixAdherent: number;
    description: string;
    adresse?: string;  // A revoir peut être, et peut dire que pas d'adresse si evenement online par exemple
    utilisateurs?: User[]; // Utilisez l'interface User pour les utilisateurs? et pas forcemment d'inscrits donc pas obligatoire aussi?
}

const SPRING_API = process.env.REACT_APP_SPRING_URL_ENDPOINT;

const createEvenement = async (evenement: Evenement): Promise<any> => {
    const url = `${SPRING_API}/evenement/create`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        cache: "no-store",
        body: JSON.stringify(evenement)
    });

    return await response.json();
};

const getAllEvenements = async (): Promise<Evenement[]> => {
    const url = `${SPRING_API}/evenement`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        cache: "no-store",
    });

    return await response.json();
};


export const deleteEvenement = async (id: number): Promise<void> => {
    const url = `${SPRING_API}/evenement/${id}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        cache: "no-store",
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Erreur lors de la suppression (code ${response.status}): ${errorData.message || 'inconnue'}`);
    }
};

export { createEvenement, getAllEvenements };
