import { User } from './user';
import { Adresse } from './adresse';

export interface Evenement {
    idEvenement: number | null;
    nom: string;
    isOnline: boolean;
    dateDebut: Date; 
    dateFin: Date;   
    theme: string;     
    prixNormal: number;
    prixAdherent: number;
    description: string;
    lien: string;
    adresse?: Adresse;  
    utilisateurs?: User[]; 
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

export const participerEvenement = async (idEvenement: number, idUser: number): Promise<any> => {
    const url = `${SPRING_API}/participe`;
    const params = new URLSearchParams();
    params.append('idEvenement', idEvenement.toString());
    params.append('idUser', idUser.toString());

    const response = await fetch(`${url}?${params.toString()}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        cache: "no-store"
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
    }

    return await response.json();
};

export { createEvenement, getAllEvenements };
