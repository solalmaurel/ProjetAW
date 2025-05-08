import { JSX, useState, useEffect } from "react";
import NavBar from "../../layout/navbar";
import Footer from "../../layout/footer";
import { getLatestDiscussions, Discussion } from "../../models/discussion";

export default function ForumPage(): JSX.Element {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const data = await getLatestDiscussions();
        setDiscussions(data);
      } catch (error) {
        console.error("Error fetching latest discussions:", error);
      }
    };

    fetchDiscussions();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="p-5 flex flex-col flex-grow space-y-3">
        <span className="flex flex-row space-x-6">
          <input
            className="border border-1 rounded-lg p-3 w-full"
            type="text"
            placeholder="Rechercher une discussion"
          />
          <a
            href="/forum/create"
            className="text-nowrap p-3 rounded-lg bg-blue-500 hover:bg-blue-800 text-white"
          >
            Créer un nouveau post
          </a>
        </span>
        {discussions.map((discussion) => (
          <DiscussionPreview
            key={discussion.idDiscussion}
            discussion={discussion}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

function DiscussionPreview({
  discussion,
}: {
  discussion: Discussion;
}): JSX.Element {
  return (
    <a
      href={`/forum/discussion/${discussion.idDiscussion}`}
      className="bg-blue-50 hover:bg-blue-100 p-3 rounded-lg flex flex-col space-y-2"
    >
      <div className="flex flex-row justify-between">
        <span className="flex flex-row space-x-2 items-center">
          <div className="bg-yellow-400 w-8 h-8 rounded-full" />
          <p className="text-lg font-semibold">
            {discussion.user?.prenom} {discussion.user?.nom}
          </p>
        </span>
        <div className="text-right">
          <p className="text-gray-500">
            Postée le {new Date(discussion.dateCreation).toLocaleDateString()}
          </p>
          <p className="text-gray-500">{discussion.messages.length} réponses</p>
        </div>
      </div>
      <h1 className="text-xl font-semibold">{discussion.sujet}</h1>
    </a>
  );
}
