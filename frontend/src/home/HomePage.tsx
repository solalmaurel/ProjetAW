import {useEffect, useState} from "react";

export default function HomePage() {

    const [loading, setLoading] = useState<boolean>(true);
    const [text, setText] = useState<string>('');

    useEffect(() => {

        fetch('http://localhost:8080/api/hello')
            .then(res => res.text())
            .then(text => setText(text))
            .finally(() => setLoading(false));

    }, []); // permet d'appeler notre spring boot une seule fois

    if (loading) {
        return <div>Loading...</div>;

    } else {

        return (
            <div>
                <h1>Hello everyone!</h1>
                <p>Welcome to the home page!</p>
                <p>Here's the data fetched from Spring BOOT:</p>
                <h2 className="text-red-700">{text}</h2>
            </div>
        )

    }

}