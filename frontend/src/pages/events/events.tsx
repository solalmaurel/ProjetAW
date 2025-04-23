import {JSX} from "react";
import Footer from "../../layout/footer";
import NavBar from "../../layout/navbar";

export default function EventPage(): JSX.Element {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex flex-col flex-grow p-5 w-dvw">
                <h1 className="font-semibold text-3xl">Évenements</h1>
            </div>
            <Footer />
        </div>
    );
}