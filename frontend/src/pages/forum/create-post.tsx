import { JSX } from "react";
import MessageBox, { Message } from "./message";
import NavBar from "../../layout/navbar";
import Footer from "../../layout/footer";

export default function CreateForm(): JSX.Element {

    const message: Message = {
        id: 1,
        message: "Salut, est-ce que quelqu'un pourrait m'aider avec mon devoir en mathématiques ? merci",
        username: "Kizyow",
        date: new Date(),
    }

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="p-5 flex flex-col flex-grow space-y-10">
                <span className="flex flex-row justify-between items-center">
                    <h1 className="text-2xl">Créer un nouveau post</h1>
                    <a href="/forum" className="px-3 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white">Annuler la création</a>
                </span>
                <hr />
                <div className="flex flex-col space-y-5 px-[10%]">
                    <h1 className="text-xl">Titre du post</h1>
                    <input type="text" className="border border-1 rounded-lg p-2" placeholder="Titre du post" />
                    <h1 className="text-xl">Description de votre post</h1>
                    <textarea className="border border-1 rounded-lg min-h-52 resize-none p-2"/>
                    <a href="/forum" className="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-800 text-white w-fit">Publier votre post</a>
                </div>
            </div>
            <Footer />
        </div>
    );
}
