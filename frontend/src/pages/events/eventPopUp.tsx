import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { deleteEvenement, Evenement } from "../../models/evenement";
import { User } from "../../models/user";
import { Item, TypeFacture } from "../../models/payment";

function EventPopup({event, onClose, setEvents}: {
    event: Evenement;
    onClose: () => void;
    setEvents: React.Dispatch<React.SetStateAction<Evenement[]>>
}) {

    const handleDeleteEvent = async (id: number | null) => {
        try {
            if (id != null) {
                await deleteEvenement(id);
                setEvents(prev => prev.filter(event => event.idEvenement !== id));
            }
        } catch (err) {
            console.error("Erreur lors de la suppression :", err);
        }
    };

    const {user}: { user: User } = useAuth();
    const navigate = useNavigate();

    const handleParticiper = async (eventId: number | null) => {
        if (user == null) {
            //alert("Veuillez vous connecter pour participer à cet événement.");
            navigate('/login');
            return;
        }

        const eventItem: Item = {
            itemName: "Participation à un évenement : " + event.nom,
            amount: 1,
            unitPrice: user.adherent ? event.prixAdherent : event.prixNormal,
            typeFacture: TypeFacture.EVENEMENT,
            urlCallback: `/callback?type=${TypeFacture.EVENEMENT}&idEvenement=${event.idEvenement}`,
        };

        if (eventItem.unitPrice > 0) {
            navigate('/payment', {state: eventItem});
        } else {
            navigate(eventItem.urlCallback);
        }

    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div
                        className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {event.nom}
                        </h3>
                        <button type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={onClose}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                            {event.description}
                        </p>
                        <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                            L'évènement aura lieu
                            du {new Date(event.dateDebut).toLocaleDateString()} au {new Date(event.dateDebut).toLocaleDateString()}.
                        </p>
                        <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                            Le coût d'inscription à cet évènement est de {event.prixNormal} € pour les adhérents
                            et {event.prixAdherent} € sinon.
                        </p>
                        <p className="text-base leading-relaxed text-gray-400 dark:text-gray-400"
                           style={{fontSize: '0.8rem'}}>
                            Une fois payé, le montant ne pourra pas être remboursé, y compris en cas de désinscription,
                            ou absence.
                            Vous recevrez un mail confirmant votre participation, après payement.
                        </p>
                    </div>
                    <div
                        className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button onClick={() => handleParticiper(event.idEvenement)}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Participer
                        </button>
                        {user != null && user.admin && (
                            <button onClick={() => handleDeleteEvent(event.idEvenement)}
                                    className="ms-6 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-red-600 dark:focus:ring-red-700">Supprimer
                            </button>
                        )}
                        {user != null && user.admin && (
                        <button onClick={() => navigate(`/evenement/${event.idEvenement}/participants`)}
                                className=" ms-6 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Voir
                            les participants
                        </button>
                         )}
                        <button onClick={onClose}
                                className="py-2.5 px-5 ms-6 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Annuler
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EventPopup;