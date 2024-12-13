import Axios from "./index";

export type Quote = {
  id: string;
  text: string;
  mediaUrl: string;
  username: string;
  createdAt: string;
};

export const fetchQuotes = async (page: number, token: string) => {
  const offset = page * 20;
  const response = await Axios.get(`/getQuotes?limit=20&offset=${offset}`, {
    headers: { Authorization: token },
  });

  return response.data.data as Quote[];
};

export const postQuote = async (
  text: string,
  mediaUrl: string,
  token: string
) => {
  const response = await Axios.post(
    "/postQuote",
    { text, mediaUrl },
    { headers: { Authorization: token } }
  );
  return response.data;
};

export const uploadMedia = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await Axios.post(
    "https://crafto.app/crafto/v1.0/media/assignment/upload",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data.mediaUrl;
};
