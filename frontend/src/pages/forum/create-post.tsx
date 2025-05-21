import { JSX } from "react";
import React, { useState } from "react";
import { createDiscussion, discussionThemes } from "../../models/discussion";
import NavBar from "../../layout/navbar";
import Footer from "../../layout/footer";
import { useAuth } from "../../context/AuthContext";

export default function CreateForm(): JSX.Element {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState(discussionThemes[0]);
  const { user } = useAuth(); // Use useAuth to get the logged-in user

  const handleSubmit = async () => {
    try {
      const newDiscussion = {
        sujet: title,
        description: description, // Add description at the top level
        userId: user.idUser, // Include the userId in the request
        theme: theme,
      };
      await createDiscussion(newDiscussion);
      alert("Discussion créée avec succès !");
      window.location.href = "/forum";
    } catch (error) {
      console.error("Erreur lors de la création de la discussion :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="p-5 flex flex-col flex-grow space-y-10">
        <span className="flex flex-row justify-between items-center">
          <h1 className="text-2xl">Créer un nouveau post</h1>
          <a
            href="/forum"
            className="px-3 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white"
          >
            Annuler la création
          </a>
        </span>
        <hr />
        <div className="flex flex-col space-y-5 px-[10%]">
          <h1 className="text-xl">Titre du post</h1>
          <input
            type="text"
            className="border border-1 rounded-lg p-2"
            placeholder="Titre du post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h1 className="text-xl">Thème</h1>
          <select
            className="border border-1 rounded-lg p-2"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            {discussionThemes.map((theme) => (
              <option key={theme} value={theme}>
                {theme.charAt(0) + theme.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <h1 className="text-xl">Description de votre post</h1>
          <textarea
            className="border border-1 rounded-lg min-h-52 resize-none p-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-800 text-white w-fit"
          >
            Publier votre post
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
