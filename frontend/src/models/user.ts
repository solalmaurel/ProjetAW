export interface User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    isAdmin: boolean;
    anneeDiplome: number;
    typeEtude: string;
    isAdherent: boolean;
    dateCotisation: Date | undefined;
    notifOffre: boolean;
    notifEvenement: boolean;
}

const SPRING_API = process.env.SPRING_URL_ENDPOINT;

const createUser = async (user: User) : Promise<string> => {

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

    return await response.json();

}

const findUserById = async (id: number) : Promise<User> => {

    const url = `${SPRING_API}/user/${id}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        cache: "no-store",
    });

    return await response.json();
}

export { createUser, findUserById }