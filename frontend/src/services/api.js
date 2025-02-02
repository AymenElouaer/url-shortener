import axios from "axios";

const API_URL = "url-shortener-backend-20d1.onrender.com/api"; // backend URL

export const shortenUrl = async (longUrl, customAlias, expiration) => {
  const response = await axios.post(`${API_URL}/shorten`, {
    longUrl,
    customAlias: customAlias || "",
    expiration: expiration || "",
  });
  return response.data;
};
