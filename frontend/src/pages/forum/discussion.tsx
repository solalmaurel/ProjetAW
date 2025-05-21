import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JSX } from "react";
import MessageBox from "./message";
import { Message, Discussion as DiscussionType } from "../../models/discussion";
import NavBar from "../../layout/navbar";
import Footer from "../../layout/footer";
import {
  getMessagesByDiscussion,
  postMessage,
  getDiscussionById,
} from "../../models/discussion";
import { useAuth } from "../../context/AuthContext";

export default function Discussion(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [quote, setQuote] = useState<string | null>(null);
  const [discussion, setDiscussion] = useState<DiscussionType | null>(null);

  useEffect(() => {
    const fetchDiscussionAndMessages = async () => {
      try {
        if (!id) return;
        const [discussionData, messagesData] = await Promise.all([
          getDiscussionById(parseInt(id)),
          getMessagesByDiscussion(parseInt(id)),
        ]);
        setDiscussion(discussionData);
        setMessages(messagesData);
        setError(null);
      } catch (error) {
        console.error("Error fetching discussion data:", error);
        setError("Failed to load discussion. Please try again later.");
      }
    };

    fetchDiscussionAndMessages();
  }, [id]);

  const handlePostMessage = async () => {
    try {
      if (!id || !newMessage || !user?.idUser) {
        setError("Utilisateur non connecté ou message vide.");
        return;
      }
      await postMessage({
        idDiscussion: parseInt(id),
        message: quote ? `${quote}\n\n${newMessage}` : newMessage,
        idUser: user?.idUser,
      });
      // Recharge la liste complète des messages
      const updatedMessages = await getMessagesByDiscussion(parseInt(id));
      setMessages(updatedMessages);
      setNewMessage("");
      setQuote(null);
      setError(null);
    } catch (error) {
      console.error("Error posting message:", error);
      setError("Failed to post message. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="p-5 flex flex-col flex-grow space-y-2 mt-20">
        <span className="flex flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl">Sujet : {discussion?.sujet}</h1>
            <h1 className="text-2xl">Thème : {discussion?.theme}</h1>
          </div>
          <a
            href="/forum/create"
            className="px-3 py-2 h-fit rounded-lg bg-blue-500 hover:bg-blue-800 text-white"
          >
            Créer un nouveau post
          </a>
        </span>
        <hr />
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="flex flex-col space-y-5">
          {messages.map((message) => (
            <MessageBox
              key={message.idMessage}
              message={message}
              onReply={() => {
                // Détecte et retire la citation existante s'il y en a une
                const quoteRegex = /^\[quote\]([\s\S]*?)\[\/quote\]\n*/;
                let mainText = message.message;
                const match = mainText.match(quoteRegex);
                if (match) {
                  mainText = mainText.replace(quoteRegex, "");
                }
                const date = new Date(message.date);
                const dateStr = `Le ${date.toLocaleDateString()} à ${date.toLocaleTimeString()} :`;
                setQuote(`[quote]\n${dateStr}\n${mainText.trim()}\n[/quote]`);
                document.getElementById("reply")?.focus();
              }}
            />
          ))}
          <hr />
          <h1 className="text-xl">Votre réponse</h1>
          {quote && (
            <div className="mb-2 p-2 bg-gray-100 border-l-4 border-blue-400 text-gray-700 relative">
              <button
                className="absolute top-1 right-2 text-blue-500 hover:underline text-xs"
                onClick={() => setQuote(null)}
              >
                Annuler la citation
              </button>
              <pre className="whitespace-pre-wrap text-sm">{quote}</pre>
            </div>
          )}
          <textarea
            id="reply"
            className="border border-1 rounded-lg min-h-52 resize-none p-2"
            placeholder="Votre réponse"
            value={quote ? `${quote}\n\n${newMessage}` : newMessage}
            onChange={(e) => {
              if (quote) {
                const prefix = `${quote}\n\n`;
                setNewMessage(
                  e.target.value.startsWith(prefix)
                    ? e.target.value.slice(prefix.length)
                    : e.target.value
                );
              } else {
                setNewMessage(e.target.value);
              }
            }}
          />
          <button
            onClick={handlePostMessage}
            className="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-800 text-white w-fit"
          >
            Poster votre réponse
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
