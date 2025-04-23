import { JSX } from "react";
import { Offer } from "../../models/offer";
import NavBar from "../../layout/navbar";
import Footer from "../../layout/footer";

export default function OfferPage(): JSX.Element {

    //TODO: a remplacer par les données qu'on recupère en base de donnée
    const dummyOffer: Offer = {
        id: 1,
        nom: "blabla",
        description: "On recrute, venez svp",
        type: "Stage",
        entreprise: "Airbus",
        lieu: "Blagnac - 31",
        link: "https://ag.wd3.myworkdayjobs.com/fr-CA/Airbus/details/Aviation-Engineer---Cabin_JR10296276-1",
        duree: "6 mois",
        creation: new Date()
    }

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex flex-col flex-grow p-5 w-dvw">
                <h1 className="font-semibold text-3xl">Offres disponible</h1>
                <div className="flex flex-col space-y-8 w-full justify-center items-center mt-10">
                    <span className="flex flex-row space-x-6 w-5/6">
                        <input className="border border-1 rounded-lg p-5 w-full" type="text" placeholder="Rechercher une offre" />
                        <button className="w-52 rounded-xl bg-blue-500 hover:bg-blue-800 text-white">Créer une offre</button>
                    </span>
                    <span className="flex flex-row justify-between items-center w-5/6">
                        <h3 className="font-semibold text-2xl">3 offres</h3>
                        <h3 className="text-lg">Tri par le plus récent</h3>
                    </span>
                    <OfferCard offer={dummyOffer} />
                </div>
            </div>
            <Footer />
        </div>
    );
}

function OfferCard({ offer }: { offer: Offer }) {
    return (
        <a href={offer.link} className="flex flex-row border border-1 rounded-lg w-5/6 min-h-48 hover:border-black">
            <div className="w-1/6 rounded-l-lg bg-amber-300" />
            <div className="flex flex-col justify-between p-5 w-full">
                <div>
                    <h2 className="text-2xl">{offer.nom}</h2>
                    <h3>{offer.entreprise}</h3>
                </div>
                <div className="flex flex-row space-x-3">
                    <span className="bg-[#f6f6f6] px-2 rounded-sm">{offer.lieu}</span>
                    <span className="bg-[#f6f6f6] px-2 rounded-sm">{offer.type}</span>
                    <span className="bg-[#f6f6f6] px-2 rounded-sm">{offer.duree}</span>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <p className="text-[#7f7f7f]">Postée le {offer.creation.toLocaleDateString()}</p>
                    <button
                        className="border border-1 border-black rounded-full px-3 py-1.5 hover:bg-black hover:text-white">Voir
                        l'offre
                    </button>
                </div>
            </div>
        </a>
    );
}