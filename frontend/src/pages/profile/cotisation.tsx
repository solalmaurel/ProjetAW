import {Item, TypeFacture} from "../../models/payment";
import React, {JSX} from "react";
import {useNavigate} from "react-router-dom";
import {formatDate} from "../../utils/date";

export default function CotisationWidget({dateCotisation}: { dateCotisation: Date | undefined }): JSX.Element {

    const navigate = useNavigate();

    const cotisationItem: Item = {
        itemName: "Cotisation annuelle",
        amount: 1,
        unitPrice: 9.99,
        typeFacture: TypeFacture.COTISATION,
        urlCallback: `/callback?type=${TypeFacture.COTISATION}`,
    };

    const needsCotisationPayment = !isCotisationRecent(dateCotisation);

    const handlePayment = () => {
        navigate('/payment', {state: cotisationItem});
    };


    return (
        <div className="flex flex-col space-y-1 pt-2">
            <label className="text-md font-semibold text-gray-700">Statut de la cotisation</label>
            {needsCotisationPayment ? (
                <button className="w-full md:w-auto px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
                    onClick={handlePayment}>
                    {dateCotisation ? 'Renouveler ma cotisation' : 'Payer ma cotisation'}
                </button>
            ) : (
                <div className="border border-gray-200 bg-gray-100 rounded-md px-3 py-1 text-gray-600 min-h-[38px] flex items-center">
                    ✅ À jour (Expire le {formatDate(new Date(new Date(dateCotisation!).setFullYear(new Date(dateCotisation!).getFullYear() + 1)))})
                </div>
            )}
        </div>
    );

}

const isCotisationRecent = (dateInput: string | Date | undefined | null): boolean => {
    if (!dateInput) return false;

    try {
        const cotisationDate = new Date(dateInput);
        if (isNaN(cotisationDate.getTime())) {
            return false;
        }

        const currentDate = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

        return cotisationDate >= oneYearAgo;

    } catch (error) {
        console.error("Error checking cotisation date:", error);
        return false; // Error means we can't confirm it's recent
    }
};

