import {User} from "./user";

export enum TypeFacture {
    COTISATION = 0,
    EVENEMENT = 1,
}

export interface Facture {
    idFacture?: number;
    user: User;
    typeFacture: TypeFacture;
    idObject?: number;
    pricePaid: number;
    dateFacture: Date | undefined;
}

export interface Item {
    itemName: string;
    amount: number;
    unitPrice: number;
    typeFacture: TypeFacture;
    idObject?: number;
    urlCallback: string;
}

const SPRING_API = process.env.REACT_APP_SPRING_URL_ENDPOINT;

const createFacture = async (facture: Facture): Promise<any> => {
    const url = `${SPRING_API}/payment/create`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        cache: "no-store",
        body: JSON.stringify(facture)
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response;
};

const getHistoryFromUser = async (idUser?: number): Promise<Facture[]> => {
    const url = `${SPRING_API}/payment/${idUser}/history`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
};

export { createFacture, getHistoryFromUser }