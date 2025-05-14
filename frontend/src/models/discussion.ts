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
  user: User;
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

export const getMessagesByDiscussion = async (
  discussionId: number
): Promise<Message[]> => {
  const url = `${SPRING_API}/discussion/${discussionId}/messages`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }

  return await response.json();
};

export const postMessage = async (message: {
  idDiscussion: number;
  message: string;
  idUser: number;
}): Promise<Message[]> => {
  const url = `${SPRING_API}/discussion/${message.idDiscussion}/createMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to post message");
  }

  return await response.json();
};

export const getDiscussionById = async (id: number): Promise<Discussion> => {
  const url = `${SPRING_API}/discussion/${id}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch discussion");
  }

  return await response.json();
};
