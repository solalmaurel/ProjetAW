import { JSX } from "react";
import { Message } from "../../models/discussion";
import { useAuth } from "../../context/AuthContext";

export default function MessageBox({
  message,
  onReply,
  onDelete,
}: {
  message: Message;
  onReply?: () => void;
  onDelete?: (id: number) => void;
}): JSX.Element {
  // Détecte la citation au format [quote]...[/quote]
  const quoteRegex = /^\[quote\]([\s\S]*?)\[\/quote\]\n*/;
  const match = message.message.match(quoteRegex);
  const { user } = useAuth();
  let citation = null;
  let reste = message.message;
  if (match) {
    citation = match[1];
    reste = message.message.replace(quoteRegex, "");
  }

  return (
    <div className="border border-1 p-3 rounded-lg flex flex-col space-y-5">
      <span className="flex flex-row space-x-2 items-center">
        <div className="bg-yellow-400 w-8 h-8 rounded-full" />
        <p className="text-lg font-semibold">
          {message.user?.prenom} {message.user?.nom}
        </p>
      </span>
      {/* Affichage de la citation si présente */}
      {citation && (
        <div className="mb-2 p-2 bg-gray-100 border-l-4 border-blue-400 text-gray-700">
          <pre className="whitespace-pre-wrap text-sm">{citation}</pre>
        </div>
      )}
      {/* Affichage du reste du message */}
      <pre className="whitespace-pre-wrap">{reste}</pre>
      <span className="flex flex-row items-center justify-between">
        <p className="text-gray-500">
          Postée le {new Date(message.date).toLocaleDateString()}
        </p>
        <a
          href="#reply"
          className="bg-green-300 w-fit p-3 py-2 rounded-lg font-semibold hover:bg-green-400"
          onClick={(e) => {
            e.preventDefault();
            onReply && onReply();
          }}
        >
          Répondre
        </a>
        {user != null && user.admin && (
                        <button
            className="bg-red-500 text-white border border-black rounded-full px-3 py-1.5 hover:bg-black hover:text-red"
            onClick={(e) => {
              e.preventDefault();
              onDelete && onDelete(message.idMessage!);
            }}
          >
            Supprimer
          </button>
        )}
      </span>
    </div>
  );
}
