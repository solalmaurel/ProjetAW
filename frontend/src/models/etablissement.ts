import { Adresse } from './adresse'; // Assurez-vous que le chemin d'importation est correct
//import { User } from './user'; 

export interface Etablissement {
    idEtablissement: number | null;
    nom: string;
    //users?: User[]; 
    adresse?: Adresse; 
}

const SPRING_API = process.env.REACT_APP_SPRING_URL_ENDPOINT;

const createEtablissement = async (etablissement: Etablissement): Promise<any> => {
    const url = `${SPRING_API}/etablissement/create`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        cache: "no-store",
        body: JSON.stringify(etablissement)
    });

    return await response.json();
};

const getAllEtablissements = async (): Promise<Etablissement[]> => {
    const url = `${SPRING_API}/etablissement`;
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

const getEtablissementById = async (id: number): Promise<Etablissement> => {
    const url = `${SPRING_API}/etablissement/${id}`;
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

export const deleteEtablissement = async (id: number): Promise<void> => {
    const url = `${SPRING_API}/etablissement/${id}`;
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

export { createEtablissement, getAllEtablissements, getEtablissementById };
