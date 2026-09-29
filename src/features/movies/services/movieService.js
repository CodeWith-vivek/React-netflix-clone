import { tmdb } from "@/lib/tmdb";

export const getMoviesByCategory = (category = "now_playing") =>
  tmdb
    .get(`/movie/${category}`, { params: { language: "en-US", page: "1" } })
    .then((res) => res.data.results);

export const getMovieVideos = (id) =>
  tmdb.get(`/movie/${id}/videos`).then((res) => res.data.results);
