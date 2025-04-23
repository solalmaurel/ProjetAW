import { JSX } from "react";
import MessageBox, { Message } from "./message";
import NavBar from "../../layout/navbar";
import Footer from "../../layout/footer";

export default function Discussion(): JSX.Element {

    const message: Message = {
        id: 1,
        message: "Salut, est-ce que quelqu'un pourrait m'aider avec mon devoir en mathématiques ? merci",
        username: "Kizyow",
        date: new Date(),
    }

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar/>
            <div className="p-5 flex flex-col flex-grow space-y-2">
                <span className="flex flex-row justify-between">
                    <h1 className="text-2xl">Error: ArrayOutOfBounds. How to resolve? [duplicate]</h1>
                    <button className="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-800 text-white">Créer un nouveau post</button>
                </span>
                <span>Postée le 23/04/2025</span>
                <hr />
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col space-y-5 w-4/6">
                        <MessageBox message={message} />
                        <MessageBox message={message} />
                        <MessageBox message={message} />
                    </div>
                    <div className="border border-1 rounded-lg w-2/6 p-5">
                        <h1 className="font-semibold text-xl">Posts les plus récents</h1>
                        <div className="flex flex-col space-y-2 text-blue-500 mt-5">
                            <a href="/" className="hover:text-blue-800">Error: ArrayOutOfBounds.</a>
                            <a href="/" className="hover:text-blue-800">Error: ArrayOutOfBounds.</a>
                            <a href="/" className="hover:text-blue-800">Error: ArrayOutOfBounds.</a>
                            <a href="/" className="hover:text-blue-800">Error: ArrayOutOfBounds.</a>
                            <a href="/" className="hover:text-blue-800">Error: ArrayOutOfBounds.</a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
