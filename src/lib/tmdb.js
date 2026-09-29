import axios from "axios";

export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { language: "en-US" },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});
