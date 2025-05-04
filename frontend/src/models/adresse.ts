import { Etablissement } from './etablissement'; 

export interface Adresse {
    idAdresse: number | null;
    numero: string;
    complement?: string; 
    rue: string;
    codePostal: string;
    ville: string;
    //etablissement?: Etablissement; 
    //evenements?: number[]; // Si besoin de référencer les événements, est ce que c'est nécessaire ?
}

const SPRING_API = process.env.REACT_APP_SPRING_URL_ENDPOINT;

const createAdresse = async (adresse: Adresse): Promise<any> => {
        const response = await fetch(`${SPRING_API}/adresse/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adresse),
        });
    
        // 🔍 Ajoute ceci pour voir la réponse brute
        const text = await response.text();
        console.log("Réponse brute du serveur :", text);
        
    
        try {
            const data = JSON.parse(text);
            return data;
        } catch (err) {
            console.error("Erreur lors du parsing JSON :", err);
            throw err;
        }
    };
    

const getAllAdresses = async (): Promise<Adresse[]> => {
    const url = `${SPRING_API}/adresse`;
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

const getAdresseById = async (id: number): Promise<Adresse> => {
    const url = `${SPRING_API}/adresse/${id}`;
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

export const deleteAdresse = async (id: number): Promise<void> => {
    const url = `${SPRING_API}/adresse/${id}`;
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

export { createAdresse, getAllAdresses, getAdresseById };
