
export enum TypeEtude {
    Informatique = 0,
    Maths = 1,
    Mecanique = 2,
    Physique = 3,
    Chimie = 4,
    Biologie = 5,
    SciencesDeLaTerre = 6,
    Economie = 7,
    Gestion = 8,
    Litterature = 9,
    Droit = 10,
    Medecine = 11,
    Pharmacie = 12,
    SciencesPolitiques = 13,
    Sociologie = 14,
    Psychologie = 15
}

export const TypeEtudeNames: { [key in TypeEtude]: string } = {
    [TypeEtude.Informatique]: 'Informatique',
    [TypeEtude.Maths]: 'Maths',
    [TypeEtude.Mecanique]: 'Mecanique',
    [TypeEtude.Physique]: 'Physique',
    [TypeEtude.Chimie]: 'Chimie',
    [TypeEtude.Biologie]: 'Biologie',
    [TypeEtude.SciencesDeLaTerre]: 'Sciences de la Terre',
    [TypeEtude.Economie]: 'Economie',
    [TypeEtude.Gestion]: 'Gestion',
    [TypeEtude.Litterature]: 'Littérature',
    [TypeEtude.Droit]: 'Droit',
    [TypeEtude.Medecine]: 'Médecine',
    [TypeEtude.Pharmacie]: 'Pharmacie',
    [TypeEtude.SciencesPolitiques]: 'Sciences Politiques',
    [TypeEtude.Sociologie]: 'Sociologie',
    [TypeEtude.Psychologie]: 'Psychologie'
};

export interface User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    isAdmin: boolean;
    anneeDiplome: number;
    typeEtude: TypeEtude;
    isAdherent: boolean;
    dateCotisation: Date | undefined;
    notifOffre: boolean;
    notifEvenement: boolean;
}

const SPRING_API = process.env.REACT_APP_SPRING_URL_ENDPOINT;

const createUser = async (user: User): Promise<any> => {
    const url = `${SPRING_API}/user/create`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        cache: "no-store",
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        if(response.status === 409) {
            throw new Error('Email existe déjà !');
        }

        throw new Error('Unknown error');
    }

    return response;
};

const updateUser = async (user: User): Promise<any> => {
    const url = `${SPRING_API}/user/update`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        cache: "no-store",
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        if(response.status === 404) {
            throw new Error('Utilisateur inconnu !');
        }

        throw new Error('Unknown error');
    }

    return response;
}

const deleteUser = async (user: User): Promise<any> => {
    const url = `${SPRING_API}/user/delete`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        cache: "no-store",
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        if(response.status === 404) {
            throw new Error('Utilisateur supprimé !');
        }
        throw new Error('Unknown error');
    }

    return response;
}

const findUserByCredentials = async (username: string, password: string): Promise<User> => {
    const url = `${SPRING_API}/user/login`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password }),
        cache: "no-store",
    });

    if (!response.ok) {
        if(response.status === 404) {
            throw new Error('Utilisateur inconnu');
        }

        if(response.status === 401) {
            throw new Error('Mot de passe incorrect');
        }

        if(response.status === 401) {
            throw new Error('Mot de passe incorrect');
        }

        throw new Error('Unknown error');
    }

    return await response.json();
};

export { createUser, updateUser, deleteUser, findUserByCredentials }