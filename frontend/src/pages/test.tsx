import {createUser, findUserById, User} from "../models/user";

export default function TestPage() {

    return (
        <div>
            <h1>Hello everyone!</h1>
            <p>Welcome to the test page!</p>
            <br/>
            <button onClick={createUserListener}>Create user in Spring</button>
            <br/>
            <button onClick={getUserListener}>Get user 1</button>
        </div>
    )

}

function createUserListener() {

    const user: User = {
        id: -1, // on laisse spring generer l'id automatiquement
        nom: "PERROT",
        prenom: "Alexandre",
        email: "alexandre.perrot54@proton.me",
        password: "unmotdepassesecurise",
        isAdmin: false,
        anneeDiplome: 2026,
        typeEtude: "SN",
        isAdherent: false,
        dateCotisation: undefined,
        notifOffre: false,
        notifEvenement: false
    }

    const promise = createUser(user); // on envoie la requete à spring
    promise.then(data => console.log(data)).catch(err => console.error(err)); // on affiche la reponse de spring

}

function getUserListener() {

    const promise = findUserById(1); // on get l'user avec l'id 1, envoi de la requete
    promise.then(data => console.log(data)).catch(err => console.error(err)); // afficher l'user 1 s'il existe

}