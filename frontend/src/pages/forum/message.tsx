import { JSX } from "react";
import { Message } from "../../models/discussion";

export default function MessageBox({
  message,
}: {
  message: Message;
}): JSX.Element {
  return (
    <div className="border border-1 p-3 rounded-lg flex flex-col space-y-5">
      <span className="flex flex-row space-x-2 items-center">
        <div className="bg-yellow-400 w-8 h-8 rounded-full" />
        <p className="text-lg font-semibold">
          {message.user?.prenom} {message.user?.nom}
        </p>
      </span>
      <p>{message.message}</p>
      <span className="flex flex-row items-center justify-between">
        <p className="text-gray-500">
          Postée le {new Date(message.date).toLocaleDateString()}
        </p>
        <a
          href="#reply"
          className="bg-green-300 w-fit p-3 py-2 rounded-lg font-semibold hover:bg-green-400"
        >
          Répondre
        </a>
      </span>
    </div>
  );
}
