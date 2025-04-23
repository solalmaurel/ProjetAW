import {JSX} from "react";
import {Offer} from "../../models/offer";

export default function OfferPage(): JSX.Element {
    const [offers, setOffers] = useState<Offer[]>([]);
    //const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get('/offre');
                setOffers(response.data);
                //setLoading(false);
            } catch (err) {
                setError('Erreur lors de la récupération des offres');
                //setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    //if (loading) {
    //    return <div>Chargement...</div>;
    //}

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-5 w-dvw">
            <h1 className="font-semibold text-3xl">Offres disponible</h1>
            <div className="flex flex-col space-y-8 w-full justify-center items-center mt-10">
                <span className="flex flex-row space-x-6 w-5/6">
                    <input className="border border-1 rounded-lg p-5 w-full" type="text" placeholder="Rechercher une offre"/>
                    <button className="w-52 rounded-xl bg-blue-600 text-white">Créer une offre</button>
                </span>
                <span className="flex flex-row justify-between items-center w-5/6">
                    <h3 className="font-semibold text-2xl">3 offres</h3>
                    <h3 className="text-lg">Tri par le plus récent</h3>
                </span>
                {offers.map((offer) => (
                    <OfferCard key={offer.idOffre} offer={offer} />
                ))}
            </div>
        </div>
    );
}

function OfferCard({offer} : {offer : Offer}) {
    return (
        <a href={offer.lien} className="flex flex-row border border-1 rounded-lg w-5/6 min-h-48 hover:border-black">
            <div className="w-1/6 rounded-l-lg bg-amber-300" />
            <div className="flex flex-col justify-between p-5 w-full">
                <div>
                    <h2 className="text-2xl">{offer.nom}</h2>
                    <h3>{offer.description}</h3>
                </div>
                <div className="flex flex-row space-x-3">
                    <span className="bg-[#f6f6f6] px-2 rounded-sm">{offer.typeOffre}</span>
                    <span className="bg-[#f6f6f6] px-2 rounded-sm">{new Date(offer.dateDebut).toLocaleDateString()}</span>
                    <span className="bg-[#f6f6f6] px-2 rounded-sm">{new Date(offer.dateFin).toLocaleDateString()}</span>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <p className="text-[#7f7f7f]">Postée le {new Date(offer.dateDebut).toLocaleDateString()}</p>
                    <button className="border border-1 border-black rounded-full px-3 py-1.5 hover:bg-black hover:text-white">
                        Voir l'offre
                    </button>
                </div>
            </div>
        </a>
    );
}