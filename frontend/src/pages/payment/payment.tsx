import {ChangeEvent, JSX, useState} from "react";
import {Link} from "react-router";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {updateUser} from "../../models/user";

interface Item {
    itemName: string;
    amount: number;
    unitPrice: number;
}

export default function PaymentPage(): JSX.Element {

    const navigate = useNavigate();
    const {user, login} = useAuth();

    const dummyItem: Item = {
        itemName: "Cotisation annuelle",
        amount: 1,
        unitPrice: 9.99
    };

    const [paymentDetails, setPaymentDetails] = useState({
        numCC: "",
        expire_date: "",
        cvc: ""
    });

    const [isProcessing, setIsProcessing] = useState(false);

    const classNumCC = (!isCreditCardValid(paymentDetails.numCC) &&
        paymentDetails.numCC.length > 0) ? "bg-red-200" : undefined;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        let formattedValue = value;

        if (name === "cvc") {
            if (value.length > 3) {
                return; // Ignore values longer than 3 characters for CVC
            }
        }

        if (name === "expire_date") {
            // Remove any non-digit characters except the slash
            formattedValue = value.replace(/[^0-9/]/g, '');

            // Add a slash after the first two digits if not already present
            if (formattedValue.length >= 2 && !formattedValue.includes("/")) {
                if (formattedValue.length === 2) formattedValue += "/";
                else formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2, formattedValue.length);
            }

            // Allow deletion of the slash
            if (formattedValue.length === 3 && value.slice(-1) === '/') {
                formattedValue = formattedValue.slice(0, 2);
            }

            // Prevent more than 5 characters (MM/YY)
            if (formattedValue.length > 5) {
                return;
            }
        }

        if (name === "numCC") {
            // Remove spaces when deleting characters
            formattedValue = value.replace(/\s/g, '');

            // Add spaces every 4 digits
            if (formattedValue.length > 16) {
                return; // Ignore values longer than 16 characters for card number
            }
            if (formattedValue.length > 0) {
                formattedValue = formattedValue.match(/.{1,4}/g)?.join(' ') || '';
            }
        }

        setPaymentDetails((prevDetails) => ({
            ...prevDetails,
            [name]: formattedValue
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        setTimeout(() => {
            user.adherent = true;
            user.dateCotisation = new Date();
            updateUser(user).then(r => {
                login(user, String(user.id));
                navigate('/profile')
            }).catch(reason => {
                setIsProcessing(false);
                console.log("Error during processing: " + reason);
            });
        }, 3000);

    }

    return (
        <div className="w-dvw h-dvh flex flex-row p-10">
            <div className="w-1/2 px-10">
                <Link to="/" className="flex flex-row items-center space-x-5">
                    <img src="/back-arrow.svg" alt="Revenir en arrière" height="16" width="16"/>
                    <h3>Revenir en arrière</h3>
                </Link>
                <h1 className="text-2xl font-bold text-[#2196F3] mt-5">Entraide Étudiante</h1>
                <div className="my-5 flex flex-col space-y-4">
                    <ItemCard item={dummyItem}/>
                </div>
                <hr/>
                <span className="my-5 flex flex-row justify-between">
                    <h1 className="font-bold">Total TTC</h1>
                    <h1>{dummyItem.amount * dummyItem.unitPrice} €</h1>
                </span>
            </div>
            <div className="w-1/2 px-10 border-l">
                <h1 className="text-2xl">Payer avec votre carte bancaire</h1>
                <form className="flex flex-col space-y-5 mt-10" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-[#595959] font-semibold">E-mail</label>
                        <input className="border rounded-md px-3 py-1" type="email" name="email"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="cb" className="text-[#595959] font-semibold">Détails de la carte</label>
                        <div className="relative">
                            <input
                                className={`${classNumCC} border rounded-t-md px-3 py-1 w-full pr-10`}
                                type="text"
                                name="numCC"
                                placeholder="1234 1234 1234 1234"
                                onChange={handleChange}
                                value={paymentDetails.numCC}
                            />
                            <img
                                src="/visa_card.svg"
                                alt="Visa Logo"
                                className="absolute right-12 top-1/2 transform -translate-y-1/2 w-6 h-6"
                            />
                            <img
                                src="/mastercard.png"
                                alt="Mastercard Logo"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
                            />
                        </div>

                        <span className="flex flex-row w-full">
                            <input className="border rounded-bl-md px-3 py-1 w-1/2" type="text" name="expire_date"
                                   placeholder="MM / YY"
                                   onChange={handleChange}
                                   value={paymentDetails.expire_date}
                            />
                            <input className="border rounded-br-md px-3 py-1 w-1/2" type="text" name="cvc"
                                   placeholder="CVC"
                                   onChange={handleChange}
                                   value={paymentDetails.cvc}
                            />
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-[#595959] font-semibold">Nom du titulaire sur la
                            carte</label>
                        <input className="border rounded-md px-3 py-1" type="text" placeholder="John Doe"/>
                    </div>

                    <button type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg w-full flex flex-row items-center justify-center">
                        {isProcessing ?
                            <svg aria-hidden="true" role="status"
                                 className="inline w-4 h-4 me-3 text-white animate-spin"
                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor"/>
                            </svg> : null}
                        Payer {dummyItem.amount * dummyItem.unitPrice} €
                    </button>
                </form>
            </div>
        </div>
    );
}

function ItemCard(data: { item: Item }): JSX.Element {
    return (
        <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row space-x-4 items-center">
                <div className="bg-amber-200 rounded-md w-10 h-10"/>
                <div className="flex flex-col">
                    <h3 className="font-semibold">{data.item.itemName}</h3>
                    <h4 className="text-sm text-gray-500">Qté {data.item.amount}</h4>
                </div>
            </div>
            <h1 className="font-bold">{data.item.unitPrice * data.item.amount} €</h1>
        </div>
    )
        ;
}

// using luhn algorithm
function isCreditCardValid(numcc: string): boolean {

    numcc = numcc.replace(/\s/g, "");

    let isnum = /^\d+$/.test(numcc);
    if (numcc.length !== 16 || !isnum) return false;

    let acc = 0;
    for (let i = 15; i >= 0; i--) {
        const unit = parseInt(numcc[i]);

        // index paire, on double le chiffre
        if (i % 2 === 0) {
            let valeur = unit * 2;
            if (valeur > 9) valeur = valeur - 9;
            acc += valeur;
        } else {
            acc += unit;
        }

    }

    return acc % 10 === 0;
}