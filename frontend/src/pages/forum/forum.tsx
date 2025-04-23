import { JSX } from "react";
import NavBar from "../../layout/navbar";
import Footer from "../../layout/footer";

export default function ForumPage(): JSX.Element {

    return (

        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="p-5 flex flex-col flex-grow space-y-3">
                <span className="flex flex-row space-x-6">
                    <input className="border border-1 rounded-lg p-3 w-full" type="text" placeholder="Rechercher une discussion" />
                    <button className="text-nowrap p-3 rounded-lg bg-blue-500 hover:bg-blue-800 text-white">Créer un nouveau post</button>
                </span>
                <DiscussionPreview />
                <DiscussionPreview />
                <DiscussionPreview />
            </div>
            <Footer />
        </div>

    );
}

function DiscussionPreview(): JSX.Element {

    return (
        <a href="/forum/discussion" className="bg-blue-50 hover:bg-blue-100 p-3 rounded-lg flex flex-col space-y-2">
            <div className="flex flex-row justify-between">
                <span className="flex flex-row space-x-2 items-center">
                    <div className="bg-yellow-400 w-8 h-8 rounded-full" />
                    <p className="text-lg font-semibold">Kizyow</p>
                </span>
                <div className="text-right">
                    <p className="text-gray-500">Postée le {new Date().toLocaleDateString()}</p>
                    <p className="text-gray-500">5 réponses</p>
                </div>
            </div>
            <h1 className="text-xl font-semibold">Error: ArrayOutOfBounds. How to resolve? [duplicate]</h1>
            <div className="flex flex-row space-x-3">
                <span className="bg-gray-200 w-fit px-2 rounded-lg">Lycée</span>
                <span className="bg-gray-200 w-fit px-2 rounded-lg">Terminal</span>
                <span className="bg-gray-200 w-fit px-2 rounded-lg">Mathématiques</span>
            </div>
        </a>
    );
}