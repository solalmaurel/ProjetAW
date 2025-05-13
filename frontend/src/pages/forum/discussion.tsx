import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JSX } from "react";
import MessageBox from "./message";
import { Message } from "../../models/discussion";
import NavBar from "../../layout/navbar";
import Footer from "../../layout/footer";
import { getMessagesByDiscussion, postMessage } from "../../models/discussion";
import { useAuth } from "../../context/AuthContext";

export default function Discussion(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!id) return;
        const data = await getMessagesByDiscussion(parseInt(id));
        setMessages(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to load messages. Please try again later.");
      }
    };

    fetchMessages();
  }, [id]);

  const handlePostMessage = async () => {
    try {
      if (!id || !newMessage || !user?.idUser) {
        setError("Utilisateur non connecté ou message vide.");
        return;
      }
      await postMessage({
        idDiscussion: parseInt(id),
        message: newMessage,
        idUser: user?.idUser,
      });
      // Recharge la liste complète des messages
      const updatedMessages = await getMessagesByDiscussion(parseInt(id));
      setMessages(updatedMessages);
      setNewMessage("");
      setError(null);
    } catch (error) {
      console.error("Error posting message:", error);
      setError("Failed to post message. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="p-5 flex flex-col flex-grow space-y-2">
        <span className="flex flex-row justify-between">
          <h1 className="text-2xl">Discussion</h1>
          <a
            href="/forum/create"
            className="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-800 text-white"
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
            <MessageBox key={message.idMessage} message={message} />
          ))}
          <hr />
          <h1 className="text-xl">Votre réponse</h1>
          <textarea
            id="reply"
            className="border border-1 rounded-lg min-h-52 resize-none p-2"
            placeholder="Votre réponse"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
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
