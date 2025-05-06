import {ChangeEvent, JSX, useState} from "react";

export default function PaymentPage(): JSX.Element {

    const [numCC, setNumCC] = useState<string>("")

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setNumCC(e.currentTarget.value);
    }

    const classNumCC = !isCreditCardValid(numCC) ? "border rounded-md bg-red-200 px-3 py-1" : "border rounded-md px-3 py-1";

    return (
        <div className="w-dvw h-dvh flex flex-row p-10">
            <div className="w-1/2">
                <a href="/"><img src="/back-arrow.svg" alt="Revenir en arrière" height="16" width="16"/></a>
                <h1>99.99€</h1>
                <h1>TTC 109.99€</h1>
                <h1>Total : 109.99€</h1>
            </div>
            <div className="w-1/2 px-10 border-l">
                <h1 className="text-2xl">Payer avec votre carte bancaire</h1>
                <form className="flex flex-col space-y-5 mt-10">
                    <div className="flex flex-col">
                        <label htmlFor="email">Votre adresse e-mail</label>
                        <input className="border rounded-md px-3 py-1" type="email" name="email"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="cb">Carte bancaire</label>
                        <div className="relative">
                            <input
                                className={`${classNumCC} w-full pr-10`}
                                type="text"
                                name="numcard"
                                placeholder="1234 1234 1234 1234"
                                onChange={handleOnChange}
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
                            <input className="border rounded-md px-3 py-1 w-1/2" type="text" name="expcard"
                                   placeholder="MM / YY"/>
                            <input className="border rounded-md px-3 py-1 w-1/2" type="password" name="cvc_card"
                                   placeholder="CVC"/>
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="name">Nom sur la carte</label>
                        <input className="border rounded-md px-3 py-1" type="text" placeholder="John Doe"/>
                    </div>

                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-lg w-full">Payer
                    </button>
                </form>
            </div>
        </div>
    );
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