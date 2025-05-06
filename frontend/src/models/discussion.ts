export interface Discussion {
  idDiscussion: number;
  sujet: string;
  dateCreation: Date;
  messages: Message[];
  user: User; // Added user property to represent the creator of the discussion
}

export interface Message {
  idMessage: number;
  message: string;
  date: Date;
  username: string;
}

export interface User {
  idUser: number;
  nom: string;
  prenom: string;
}

const SPRING_API = process.env.REACT_APP_SPRING_URL_ENDPOINT;

export const getAllDiscussions = async (): Promise<Discussion[]> => {
  const url = `${SPRING_API}/discussion`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch discussions");
  }

  return await response.json();
};

export const createDiscussion = async (discussion: {
  sujet: string;
  description: string;
  userId: number;
}): Promise<Discussion> => {
  const url = `${SPRING_API}/discussion/create`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(discussion),
  });

  if (!response.ok) {
    throw new Error("Failed to create discussion");
  }

  return await response.json();
};

export const getLatestDiscussions = async (): Promise<Discussion[]> => {
  const url = `${SPRING_API}/discussion/latest`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch latest discussions");
  }

  return await response.json();
};
