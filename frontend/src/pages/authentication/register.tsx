import {FormEvent, JSX, useState} from "react";

export default function RegisterPage(): JSX.Element {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        console.log(email, password, confirmPwd);

        if(password !== confirmPwd) {
            setError("Les mots de passe ne correspondent pas");
        }

        //TODO: faire la logique du register
    }

    return (
        <div className="w-dvw h-dvh flex items-center justify-center">
            <div className="flex flex-col space-y-5 w-1/3">
                <div className="flex flex-row space-x-6 items-center">
                    <a href="/"><img src="/back-arrow.svg" alt="Revenir en arrière" height="24" width="24"/></a>
                    <h1 className="font-bold text-3xl">S'inscrire</h1>
                </div>
                <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <span className="font-semibold">Adresse e-mail</span>
                        <input className="border border-[#adaba8] px-3 py-2 rounded-md" type="email" id="email"
                               name="email" placeholder="Votre adresse e-mail" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold">Mot de passe</span>
                        <input className="border border-[#adaba8] px-3 py-2 rounded-md" type="password" id="password"
                               name="password" placeholder="Votre mot de passe" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold">Confirmer le mot de passe</span>
                        <input className="border border-[#adaba8] px-3 py-2 rounded-md" type="password" id="confirm"
                               name="confirm" placeholder="Confirmer le mot de passe" onChange={(e) => setConfirmPwd(e.target.value)} />
                    </div>

                    {error ? <div className="bg-red-300 text-gray-800 text-sm p-3 rounded-md">
                        {error}
                    </div> : null}

                    <button className="text-white bg-[#0084FF] px-2 py-3 rounded-lg font-semibold"
                            type="submit">S&apos;inscrire
                    </button>
                    <div className="flex flex-col items-center">
                        Vous avez déjà un compte ?
                        <a href="/login" className="text-[#0084FF] underline underline-offset-2">Se connecter</a>
                    </div>
                </form>
            </div>
        </div>
    );
}