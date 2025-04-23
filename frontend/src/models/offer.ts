export interface Offer {
    idOffre: number;
    nom: string;
    lien: string;
    typeOffre: string; 
    description: string;
    dateDebut: Date;
    dateFin: Date;
    //entreprise: string| undefined; // ??? 
}

const SPRING_API = process.env.REACT_APP_SPRING_URL_ENDPOINT;

const createOffer = async (offer: Offer): Promise<any> => {
    const url = `${SPRING_API}/offre/create`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        cache: "no-store",
        body: JSON.stringify(offer)
    });

    return await response.json();
};

const getAllOffers = async (): Promise<Offer[]> => {
    const url = `${SPRING_API}/offre`;
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

const getOfferById = async (id: number): Promise<Offer> => {
    const url = `${SPRING_API}/offre/${id}`;
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

export { createOffer, getAllOffers, getOfferById };