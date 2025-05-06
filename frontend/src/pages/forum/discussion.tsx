import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JSX } from "react";
import MessageBox, { Message } from "./message";
import NavBar from "../../layout/navbar";
import Footer from "../../layout/footer";

export default function Discussion(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log("Fetching messages for discussion ID:", id);
        const response = await fetch(`/discussion/${id}/messages`);
        if (!response.ok) {
          console.error("Failed to fetch messages, status:", response.status);
          return;
        }
        const data = await response.json();
        console.log("Messages fetched:", data);
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [id]);

  const handlePostMessage = async () => {
    try {
      const response = await fetch(`/discussion/${id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage }),
      });

      if (response.ok) {
        setNewMessage("");
        const updatedMessages = await response.json();
        setMessages(updatedMessages);
      } else {
        console.error("Failed to post message");
      }
    } catch (error) {
      console.error("Error posting message:", error);
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
        <div className="flex flex-col space-y-5">
          {messages.map((message) => (
            <MessageBox key={message.id} message={message} />
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
